var mongoose = require('mongoose'),
    Level = mongoose.model('Level');

module.exports = {

    // Get user information
    getLevelAuth: function findLevelGenerator(levelNum) {
        var date = new Date();
        return function (req, res, next) {
            Level.findOne({number: levelNum, release_date: {$lte: date}}, function (err, level) {
                if (err) {
                    res.status(500).send(err);
                    return;
                } else if (!level) {
                    res.render('map', {
                        pagename: 'map',
                        title: 'Mondes'
                    });
                } else {
                    next();
                }
            });
        };
    },
}
