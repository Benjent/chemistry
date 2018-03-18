
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost:27017/chemistry');
var db = mongoose.connection;

db.on('error', function(err){
    console.log('connection error', err);
});

db.once('open', function(){
    console.log('Connection to DB successful');
});

var Schema = mongoose.Schema;
var mySchema = new Schema({
    name:String,
    password:String
});

var User = mongoose.model('User', mySchema);

mySchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

var testdata = new User({
    name: "admin",
    password: "test123"
});
 
testdata.save(function(err, data){
    if(err) console.log(error);
    else console.log ('Success:' , data);
});

module.exports = db