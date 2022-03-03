const puppeteer = require('puppeteer');
const path = require('path');
const moment = require('moment');

async function runSingle(browser, targetUrl, defaultTimeout=7000) {
  const timestamp = moment.utc().toString();
  const page = await browser.newPage();
  page.setDefaultTimeout(defaultTimeout);

  return new Promise(async (resolve, reject) => {
    try {
      await page.goto(targetUrl);

      const url = new URL(targetUrl);
      const screenshotPath = path.resolve(__dirname, `public/screenshots/${url.hostname}.png`);

      console.log("------------------> ");
      console.log(screenshotPath);
      await page.screenshot({ path: screenshotPath });

      resolve({ type: "ok", targetUrl, timestamp });
    } catch(e) {
      if (e instanceof puppeteer.errors.TimeoutError) {
        return resolve({ type: "timeout", targetUrl, timestamp });
      }

      return resolve({ type: "failed", targetUrl, error: e, timestamp });
    }
  });
}

module.exports = runSingle;
