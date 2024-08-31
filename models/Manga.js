const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    url: String,
    latestChapter: String,
});

const Manga = mongoose.model('Manga', mangaSchema);
module.exports = Manga;
