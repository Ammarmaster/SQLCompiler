import type { Database, SqlJsStatic } from 'sql.js';
import type { ColumnMeta, ForeignKeyMeta, QueryResult, SchemaInfo, TableMeta } from '../types';

declare global {
  interface Window {
    initSqlJs?: (config?: any) => Promise<SqlJsStatic>;
  }
}

async function getInitSqlJs(): Promise<(config?: any) => Promise<SqlJsStatic>> {
  if (typeof window !== 'undefined' && window.initSqlJs) {
    return window.initSqlJs;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/sql-wasm.js';
    script.onload = () => {
      if (window.initSqlJs) {
        resolve(window.initSqlJs);
      } else {
        reject(new Error('initSqlJs was not defined by /sql-wasm.js'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load /sql-wasm.js'));
    document.head.appendChild(script);
  });
}

const DB_STORAGE_KEY = 'sqlite_studio_db_state_v1';

class SqlEngineService {
  private SQL: SqlJsStatic | null = null;
  private db: Database | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  public async init(): Promise<void> {
    if (this.isInitialized && this.db) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        const initFn = await getInitSqlJs();
        this.SQL = await initFn({
          locateFile: (file: string) => `/${file}`,
        });

        // Try restoring from IndexedDB or local storage
        const savedBinary = await this.loadFromStorage();
        if (savedBinary && savedBinary.length > 0) {
          try {
            this.db = new this.SQL.Database(savedBinary);
          } catch (e) {
            console.warn('Failed to restore saved database, creating sample DB', e);
            this.db = new this.SQL.Database();
            this.seedSampleDatabase();
          }
        } else {
          this.db = new this.SQL.Database();
          this.seedSampleDatabase();
        }

        this.isInitialized = true;
      } catch (error) {
        console.error('Failed to initialize sql.js WASM engine:', error);
        throw error;
      }
    })();

    return this.initPromise;
  }

  public getDatabase(): Database | null {
    return this.db;
  }

  public execute(sql: string): QueryResult {
    if (!this.db) {
      throw new Error('Database is not initialized yet.');
    }

    const trimmed = sql.trim();
    if (!trimmed) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        executedAt: new Date(),
        statement: sql,
      };
    }

    const startTime = performance.now();
    try {
      // Execute query using sql.js
      const results = this.db.exec(trimmed);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      // Auto persist after queries
      this.scheduleSave();

      if (results.length > 0) {
        const lastResult = results[results.length - 1];
        return {
          columns: lastResult.columns,
          values: lastResult.values,
          rowCount: lastResult.values.length,
          executionTimeMs,
          executedAt: new Date(),
          statement: trimmed,
          isDdlOrDml: false,
        };
      } else {
        const rowsAffected = this.db.getRowsModified();
        return {
          columns: ['status', 'rows_affected'],
          values: [['Statement executed successfully', rowsAffected]],
          rowCount: rowsAffected,
          executionTimeMs,
          executedAt: new Date(),
          statement: trimmed,
          isDdlOrDml: true,
          rowsAffected,
        };
      }
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      let errorMsg = err?.message || String(err);
      
      // Clean up common SQLite prefix if present
      if (errorMsg.startsWith('Error: ')) {
        errorMsg = errorMsg.replace('Error: ', '');
      }

      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs,
        executedAt: new Date(),
        statement: trimmed,
        error: errorMsg,
      };
    }
  }

  public getSchema(): SchemaInfo {
    if (!this.db) {
      return { tables: [], updatedAt: Date.now() };
    }

    const tables: TableMeta[] = [];

    try {
      const tableQuery = this.db.exec(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;`
      );

      if (tableQuery.length > 0 && tableQuery[0].values) {
        const tableNames = tableQuery[0].values.map((v) => String(v[0]));

        for (const name of tableNames) {
          // Get columns
          const colInfo = this.db.exec(`PRAGMA table_info("${name}");`);
          const columns: ColumnMeta[] = [];

          if (colInfo.length > 0 && colInfo[0].values) {
            for (const col of colInfo[0].values) {
              columns.push({
                cid: Number(col[0]),
                name: String(col[1]),
                type: String(col[2] || 'TEXT').toUpperCase(),
                notnull: Boolean(col[3]),
                dflt_value: col[4],
                pk: Boolean(col[5]),
              });
            }
          }

          // Get foreign keys
          const fkInfo = this.db.exec(`PRAGMA foreign_key_list("${name}");`);
          const foreignKeys: ForeignKeyMeta[] = [];

          if (fkInfo.length > 0 && fkInfo[0].values) {
            for (const fk of fkInfo[0].values) {
              const fkEntry: ForeignKeyMeta = {
                id: Number(fk[0]),
                seq: Number(fk[1]),
                table: String(fk[2]),
                from: String(fk[3]),
                to: String(fk[4]),
                on_update: String(fk[5] || 'NO ACTION'),
                on_delete: String(fk[6] || 'NO ACTION'),
              };
              foreignKeys.push(fkEntry);

              // Annotate matching column
              const matchingCol = columns.find((c) => c.name.toLowerCase() === fkEntry.from.toLowerCase());
              if (matchingCol) {
                matchingCol.isFk = true;
                matchingCol.fkTargetTable = fkEntry.table;
                matchingCol.fkTargetColumn = fkEntry.to;
              }
            }
          }

          // Row count
          let rowCount = 0;
          try {
            const countRes = this.db.exec(`SELECT COUNT(*) FROM "${name}";`);
            if (countRes.length > 0 && countRes[0].values.length > 0) {
              rowCount = Number(countRes[0].values[0][0]);
            }
          } catch {
            rowCount = 0;
          }

          tables.push({
            name,
            columns,
            foreignKeys,
            rowCount,
          });
        }
      }
    } catch (e) {
      console.error('Error fetching schema:', e);
    }

    return {
      tables,
      updatedAt: Date.now(),
    };
  }

  public exportDatabase(): Uint8Array {
    if (!this.db) throw new Error('Database not initialized');
    return this.db.export();
  }

  public importDatabase(data: Uint8Array): void {
    if (!this.SQL) throw new Error('SQL engine not ready');
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn('Error closing prior db:', e);
      }
    }
    this.db = new this.SQL.Database(data);
    this.saveToStorage(data);
  }

  public resetToSample(): void {
    if (!this.SQL) return;
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn(e);
      }
    }
    this.db = new this.SQL.Database();
    this.seedSampleDatabase();
    this.saveToStorage(this.db.export());
  }

  public resetToEmpty(): void {
    if (!this.SQL) return;
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn(e);
      }
    }
    this.db = new this.SQL.Database();
    this.saveToStorage(this.db.export());
  }

  private seedSampleDatabase(): void {
    if (!this.db) return;

    const sampleSql = `
      -- Enable foreign keys
      PRAGMA foreign_keys = ON;

      -- 1. Suppliers
      CREATE TABLE suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        contact_name TEXT,
        country TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT
      );

      -- 2. Products
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        supplier_id INTEGER,
        unit_price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
      );

      -- 3. Customers
      CREATE TABLE customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        city TEXT NOT NULL,
        country TEXT NOT NULL DEFAULT 'USA',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- 4. Orders
      CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        order_date TEXT DEFAULT CURRENT_TIMESTAMP,
        status TEXT CHECK(status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
        total_amount REAL NOT NULL DEFAULT 0.0,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
      );

      -- 5. Order Items
      CREATE TABLE order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      );

      -- Seed Data: Suppliers
      INSERT INTO suppliers (company_name, contact_name, country, email, phone) VALUES
        ('Cupertino Silicon Labs', 'Elena Vance', 'USA', 'contact@cupertinosilicon.com', '+1 408-555-0199'),
        ('Nordic Precision Audio', 'Henrik Lindqvist', 'Sweden', 'support@nordicaudio.se', '+46 8 123 456'),
        ('Kyoto Optical Components', 'Kenji Sato', 'Japan', 'sales@kyotoptics.jp', '+81 75 555 2345'),
        ('Shenzhen Apex Displays', 'Lin Wei', 'China', 'inquiry@apexdisplays.cn', '+86 755 8888 1234');

      -- Seed Data: Products
      INSERT INTO products (name, category, supplier_id, unit_price, stock_quantity) VALUES
        ('Vision Pro Headset Glass', 'Displays', 4, 349.99, 45),
        ('Titanium M3 Chipset Hub', 'Processors', 1, 199.50, 120),
        ('Spatial Studio Monitors', 'Audio', 2, 499.00, 28),
        ('Sapphire Crystal Lens 50mm', 'Optics', 3, 289.00, 64),
        ('MagSafe Magnetic Keyboard', 'Accessories', 1, 149.00, 210),
        ('Active Noise-Cancelling Pods', 'Audio', 2, 249.00, 85),
        ('Ultra Retina OLED 120Hz', 'Displays', 4, 599.99, 32),
        ('Bionic Neural Core Co-Processor', 'Processors', 1, 329.00, 75);

      -- Seed Data: Customers
      INSERT INTO customers (name, email, phone, city, country) VALUES
        ('Sarah Jenkins', 'sarah.j@icloud.com', '+1 415-555-0142', 'San Francisco', 'USA'),
        ('Alexander Wright', 'alex.wright@apple.com', '+1 408-555-9011', 'Cupertino', 'USA'),
        ('Chloe Dubois', 'chloe.dubois@paris-design.fr', '+33 1 42 68 55 00', 'Paris', 'France'),
        ('Liam O''Connor', 'liam.oc@dublincode.ie', '+353 1 496 0123', 'Dublin', 'Ireland'),
        ('Aiko Tanaka', 'tanaka.aiko@tokyomedia.co.jp', '+81 3 5555 8901', 'Tokyo', 'Japan'),
        ('Marcus Sterling', 'marcus@londonventures.co.uk', '+44 20 7946 0912', 'London', 'UK');

      -- Seed Data: Orders
      INSERT INTO orders (customer_id, order_date, status, total_amount) VALUES
        (1, '2026-08-28 10:15:00', 'delivered', 848.99),
        (2, '2026-09-01 14:30:00', 'shipped', 698.50),
        (3, '2026-09-03 09:20:00', 'processing', 499.00),
        (4, '2026-09-05 16:45:00', 'pending', 398.00),
        (5, '2026-09-06 11:00:00', 'processing', 888.99),
        (1, '2026-09-06 18:22:00', 'delivered', 149.00);

      -- Seed Data: Order Items
      INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
        (1, 1, 1, 349.99),
        (1, 3, 1, 499.00),
        (2, 2, 2, 199.50),
        (2, 4, 1, 289.00),
        (3, 3, 1, 499.00),
        (4, 2, 2, 199.00),
        (5, 7, 1, 599.99),
        (5, 4, 1, 289.00),
        (6, 5, 1, 149.00);
    `;

    try {
      this.db.exec(sampleSql);
      this.scheduleSave();
    } catch (e) {
      console.error('Failed to seed sample database:', e);
    }
  }

  private saveTimeout: any = null;
  private scheduleSave(): void {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      if (this.db) {
        try {
          const binary = this.db.export();
          this.saveToStorage(binary);
        } catch (e) {
          console.warn('Auto-save error:', e);
        }
      }
    }, 1000);
  }

  private async saveToStorage(data: Uint8Array): Promise<void> {
    try {
      // Use IndexedDB for binary storage to avoid localStorage size limits (5MB)
      await setIndexedDbItem(DB_STORAGE_KEY, data);
    } catch (e) {
      console.warn('Failed to save to IndexedDB:', e);
    }
  }

  private async loadFromStorage(): Promise<Uint8Array | null> {
    try {
      return await getIndexedDbItem<Uint8Array>(DB_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to load from IndexedDB:', e);
      return null;
    }
  }
}

// Lightweight IndexedDB helper
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('SqliteStudioDB', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function setIndexedDbItem(key: string, val: any): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readwrite');
    tx.objectStore('store').put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getIndexedDbItem<T>(key: string): Promise<T | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readonly');
    const req = tx.objectStore('store').get(key);
    req.onsuccess = () => resolve((req.result as T) || null);
    req.onerror = () => reject(req.error);
  });
}

export const sqlEngine = new SqlEngineService();
