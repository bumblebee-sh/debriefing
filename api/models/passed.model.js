const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PassedSchema = new Schema({
    quiz: { type: Schema.Types.ObjectId, ref: 'quizzes' },
    name: String,
    email: String,
    rating: Number,
    age: Number,
    text: String,
    passed_time: { type: Number, default: 0 },
    added: {type: Date, default: Date.now},
    answers: [{
        text: String,
        passed_time: { type: Number, default: 0 },
        answers:[{
            text: String,
            status: Boolean
        }],
    }]
});

PassedSchema.pre('save', function(next){
    this.passed_time = this.answers.reduce( (prev, cur) => prev + cur.passed_time, 0);
    next();
});

module.exports = mongoose.model('passed', PassedSchema, 'passed');