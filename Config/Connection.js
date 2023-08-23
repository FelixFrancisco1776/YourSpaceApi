const mongoose = require('mongoose');
const { use } = require('../routes/api/Index');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    useCreateIndex: true
});

module.exports = mongoose.connection;