const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    compare_pass = require('../_helpers/password');

const UsersSchema = new Schema({
    email: String,
    password: String,
    birthday: Number,
    name: String,
    image_name : { type: String, default: 'no_image.png'},
    image : { type: String, default: 'http://localhost:3000/public/images/no_image.png'},
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'quizzes' }]
});

UsersSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UsersSchema.methods.checkPass = function(pass, cb) {
    bcrypt.compare(pass, this.password, (err, status) => {
        if(err) cb(err);
        status ? cb() : cb('Password is incorrect&');
    });
};

module.exports = mongoose.model('users', UsersSchema, 'users');
