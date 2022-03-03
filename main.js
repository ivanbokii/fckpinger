const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const runSingle = require('./runSingle');

let urls = [];

async function runCycle(browser) {
  console.log("-------");
  console.log("> cycle start");
  if (urls.length === 0) {
    console.log("No URLs found");
    return;
  }

  let runnerPromises = urls.map(url => runSingle(browser, url));
  let results = await Promise.all(runnerPromises);
  console.log(results);
  fs.writeFileSync(path.resolve(__dirname, 'output.json'), JSON.stringify(results));

  console.log("> cycle end");
}

async function updateUrls() {
  console.log("updating urls");
  let result = fs.readFileSync(path.resolve(__dirname, 'checklist.json')).toString();

  console.log(`found the following: ${JSON.parse(result)}`);
  urls = JSON.parse(result);
}

async function run() {
  const browser = await puppeteer.launch();

  setInterval(updateUrls, 15 * 1000);
  await updateUrls();

  setInterval(() => runCycle(browser), 10 * 1000);
  await runCycle(browser);
}

run();
