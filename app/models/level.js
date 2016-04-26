/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LevelSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    clue: {
        url: String,
        alt: String,
        description: String
    },
    solution: {
        url_img: String,
        alt: String
    },


});

mongoose.model('Level', LevelSchema);
