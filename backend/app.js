const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require("dotenv").config();

app.use(express.json());
app.use(cors(
    {
        origin: '*'
    }
));

app.use("/uploads", express.static("uploads"));

//Multer Configs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to avoid name conflicts
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Mongo Db Connection
mongoose.connect(process.env.connectionString)
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));


//Jwt Token
const jwt = require('jsonwebtoken');
const { authenticatetoken } = require('./utilities')

//  Models 
const User = require('./models/user.module');
const Car = require('./models/car.module');
const Booking = require('./models/booking.module');


app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


//Create Account 
app.post('/create-account', async (req, res) => {

    const { fullname, email, password } = req.body;

    if (!fullname) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is Required!" })
    }


    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is Required!" })
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is Required!" })
    }

    const isUser = await User.findOne({
        email: email
    })
    if (isUser) {
        return res
            .status(400)
            .json({ error: true, message: "Email is already taken!" })
    }

    const newuser = new User({
        fullname,
        email: email.toLowerCase(),
        password
    });

    await newuser.save();

    return res.json({
        error: false,
        message: "Account Created Successfully!",
        newuser
    })
})

//Login Acccount
app.post('/login', async (req, res) => {

    const { email, password } = req.body;


    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res
            .status(400)
            .json({ error: true, message: "Email is not Registered!" })
    }
    if (user.password !== password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is Incorrect!" })
    }
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2000h'
    })
    return res.json({
        error: false,
        message: "Login Successfully!",
        accessToken,
        user
    })



})


//Get User 
app.get('/get-user', authenticatetoken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findById({ _id: user._id });

    if (!isUser) {
        return res
            .status(404)
            .json({ error: true, message: "User Not Found!" })
    }
    return res.json({
        error: false,
        message: "User Found!",
        isUser
    })
})

//Add Car
app.post('/add-car', authenticatetoken, upload.fields([{ name: 'carDisplayImg', maxCount: 1 }, { name: 'carImages', maxCount: 10 }]), async (req, res) => {
    const { user } = req.user;
    const {
        make,
        model,
        year,
        engineCapacity,
        fuelType,
        transmission,
        color,
        perDayRate,
        carType,
        status
    } = req.body;

    // Extract image paths
    const carDisplayImg = req.files['carDisplayImg'] ? req.files['carDisplayImg'][0].path : null;
    const carImages = req.files['carImages'] ? req.files['carImages'].map(file => file.path) : [];

    // Create a new car document
    const newCar = new Car({
        make,
        model,
        year,
        engineCapacity,
        fuelType,
        transmission,
        color,
        carDisplayImg,
        carImages,
        perDayRate,
        carType,
        status:status.toLowerCase()
    });

    try {
        const savedCar = await newCar.save();
        res.status(201).json({
            error: false,
            savedCar,
            user,
            message: "Car Added Successfully!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Error Adding Car' });
    }
});


// Delete Car
app.delete('/delete-car/:carId', authenticatetoken, async (req, res) => {
    const { carId } = req.params;
    try {
        const car = await Car.findOneAndDelete({
            _id: carId
        });

        if (!car) return res.status(404).json({
            error: true, message: "Car Not Found!"
        })
        return res.json({
            error: false,
            message: "Car Deleted Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: true, message: "Something Went Wrong!"
        })
    }
})

// Get a Single Car
app.get('/get-car/:carId', async (req, res) => {
    const { carId } = req.params;
    try {
        const car = await Car.findOne({
            _id: carId
        });
        if (!car) return res.status(404).json({
            error: true, message: "Car Not Found!"
        })
        return res.json({
            error: false,
            car
        })
    } catch (error) {
        return res.status(500).json({
            error: true, message: "Something Went Wrong!"
        })
    }
})


// Get All Available Cars
app.get('/get-cars', async (req, res) => {

    try {
        const cars = await Car.find({status : 'available'});
        res.json({
            error: false,
            cars
        });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Something Went Wrong!' });
    }
})


//Add Booking
app.post('/add-booking', authenticatetoken, async (req, res) => {

    const { user } = req.user;
    const {
        carId,
        userId,
        cnic,
        startDate,
        endDate,
        noOfDays,
        totalCost
    } = req.body;


    try {
        // Retrieve the user
        const isUser = await User.findById({ _id: userId });

        // Check if cnic is empty and set the value if it is
        if (!isUser.cnic) {
            await User.findByIdAndUpdate(userId, { $set: { cnic: cnic } });
        }
        await Car.findByIdAndUpdate({ _id: carId }, { $set: { status: 'booked' } })
    } catch (error) {
        console.log(error);; // Handle potential errors
        return res.json({ error: true, message: "Cant Update the User's Cnic" })
    }

    // Date/time validations (assuming ISO 8601 format)
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj <= new Date()) {
        return res.status(400).json({ error: 'Start date must be in the future' });
    }

    if (endDateObj <= startDateObj) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    try {
        const newBooking = new Booking({
            carId,
            userId,
            cnic,
            startDate,
            endDate,
            noOfDays,
            totalCost
        });
        await newBooking.save();
        return res.status(200).json({
            error: false,
            message: "Booking Added Successfully",
            newBooking,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });

    }



})

// Delete Booking
app.delete('/delete-booking/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        await Car.findByIdAndUpdate({ _id: booking.carId }, { $set: { status: 'available' } });
        await Booking.deleteOne({ _id: booking._id });

        return res.status(200).json({
            error: false, message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});


// Get User Bookings
app.get('/get-booking', authenticatetoken, async (req, res) => {


    const { user } = req.user;
    try {
        const bookings = await Booking.find({ userId: user._id })
            .populate({
                path: "carId",
                select: 'make model year carDisplayImg'
            })
            .populate({
                path: "userId",
                select: 'fullname cnic'
            });
        return res.json({
            error: false,
            bookings,
            user,
            message: "Bookings Fetched Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: true, message: "Something Went Wrong!"
        })
    }
})


// Get All Booking For Admin Dash
app.get('/get-all-booking', authenticatetoken, async (req, res) => {

    const { user } = req.user;
    try {
        const bookings = await Booking.find()
            .populate({
                path: "carId",
                select: 'make model year carDisplayImg'
            })
            .populate({
                path: "userId",
                select: 'fullname cnic'
            });
        return res.json({
            error: false,
            bookings,
            user,
            message: "Bookings Fetched Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: true, message: "Something Went Wrong!"
        })
    }
})


app.listen(8000, console.log("App Started On Port 8000 Successfully!"))


module.exports = app;