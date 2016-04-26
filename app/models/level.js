/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LevelSchema = new Schema({
    number: {type: Number, unique: true, required: true},
    name: String,
    code: String,
    release_date: {type: Date, unique: true, required: true},
    additional_info: String,
    description: String,
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