const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
const validator = require('validator');

var TourSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Guide Name is invalid')
            }
        }
    },
    start_date: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Duration cannot be negative')
            }
        }
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Price cannot be negative')
            }
        }
    },
    path: {
        type: Array,
    },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true }
});
TourSchema.plugin(id_validator);
TourSchema.index("completed");


const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour