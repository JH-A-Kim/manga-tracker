const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');
const User = require('../models/User');
const { checkNewChapter } = require('../scraper');

router.post('/subscribe', async (req, res) => {
    const { url, user} = req.body.params;

    try{
        const user1 = await User.findById(user);

        const latestChapter = await checkNewChapter(url);

        const manga = new Manga({ url, latestChapter});
        await manga.save();

        user1.MangaList.push(manga._id);
        await user1.save();
    
        res.status(200).json({message: 'Subscribed successfully'});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post('/newManga', async (req, res) => {
    const { url } = req.body;

    try{
        const latestChapter = await checkNewChapter(url);

        const manga = new Manga({ url, latestChapter});
        
        await manga.save();

        res.status(200).json({latestChapter});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
