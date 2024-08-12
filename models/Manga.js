const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    url: String,
    latestChapter: Number,
});

const Manga = mongoose.model('Manga', mangaSchema);
module.exports = Manga;
