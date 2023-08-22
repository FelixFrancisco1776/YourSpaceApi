const express = require('express');
const db = require('./config/connection.js');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));    // Parse incoming string or array data  
app.use(express.json());                            // Parse incoming JSON data
app.use(routes);                                    // Use routes

// Connect to database and server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});


