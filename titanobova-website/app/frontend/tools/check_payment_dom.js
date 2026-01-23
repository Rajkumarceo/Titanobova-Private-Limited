const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4000/pages/payment.html?id=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const info = await page.evaluate(()=>document.getElementById('info')?.textContent);
  const detailsStyle = await page.evaluate(()=>document.getElementById('details')?.getAttribute('style'));
  const amount = await page.evaluate(()=>document.getElementById('amount')?.textContent);
  console.log('info=', info);
  console.log('details.style=', detailsStyle);
  console.log('amount=', amount);
  await page.screenshot({ path: '../test-output/payment_check_dom.png', fullPage: true }).catch(()=>{});
  console.log('screenshot saved');
  await browser.close();
})();
