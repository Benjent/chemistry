const mongoose = require('mongoose');
// const db = require('./database.js');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName:String,
    email:String,
    password:String,
    birthDate:Date,
    location:Number,
    instruments:[String],
    description:String
});

let User = mongoose.model('User', userSchema);

// mySchema.pre('save', function(next){
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//         if(err) return next(err);

//         bcrypt.hash(user.password, salt, function(err, hash){
//             if(err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });

module.exports = {
    user: User
}