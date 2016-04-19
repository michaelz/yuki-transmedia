/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LevelSchema = new Schema({
    number: Number,
    name: String,
    release_date: Date,
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