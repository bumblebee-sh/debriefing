const User = require('../models').user,
    Quiz = require('../models').quiz,
    mongoose = require('mongoose'),
    Passed = require('../models').passed;

exports.get_by_id = (req, res) => {
    const id = req.params.id;
    // Passed.find({'quiz': id}).sort({added: -1}).exec((err, docs)=>{
    //     if(err) return res.status(500).send(err);
    //     Quiz.findById(id, 'title', (err, doc)=>{
    //         res.status(200).send({'passed': docs, 'name': doc.title});
    //     })
    // });

    Quiz.aggregate([
        {$match: {'_id': mongoose.Types.ObjectId(id)}},
        {$project: {title: '$title', passed: '$passed', _id : 0}},
        ]).exec((err, doc) => {
            Quiz.populate(doc , {path : 'passed'}, (err, item) => {
                //item[0].passed.reverse();
                res.status(200).send(item[0]);
            });
    });

    // Quiz.findById(id, 'title',{}, (err, doc)=>{
    //     res.status(200).send({'passed': docs, 'name': doc.title});
    // })

    // Quiz.findById(id).populate('passed').select('passed').group('passed').sort({ 'passed.added': -1 }).exec((err, docs)=>{
    //     if(err) return res.status(500).send(err);
    //     res.status(200).send(docs);
    // })
};