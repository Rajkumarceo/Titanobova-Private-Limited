const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async ()=>{
  const outDir = path.join(__dirname, '..', 'test-output');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const urls = [
    'http://localhost:4000/',
    'http://localhost:4000/pages/founder-login.html',
    'http://localhost:4000/admin-dashboard'
  ];

  const browser = await chromium.launch({ headless: true });
  for(const u of urls){
    const page = await browser.newPage();
    page.on('console', msg => console.log('[console]', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('[pageerror]', err));

    try{
      const resp = await page.goto(u, { waitUntil: 'networkidle', timeout: 20000 });
      console.log('Visited', u, 'status=', resp ? resp.status() : 'no-resp');
      const name = u.replace(/https?:\/\//,'').replace(/[\\/:?=&]/g,'_');
      const shot = path.join(outDir, name + '.png');
      await page.screenshot({ path: shot, fullPage: true });
      console.log('Saved', shot);
    }catch(e){
      console.error('Error visiting', u, e.message);
    }
    await page.close();
  }
  await browser.close();
  console.log('Done. Output in', outDir);
  process.exit(0);
})();
