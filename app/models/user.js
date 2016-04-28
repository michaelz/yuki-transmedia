/**
 * Created by flaviapittet on 11/03/16.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passed_levels: [{
            level_id: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "Level"
            },
            result: String,
            code: String
        }

    ],

    solved_solutions: [{
        level_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Level"
        }
    }],

    selectedKeys: [
        {
            "id_in_level": String,
            "key": String

        }
    ]


});

/*UserSchema.virtual('date')
 .get(function(){
 return this._id.getTimestamp();
 });*/

mongoose.model('User', UserSchema);
