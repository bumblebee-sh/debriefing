const User = require('../models').user,
    Quiz = require('../models').quiz,
    Passed = require('../models').passed,
    mongoose = require('mongoose'),
    path = require('path');

exports.search = (req, res) => {
    let query = req.query,
        search = {
            rating : query.rating ? {$gte: +query.rating, $lt: +query.rating+1} : {$lte: 5}
        },
        limit = +query.limit || 10 ,
        skip = (+query.page - 1) * limit || 0 ;
    Quiz.count(search, (err, count) => {
        if (err) {
            count = +limit;
        }
        if ( count <= skip ) skip = 0;
        Quiz.find(search).skip(skip).limit(limit).exec((err, docs) => {
            res.status(200).json({items: docs, count});
        })
    });
};