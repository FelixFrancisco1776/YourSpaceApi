const moment = require('moment');
const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {           
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please enter a username!'
        },  
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  
        },   
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }   
);

module.exports = reactionSchema;
