/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LevelSchema = new Schema({
   number: Number,
    name: String,
    release_date: Date,
    additional_info:String,
    description: String,
    clue : {
        url: String,
        alt: String,
        description: String
    },
    solution_id: {type: Schema.Types.ObjectId, required: false, ref: "Solution_image"}, //mongoose sait que c'est une référence à un autre modèèle. Methode "populate" TODO maj



});


mongoose.model('Level', LevelSchema);