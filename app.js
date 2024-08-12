const express = require('express');
const mongoose = require('mongoose');
const mangaRouter = require('./routes/manga');
const { checkNewChapter } = require('./scraper');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/manga-tracker', {});

app.use('/api/manga', mangaRouter);
console.log(checkNewChapter("https://mangareader.to/jujutsu-kaisen-168"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;