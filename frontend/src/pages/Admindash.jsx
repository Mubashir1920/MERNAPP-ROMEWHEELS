import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/WhiteLogo.png';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import BookingCard from '../components/BookingCard/BookingCard';
import axiosInstance from '../Utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Slices/authSlice';
import Carcard from '../components/CarCard/Carcard.jsx'
import { GoDotFill } from "react-icons/go";
import toast from 'react-hot-toast'


const Admindash = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [isShownBooking, setIsShownBooking] = useState(false)
  const [bookings, setBookings] = useState([] || false);
  const [cars, setCars] = useState([] || false);

  const AddCarHadler = () => {
    setIsShown(!isShown)
  }
  const deleteCarHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-car/${id}`)
      if (!res.error) toast.success('Car Deleted Successfully!')
      setCars(cars.filter(car => car._id !== id))
    } catch (error) {
      toast.error(error)
    }
  }
  const onCloseHandler = () => {
    setIsShown(false)
    showCarsHandler();
  }
  const showBookingsHandler = async () => {
    try {
      const res = await axiosInstance('/get-all-booking')
      if (res.data && res.data.bookings) {
        setBookings(res.data.bookings)
        setCars(false);
        if (res.data.bookings.length == 0) setIsShownBooking(true)
      }

    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setIsShownBooking(false);
    }, 3000);

  }
  const LogoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }


  const showCarsHandler = async () => {
    try {
      const res = await axiosInstance.get('/get-cars')
      if (res.data && res.data.cars) {
        setCars(res.data.cars)
        setBookings(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative pb-10' >
      <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white'>
        <div className='mt-4 md:mt-0'>
          <img src={Logo} className='w-32 md:w-40' alt="RomeWheels Logo" />
        </div>
        <div><h1 className='text-3xl' >Howdy , Admin</h1></div>
        <div className='mt-4 items-center flex-wrap justify-center flex gap-4'>
          <Link to='/' className='bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4 rounded'>Home</Link>
          <button onClick={() => setIsShown(true)} className='bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4 rounded'>Add Car</button>
          <button onClick={showBookingsHandler} className='bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4 rounded'>Show Booked</button>
          <button onClick={showCarsHandler} className='bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4 rounded'>Show Cars</button>
          <button onClick={LogoutHandler} className='bg-gray-700 hover:bg-gray-600 text-white text-xl py-2 px-4 rounded'>Logout</button>
        </div>
      </div>

      <div className='py-6' ></div>


      <div className='container mx-auto flex flex-col items-center sm:flex-row sm:items-center sm:justify-start gap-2'>
        {bookings && (
          <div>
            <a href="#" className="flex items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <GoDotFill className='mb-2 text-xl text-red-600' />
              <h5 className="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">Total Booked: {bookings.length}</h5>
            </a>
          </div>
        )}
        {cars && (
          <div>
            <a href="#" className="flex items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <GoDotFill className='text-xl text-green-600 mb-2' />
              <h5 className="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">Total Cars: {cars.length}</h5>
            </a>
          </div>
        )}
      </div>

// Booking
      <div className='container mx-auto flex flex-col items-center sm:flex-row sm:items-start gap-4'>
        <div className='flex flex-wrap justify-center lg:justify-start gap-4'>
          {cars ? (
            cars.map(car => (
              <div key={car._id} className='mt-10 flex-shrink-0'>
                <Carcard deleteCarHandler={() => deleteCarHandler(car._id)} isAdmin={true} car={car} />
              </div>
            ))
          ) : null}
        </div>
        {bookings && bookings.length > 0 ? (
          bookings.map(booking => (
            <div className="mt-10 flex-wrap justify-center gap-8">
              <BookingCard isAdmin={true} key={booking.id} car={booking.carId} user={booking.userId} booking={booking} />
            </div>
          ))
        ) : isShownBooking && (
          <div className='flex justify-center py-18'>
            <h1 className='text-white text-3xl font-bold'>No Booking Available</h1>
          </div>
        )}
      </div>


      <div className='absolute top-10  w-[100%]' >
        {isShown ? <AddCarForm onClose={onCloseHandler} /> : null}

      </div>
    </div>
  )
}

export default Admindash
