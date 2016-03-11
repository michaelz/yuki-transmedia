/**
 * Created by flaviapittet on 11/03/16.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: String,
    name: String,
    lastname: String,
    email: String,
    password: String,
    passed_levels: [
        {
            level_id: Schema.Types.ObjectId,
            required: false,
            ref: "Level"
        }
    ]
});

/*UserSchema.virtual('date')
 .get(function(){
 return this._id.getTimestamp();
 });*/

mongoose.model('User', UserSchema);

