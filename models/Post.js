const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    date: {
      type: Date,
      default: Date.now
    }
  });

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    follows:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }]

});

module.exports = mongoose.model('Post', PostSchema);