var mongoose = require('mongoose'),
    Level = mongoose.model('Level');

module.exports = {

    // Get user information
    getLevelAuth: function findLevelGenerator(levelCode) {
        //'UTC: 2016-04-27T10:38:43.558Z'
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
        return function(req, res, next) {
            Level.findOne({
                code: levelCode,
                release_date: {
                    $lte: localISOTime
                }
            }, function(err, level) {
                if (err) {
                    res.status(500).send(err);
                    return;
                } else if (!level) {
                    res.redirect('/');
                } else {
                    next();
                }
            });
        };
    },
}
