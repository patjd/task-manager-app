const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email is invalid.')
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password'))
                throw new Error('Password should not contain the word `password`.')
        },
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0)
                throw new Error('Age must be a positive number.')
        },
        default: 0,
    }
})

module.exports = User