/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Quiz_food_questionSchema = new Schema({
    position: {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true,
        unique: true
    },
    answers : [{
        text: String,
        is_solution: Boolean
    }],
    img : {
        url: String,
         alt: String
    }


});


mongoose.model('Quiz_food_question', Quiz_food_questionSchema);