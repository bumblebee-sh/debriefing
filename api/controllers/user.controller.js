const User = require('../models').user,
    //Quiz = require('../models').quiz,
    fs = require('fs'),
    notification = require('./notification.controller'),
    path = require('path');

exports.registration = (req, res) => {
    const body = req.body;
    User.findOne({email : body.email}, (err, doc) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
        if (doc) return res.status(403).json({ message: "This email is taken" });

        const new_user = new User(body);
        new_user.save(function(err, user) {
            if (err) return res.status(500).send(err);
            fs.mkdir('./public/'+user._id, err => {
                if(err) return res.status(500).send(err);
                fs.mkdirSync(`./public/${user._id}/images`)
            });
            res.status(200).send({'name': user.name});
        });
    });
};

exports.login = (req, res) => {
    const body = req.body;

    User.findOne({email : body.email}).populate('quizzes').exec((err, doc) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
        if (!doc) return res.status(401).json({ message: "Email/password are incorrect" }) ;
        doc.checkPass(body.password, err => {
            if(err) return res.status(500).json({ message: "Password is incorrect" });
            let user = doc.toJSON();
            delete user.password;
            req.session.user = user;
            res.status(200).json(user);
        });
    });
};

exports.logout = (req, res) => {
    notification.logout(req.session.user._id);
    const name = req.session.user.name;
    req.session.destroy( err => res.status(200).send({name:name}));
};

exports.update = (req, res) => {
    const body = JSON.parse(req.body.profile_info);
    if (req.files) {
        const file = req.files.profile_img,
            file_name = 'avatar__' + Date.now() + path.extname(file.name);
        update_image(file, file_name, body, res);
        body.image = `http://${req.headers.host}/public/${body._id}/images/${file_name}`;
        body.image_name = file_name;
    } else {
        body.image = `http://${req.headers.host}/public/images/no_image.png`;
    }
    User.findByIdAndUpdate({_id: req.session.user._id}, body, {new : true}, function(err, user) {
        if(err) return res.status(500).send(err);
        let response = user.toJSON();
        delete response.password;
        req.session.user = response;
        return res.status(200).send(response);
    });
};

function update_image(file, name, body, res) {
    file.mv(`./public/${body._id}/images/${name}`, function(err) {
        if(err) return res.status(500).send(err);
    });
}