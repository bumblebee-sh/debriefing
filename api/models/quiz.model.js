const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const QuizShema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'users' },
    description: String,
    image: String,
    title: String,
    passed: [{ type: Schema.Types.ObjectId, ref: 'passed' }],
    viewed: { type: Number, default: 0 },
    added: { type: Date, default: Date.now },
    rating: { type: Number, default: 0},
    questions: [{
        text: String,
        answers:[{
                text: String,
                status: { type: Boolean, default: false }
            }],
    }]
});

// QuizShema.pre('save', function(next) {
//
// });

QuizShema.methods.set_rating = function() {
    const _this = this;
    let _rating = _this.passed.reduce((t, n) => {
        return t + n.rating;
    }, 0);
    _this.viewed++;
    _this.rating = (Math.round(_rating / _this.passed.length * 2) / 2).toFixed(1);
};

module.exports = mongoose.model('quizzes', QuizShema);