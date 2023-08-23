// Importing 'moment' to handle timestamps.
const moment = require('moment');

// Importing parts from 'mongoose' for working with MongoDB.
const { Schema, Types, model } = require('mongoose');

// Importing the schema for reactions from another file.
const ReactionSchema = require('./Reaction');

// Defining the schema for thoughts.
const ThoughtSchema = new Schema(
    {
        // Field to hold the thought text.
        thoughtText: {
            type: String,
            // Can't have an empty thought.
            required: 'Please enter a thought!',
            // Thought can't be too long either.
            minlength: 1,
            maxlength: 280
        },
        // Timestamp for when the thought was created.
        createdAt: {
            type: Date,
            // Defaulting to current date and time.
            default: Date.now,
            // Using 'moment' to format the timestamp.
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  
        },
        // Username of the person who thought this.
        username: {
            type: String,
            // Gotta know who's thinking!
            required: 'Please enter a username!'
        },
        // Embedding reactions within the thought.
        reactions: [ReactionSchema]
    },
    {
        // Options for converting the schema to JSON.
        toJSON: {
            // Including extra stuff like virtuals and getters.
            virtuals: true,
            getters: true
        },
        // No need for an auto-generated '_id'.
        id: false,
    }
);

// Creating a virtual property to count reactions.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Creating a 'Thought' model based on the schema.
const Thought = model('Thought', ThoughtSchema);

// Exporting the 'Thought' model to use in other parts.
module.exports = Thought;








// const moment = require('moment');
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