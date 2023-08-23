// Importing the 'moment' library to work with timestamps.
const moment = require('moment');

// Getting ready to use the 'Schema' and 'Types' parts from 'mongoose'.
const { Schema, Types } = require('mongoose');

// Creating a new structure for holding reactions using Mongoose.
const ReactionSchema = new Schema(
    {
        // For storing a unique ID for each reaction.
        reactionId: {
            type: Schema.Types.ObjectId,
            // If no ID given, make a new one.
            default: () => new Types.ObjectId()
        },
        // Holding the actual reaction text.
        reactionBody: {
            type: String,
            // Need some text for the reaction.
            required: 'Please enter a reaction!',
            // Not more than 280 characters, though.
            maxlength: 280
        },
        // The username of the person making the reaction.
        username: {
            type: String,
            // Can't forget to mention who's reacting.
            required: 'Please enter a username!'
        },
        // Timestamp to know when the reaction happened.
        createdAt: {
            type: Date,
            // If no time given, it's now by default.
            default: Date.now,
            // Making the timestamp look nicer with 'moment' library.
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
        },
    },
    {
        // Options for turning the schema into JSON format.
        toJSON: {
            // Including extra formatting stuff (getters).
            getters: true
        },
        // No need for auto-generated '_id'.
        id: false,
    }
);

// Making our reaction structure available for use in the app.
module.exports = ReactionSchema;





// const moment = require('moment');

// const { Schema, Types } = require('mongoose');

// const ReactionSchema = new Schema(
//     {           
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: 'Please enter a reaction!',
//             maxlength: 280
//         },
//         username: {
//             type: String,
//             required: 'Please enter a username!'
//         },  
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  
//         },   
//     },
//     {
//         toJSON: {
//             getters: true
//         },
//         id: false,
//     }   
// );

// module.exports = reactionSchema;
