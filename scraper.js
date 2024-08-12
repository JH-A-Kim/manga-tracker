const puppeteer = require('puppeteer');

const websiteConfigs = {
    'mangareader.to': {
        selector: 'a.item-link',
        attribute: 'title' // Specify which attribute or property to extract
    },
    // 'asuracomic.net': {
    //     selector: 'div.chapter-latest a',
    //     attribute: 'textContent' // Specify which attribute or property to extract
    // },
    // Add more websites as needed
};

async function checkNewChapter(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const hostname = new URL(url).hostname;
    const config = websiteConfigs[hostname];

    if (!config) {
        throw new Error('Website not supported');
    }

    const latestChapter = await page.evaluate((config) => {
        const chapterElement = document.querySelector(config.selector);
        if (chapterElement) {
            return chapterElement.getAttribute(config.attribute); // Extract the specified attribute
        }
        return null;
    }, config);

    await browser.close();
    return latestChapter;
}

const url = 'https://mangareader.to/rentagirlfriend-2291';
checkNewChapter(url).then(latestChapter => {
    if (latestChapter) {
        console.log(`Latest Chapter: ${latestChapter}`);
    } else {
        console.log('Could not find the latest chapter.');
    }
}).catch(error => {
    console.error('Error:', error);
});

//module.exports = { checkNewChapter };