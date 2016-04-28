/**
 * Created by flaviapittet on 27/04/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KeySchema = new Schema({
    "key": String,
    "is_true": Boolean

});

mongoose.model('Key', KeySchema);



