const express = require('express'),
    router = express.Router(),
    controller = require('../controllers'),
    model = require('../models');

router.get('/:id', controller.passed.get_by_id);

module.exports = router;