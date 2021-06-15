const mongoose = require('mongoose')
const id_validator = require('mongoose-id-validator');
const validator = require('validator');

var GuideSchema = new mongoose.Schema({
    Guide_Name: {
        type: String,
        required: true,
        trim: true
    },
    Guide_Email: {
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
    Guide_Cell: {
        type: Number,
        required: true,
        trim: true
    },

},
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