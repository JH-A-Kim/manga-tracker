const cron = require('node-cron');
const Manga = require('./models/Manga');
const { checkForNewChapter } = require('./scraper');
const { sendEmail } = require('./notification');

cron.schedule('0 * * * *', async () => {
    const mangas = await Manga.find();

    for (let manga of mangas) {
        const latestChapter = await checkForNewChapter(manga.url);

        if (latestChapter !== manga.latestChapter) {
            manga.latestChapter = latestChapter;
            await manga.save();

            sendEmail(manga.email, 'New Manga Chapter Available', `A new chapter is available for ${manga.url}`);
        }
    }
});
