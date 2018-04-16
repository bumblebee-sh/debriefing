const mongoose = require('mongoose');

exports.connect = function (url, cb) {
    mongoose.connect(url);
    const d_b = mongoose.connection;
    d_b.on('error', _ => cb('hm.... Something go wrong!'));
    d_b.once('open', _ => cb());
};
