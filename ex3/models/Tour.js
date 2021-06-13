const mongoose = require('mongoose');
const id_validator = require ('mongoose-id-validator');

var TourSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    Guide_Name: {
        type: String,
        required: true,
        trim: true
    },
    Guide_Email: {
        type: String,
        required: true,
        trim: true
    },
    Guide_Cell: {
        type: Number,
        required: true,
        trim: true
    },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required:true},
}, { timestamps: true });
TourSchema.plugin(id_validator);
TourSchema.index("completed");


const Tour = mongoose.model('Tour', TourSchema );

module.exports = Tour