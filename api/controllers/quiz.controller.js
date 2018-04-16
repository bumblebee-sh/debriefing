const User = require('../models').user,
    Quiz = require('../models').quiz,
    Passed = require('../models').passed,
    notification = require('./notification.controller'),
    mongoose = require('mongoose'),
    path = require('path');


exports.delete_quiz = (req, res) => {
    const id = req.params.id;
    Quiz.findByIdAndRemove(id, (err, doc) => {
        if(err) return res.status(500).send(err);
        Quiz.find({'owner': doc.owner}, (err, docs) => {
            res.status(200).send(docs);
        });
    });
};

exports.edit_quiz = (req, res) => {
    const body = req.body;
    Quiz.findByIdAndUpdate(body._id, body, {new : true}, (err, doc) => {
       if (err) return res.status(500).send(err);
        Quiz.find({'owner': doc.owner}, (err, docs) => {
            res.status(200).send(docs);
        });
    });
};

exports.add_quiz = (req, res) => {
    const body = req.body;
    let quiz = new Quiz(body),
        id = req.session.user._id;

    quiz.owner = id;

    User.findById(id).populate('quizzes').select('quizzes').exec((err, doc) => {
        doc.quizzes.unshift(quiz);
        doc.save(err => {
            if (err) return res.status(500).send(err);
            res.status(200).json(doc.quizzes);
        });
    });

    // todo change order [1,2,3...last] => [last,...3,2,1] SAVE TO BEGINNER
    quiz.save((err, doc) => {
        if (err) return res.status(500).send(err);
        // Quiz.find({}, (err, docs) => {
        //     if (err) return res.status(500).send(err);
        //     res.status(200).json(docs);
        // });
    })
    // User.findOneAndUpdate({_id : req.session.user._id}, {$push: { quizzes : body }} , {new : true}, (err, doc) => {
    //     req.session.user = doc;
    //     res.status(200).send({mes : doc});
    // });
};

exports.get_user_quizzes = (req, res) => {
    const id = req.params.id;
    User.findById(id).populate('quizzes').select('quizzes').exec((err, doc) =>{
       if(err) return res.status(500).send(500);
        res.status(200).send(doc.quizzes);
    });
};

exports.get_all = (req, res) => {
    Quiz.find({}).limit(5).exec((err, docs) => {
        if (err) return res.status(500).send(err);
        Quiz.count({}, (err, count) => {
            if ( err ) count = 0;
            res.status(200).json({items: docs, count});
        })
    });
    // User.find().populate({ path: 'quizzes', select: 'quizzes.questions' }).exec(function(err, docs){
    //         if(err) return res.status(500).send(err);
    //         res.status(200).send({mes : docs});
    // })

    // User.find({}).select('quizzes').exec(function(err, docs){
    //     if(err) return res.status(500).send(err);
    //     res.status(200).send({mes : docs});
    // })
};

exports.save_result = (req, res) => {
    const id = req.body.id,
        body = req.body;
    delete body.id;
    const passed = new Passed(body);
    passed.quiz = id;

    passed.save((err, doc) => {
        if (err) return res.status(500).send(err);
        // res.status(200).send(doc);
    });

    Quiz.findById(id).populate('passed').exec((err, doc) => {
        if (err) return res.status(500).send(err);
        doc.passed.unshift(passed);
        doc.set_rating();
        doc.save(function(err, doc){
            if (err) return res.status(500).send(err);
            notification.send_notification(doc);
            res.status(200).send(doc);
        });
    });
    // Quiz.findById( body._id, (err, doc) => {
    //     if (err) res.status(500).send(err);
    //     res.status(200).send(doc);
    // })
};

exports.update_viewed = (req, res) => {
    const body = req.body;
    Quiz.findByIdAndUpdate(body.id, {'viewed': body.viewed}, (err, doc)=>{
        if (err) return res.status(500).send(err);
        res.status(200).send(doc)
    });
};
