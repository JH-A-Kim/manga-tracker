const puppeteer = require('puppeteer');

const websiteConfigs = {
    'mangareader.to': {
        selector: 'a.item-link',
        attribute: 'title', // Specify which attribute or property to extract
        index: 0
    },
    'asuracomic.net': {
        selector: 'h3.font-bold.text-xl',
        attribute: 'innerText', // Specify which attribute or property to extract
        index: 1
    },
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
    // console.log('Waiting for selector...');
    // await page.waitForSelector(config.selector, {visible: true});
    // console.log('Selector found, extracting content...');
    
    const latestChapter = await page.evaluate((config) => {
        const elements = document.querySelectorAll(config.selector);
        const index = config.index || 0; // Default to the first instance if not specified
        if (elements.length > index) {
            const targetElement = elements[index];
            return targetElement[config.attribute]; // Extract the specified property
        }
        return null;
    }, config);

    await browser.close();
    return latestChapter;
}

// const url = 'https://mangareader.to/read/atashi-mary-san-ima-isekai-ni-iruno-66331/ja/chapter-2';
// checkNewChapter(url).then(latestChapter => {
//     if (latestChapter) {
//         console.log(`Latest Chapter: ${latestChapter}`);
//     } else {
//         console.log('Could not find the latest chapter.');
//     }
// }).catch(error => {
//     console.error('Error:', error);
// });

module.exports = { checkNewChapter };