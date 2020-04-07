const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: String,
    suspects: String,
    refuses: String,
    cases: String,
    deaths: String
});

module.exports = mongoose.model('City', CitySchema);
