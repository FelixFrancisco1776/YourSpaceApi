const moment = require('moment');

const { Schema, Types, model } = require('mongoose');

const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  
        },
        username: {
            type: String,
            required: 'Please enter a username!'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
// const { Schema, Types } = require('mongoose');
// const ReactionSchema = require('./Reaction');

// const ThoughtSchema = new Schema(
//     {
//         thoughtText: {
//             type: String,
//             required: 'Please enter a thought!',
//             minlength: 1,
//             maxlength: 280
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  
//         },
//         username: {
//             type: String,
//             required: 'Please enter a username!'
//         },
//         reactions: [ReactionSchema]
//     },
//     {
//         toJSON: {
//             virtuals: true,
//             getters: true
//         },
//         id: false,
//     }
// );

// ThoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });

// const Thought = model('Thought', thoughtSchema);

// module.exports = Thought;