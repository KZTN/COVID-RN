const City = require('../models/City');
const async = require('async');
module.exports = {
    async show(req, res) {
        const {name} = req.body;
        const city = await City.findOne({name});
        console.log(city);
        return res.json(city);
    },
    async store(req, res) {
        async.mapSeries(req.body, function iterator(item, cb) {

            var transfer = new City(item);
            transfer.save(function(error){
                cb(error, transfer);
            });
        }, 
        function done(error, transfers){
            res.json(error ? { message: "could not create transfer because " + error } : transfers);
      });
    }
};