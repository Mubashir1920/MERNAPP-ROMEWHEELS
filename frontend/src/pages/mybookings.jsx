import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axiosInstance from '../Utils/axiosInstance';
import BookingCard from '../components/BookingCard/BookingCard';
import Footer from '../components/Footer/Footer'
import { FaNotesMedical } from "react-icons/fa6";
import toast from 'react-hot-toast'


const MyBookings = () => {

    const [bookings, setBookings] = useState([])

    const cancelBookingHandler = async (id) => {
        try {
            const res = await axiosInstance.delete(`/delete-booking/${id}`)
                .then(res => toast.success('Booking Cancelled Successfully'))
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const fetchBookings = async () => {
            try {
                const res = await axiosInstance.get('/get-booking')
                if (res.data && res.data.bookings) {
                    setBookings(res.data.bookings)
                    res.data.bookings.map(booking => {
                        const endDate = new Date(booking.endDate).toISOString().split('T')[0];
                        const today = new Date().toISOString().split('T')[0];
                        if (endDate < today) cancelBookingHandler(booking._id);
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBookings();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">
                <div className="py-16"></div>
                <h1 className="text-left text-3xl md:text-6xl font-semibold text-white">My Bookings</h1>
                <div className=' flex flex-col' >


                    {bookings && bookings.length > 0 ? (
                        bookings.map(booking => (
                            <div className="mt-10 flex-wrap justify-left  gap-8">
                                <BookingCard key={booking.id} cancelBookingHandler={() => cancelBookingHandler(booking._id)} car={booking.carId} user={booking.userId} booking={booking} />
                            </div>
                        ))
                    ) : (
                        <div className='flex justify-center flex-col items-center py-32' >
                            <FaNotesMedical className='text-white  ' size={60} />
                            <h1 className='text-2xl font-semibold mt-6 text-white'>No Bookings</h1>
                        </div>
                    )}




                </div>
            </div>

            <div className='py-16' ></div>
            <Footer />
        </>
    )
}

export default MyBookings
