const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUTPUT_DIR = path.join(__dirname, '..', 'test-output');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const urls = [
  'http://localhost:5173/',
  'http://localhost:5173/admin-dashboard',
  'http://localhost:5173/founder-login',
  'http://localhost:5173/founder-login.html',
  'http://localhost:5173/login'
];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const u of urls) {
    const page = await browser.newPage();
    const entry = { url: u, console: [], errors: [], requestsFailed: [] };

    page.on('console', msg => {
      try { entry.console.push({ type: msg.type(), text: msg.text() }); } catch (e) { /* ignore */ }
    });
    page.on('pageerror', err => {
      entry.errors.push(String(err));
    });
    page.on('requestfailed', req => {
      entry.requestsFailed.push({ url: req.url(), failure: req.failure() && req.failure().errorText });
    });

    try {
      const resp = await page.goto(u, { waitUntil: 'networkidle', timeout: 15000 });
      const status = resp ? resp.status() : null;
      const html = await page.content();
      const name = u.replace(/https?:\/\//, '').replace(/[\\/:?=&]/g, '_');

      const screenshotPath = path.join(OUTPUT_DIR, `${name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(()=>{});

      entry.status = status;
      entry.htmlSnippet = html.slice(0, 1000);
      entry.screenshot = screenshotPath;
    } catch (err) {
      entry.errors.push('Navigation or timeout error: ' + String(err));
    }

    results.push(entry);
    await page.close();
  }

  await browser.close();

  const outPath = path.join(OUTPUT_DIR, 'browser_test_results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log('Playwright run complete. Results written to:', outPath);
  results.forEach(r => console.log(r.url, 'status=', r.status, 'consoleMsgs=', r.console.length, 'errors=', r.errors.length, 'reqFailed=', r.requestsFailed.length));
  process.exit(0);
})();
