const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cnic:{
        type: String,
    }
})

module.exports =  mongoose.model('User' , userSchema)
