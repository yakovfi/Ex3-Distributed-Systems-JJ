const mongoose = require('mongoose')
const id_validator = require ('mongoose-id-validator');

var GuideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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

GuideSchema.plugin(id_validator);
GuideSchema.index("completed");
const Guide = mongoose.model('Guide', GuideSchema);

module.exports = Guide








// const mongoose = require('mongoose');
// const id_validator = require ('mongoose-id-validator');

// var TourSchema = new mongoose.Schema({
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required:true},
// }, { timestamps: true });
// TourSchema.plugin(id_validator);
// TourSchema.index("completed");


// const Tour = mongoose.model('Tour4', TourSchema );

// module.exports = Tour