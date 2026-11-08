// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live
// sitemap so new/changed pages get crawled within minutes instead of weeks.
// Bing's index also powers ChatGPT Search and Copilot answers.
// Usage (after deploying): npm run indexnow
const HOST = 'sqlcompiler.jobsio.in';
const KEY = 'a3cbfb5cfeded05086272428c2ba68be';

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
urlList.push(`https://${HOST}/llms.txt`, `https://${HOST}/llms-full.txt`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs`);
