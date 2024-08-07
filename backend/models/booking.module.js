const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cnic:{
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    noOfDays: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Booking', bookingSchema);