const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts1:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  });

  

module.exports = mongoose.model('User', userSchema); 
  