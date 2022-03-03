const puppeteer = require('puppeteer');

async function runSingle(browser, url, defaultTimeout=7000) {
  const page = await browser.newPage();
  page.setDefaultTimeout(defaultTimeout);

  try {
    console.log(`requesting ${url}`);
    await page.goto(url);
  } catch(e) {
    console.log(`FOUND ERROR -> ${url}`);
  }

  page.on("load", () => console.log(`${url} loaded OK`));
}

module.exports = runSingle;
