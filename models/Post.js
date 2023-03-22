const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    }]

});

module.exports = mongoose.model('Posts', PostSchema);