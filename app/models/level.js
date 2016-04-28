/**
 * Created by flaviapittet on 11/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LevelSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    release_date: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        unique: true
    },
    keys: [{
        key_id:{
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Key"
        },


    }],
    clue: {
        data: Buffer,
        contentType: String
    }


});

mongoose.model('Level', LevelSchema);
