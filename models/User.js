const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    MangaList: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', userSchema);
module.exports = User;