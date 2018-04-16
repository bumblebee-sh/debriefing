const express = require('express'),
    router = express.Router(),
    controller = require('../controllers');


const model = require('../models');
router.get('/drop', (req, res) => {
    model.passed.remove({}, (err, doc) => {
        if(err) return res.status(500).send(err);
    });
    model.quiz.remove({}, (err, doc) => {
        if(err) return res.status(500).send(err);
    });
    res.status(200).send({'mes' : 'ok'});
});


router.post('/registration', controller.user.registration);
router.post('/login', controller.user.login);
router.get('/logout', controller.user.logout);
router.get('/check_session', (req, res) => {
    res.status(200).send(req.session);
});
router.put('/user', controller.user.update);

router.get('/search', controller.search.search);

module.exports = router;