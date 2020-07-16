const puppeteer = require('puppeteer');

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://caxiascovid19.com.br/');
    await page.screenshot({path: 'screenshot.png'});
    await browser.close();
}

takeScreenshot();