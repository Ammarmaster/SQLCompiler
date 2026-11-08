// Submits every sitemap URL to Bing Webmaster Tools via the URL Submission API.
// Bing's index powers ChatGPT Search, Copilot and DuckDuckGo results.
// Key is read from BING_WEBMASTER_API_KEY in .env.local (never commit it).
// Usage: npm run bing-submit
import { readFileSync } from 'node:fs';

const SITE = 'https://sqlcompiler.jobsio.in';
let key = process.env.BING_WEBMASTER_API_KEY;
if (!key) {
  try {
    key = readFileSync(new URL('../.env.local', import.meta.url), 'utf8').match(/^BING_WEBMASTER_API_KEY=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!key) throw new Error('Set BING_WEBMASTER_API_KEY in .env.local');

const api = (method) => `https://ssl.bing.com/webmaster/api.svc/json/${method}?apikey=${key}`;

const quotaRes = await fetch(`${api('GetUrlSubmissionQuota')}&siteUrl=${encodeURIComponent(SITE)}`);
const quota = await quotaRes.json();
if (!quotaRes.ok) throw new Error(`Quota check failed (${quotaRes.status}): ${JSON.stringify(quota)}`);
const daily = quota.d?.DailyQuota ?? 0;
console.log(`Bing quota — daily: ${daily}, monthly: ${quota.d?.MonthlyQuota}`);

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urlList = all.slice(0, daily);
if (!urlList.length) {
  console.log('No quota left today — try again tomorrow.');
  process.exit(0);
}

const res = await fetch(api('SubmitUrlBatch'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ siteUrl: SITE, urlList }),
});
console.log(`SubmitUrlBatch: ${res.status} ${res.statusText} — ${urlList.length}/${all.length} URLs`, await res.text());
