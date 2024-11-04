import Booking from '../models/Booking.js';

export const createBooking = async(req, res) => {
    // Use the userId from the token, not from the request body
    const userId = req.user.id; 

    // Create a new booking with user ID extracted from the token
    const newBooking = new Booking({
        ...req.body,
        userId, 
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({ success: true, message: 'Your tour is booked', data: savedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};


//get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({ success: true, message: 'Successful', data: book });

    } catch (err) {
        res.status(404).json({ success: false, message: 'Not found', error: err.message });

    }
};

//get all booking
export const getAllBooking = async(req,res)=>{
     try {
        const books = await Booking.find()
        res.status(200).json({ success: true, message: 'Successful', data:books });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });

    }
};