const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }

  });

module.exports = mongoose.model('Comment', CommentSchema);
