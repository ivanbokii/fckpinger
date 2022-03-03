const puppeteer = require('puppeteer');
const runSingle = require('./runSingle');

const urls = [
  'https://www.rt.com',
  'https://www.rt.ru',
  'https://lenta.ru',
  'https://regnum.ru',
];

async function runCycle(browser) {
  console.log("Running the cycle");

  let runnerPromises = urls.map(url => runSingle(browser, url));
  await Promise.all(runnerPromises);

  console.log("Finished the cycle");
}

async function run() {
  const browser = await puppeteer.launch();
  await runCycle(browser);
}

run();
