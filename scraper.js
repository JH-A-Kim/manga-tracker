const puppeteer = require('puppeteer');

async function checkNewChapter(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const latestChapter = await page.evaluate(() => {
        return document.querySelector('.chapter-title').innerText;
    });

    await browser.close();
    return latestChapter;
}

module.exports = { checkNewChapter };