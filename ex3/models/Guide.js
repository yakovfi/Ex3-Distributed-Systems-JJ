const mongoose = require('mongoose')
const validator = require('validator')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,// שדה חובה
        trim: true// לא מכיל רווחים
    },
    email: {
        type: String,
        required: true, // שדה חובה
        trim: true,
        lowercase: true,// הערך שקיבלנו יומר לאותיוץ קטנות תמיד
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
}, { timestamps: true }
);

TaskSchema.plugin(id_validator);
TaskSchema.index("completed");


const User = mongoose.model('User', UserSchema);

// console.log('users: ', User.find({ name: 'meny' }))
module.exports = User