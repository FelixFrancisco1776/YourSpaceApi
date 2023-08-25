// Importing necessary parts from 'mongoose'.
const { Schema, model } = require('mongoose');

// Defining the schema for users.
const UserSchema = new Schema(
    {
        // Field for the username of the user.
        username: {
            type: String,
            // Making sure usernames are unique.
            unique: true,
            // Username is required and shouldn't have extra spaces.
            required: 'Please enter a username!',
            trim: true
        },
        // Field for the email address of the user.
        email: {
            type: String,
            // Making sure email addresses are unique.
            unique: true,
            // Email address is required and should match a specific pattern.
            required: 'Please enter an email address!',
            match: [/.+@.+\..+/]
        },
        // Field for an array of references to thoughts associated with the user.
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        // Field for an array of references to friends (other users) of the user.
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Options for converting the schema to JSON.
        toJSON: {
            // Including extra stuff like virtuals and getters.
            virtuals: true,
        },
        // No need for an auto-generated '_id'.
        id: false,
    }
);

// Creating a virtual property to count the number of friends.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Creating a 'User' model based on the schema.
const User = model('User', UserSchema);

// Exporting the 'User' model to use in other parts.
module.exports = User;
