const express = require('express');
const mongoose = require('mongoose');
const mangaRouter = require('./routes/manga');
const { checkNewChapter } = require('./scraper');

const app = express();
app.use(express.json());
const password = process.env.MONGO_PASSWORD;

const dbURI = 'mongodb+srv://kimisawesome72:<password>@clustert.olsip.mongodb.net/?retryWrites=true&w=majority&appName=ClusterT';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

app.use('/api/manga', mangaRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;