const express = require('express');
const mongoose = require('mongoose');
const mangaRouter = require('./routes/manga');
const { checkNewChapter } = require('./scraper');
require('dotenv').config();


const app = express();
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

app.use('/api/manga', mangaRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;