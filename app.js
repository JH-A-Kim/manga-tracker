const express = require('express');
const mongoose = require('mongoose');
const mangaRouter = require('./routes/manga');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/manga-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/manga', mangaRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
