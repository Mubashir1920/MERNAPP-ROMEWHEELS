const mongoose = require('mongoose');
const Schema = mongoose.Schema


const carSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    engineCapacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-In Hybrid"],
        default: "Petrol",
    },
    transmission: {
        type: String,
        enum: ["Automatic", "Manual",]
    },
    color: {
        type: String,
        required: true
    },
    carDisplayImg: {
        type: String,
        required: true
    },
    carImages: {
        type: [String],
        required: false
    },
    perDayRate: {
        type: Number,
        required: true
    },
    carType: {
        type: String,
        required: true,
        enum: ['sedan', 'hatchback', 'suv']
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'booked'],
        default: 'available'
    },
})

module.exports = mongoose.model('Car', carSchema);