/**
 * Created by flaviapittet on 11/03/16.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: String,
    username: String,
    email: String,
    password: String,
    passed_levels: [
        {
            level_id: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "Level"
            },
            result: String //here we can save any result we want for any game that has been passed

        }

    ],
    solved_solutions : [
        {
            level_id:{
                type: Schema.Types.ObjectId,
                required: false,
                ref: "Level"
            }
        }
    ],


});

/*UserSchema.virtual('date')
 .get(function(){
 return this._id.getTimestamp();
 });*/

mongoose.model('User', UserSchema);

