const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err.message);
});

//this event will be called only once, when the mongoose connection is made with the db
db.once('open', () => {
    console.log('MongoDB connected Successfully!');
});

module.exports = db;