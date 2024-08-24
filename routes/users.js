var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', async (req, res) => {
  try{
    const user1 = await User.find();
    res.status(200).json(user1);
  }
  catch(err){
    res.status(400).json({message: "Failed to get all users"});
  }
});

router.post('/newUser', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = new User({ username, password });
        await user.save();

        res.status(200).json({message: 'User created successfully'});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
