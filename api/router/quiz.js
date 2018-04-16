const express = require('express'),
    router = express.Router(),
    controller = require('../controllers');

router.post('/', controller.quiz.add_quiz);
router.put('/', controller.quiz.edit_quiz);
router.delete('/:id', controller.quiz.delete_quiz);
router.get('/', controller.quiz.get_all);

router.get('/:id', controller.quiz.get_user_quizzes);

router.post('/result', controller.quiz.save_result);
router.put('/result', controller.quiz.update_viewed);



module.exports = router;