import React from 'react';
import classes from './BookingCard.module.css';

const BookingCard = ({
  car, booking,user, cancelBookingHandler,isAdmin
}) => {


  const startDate = new Date(booking.startDate).toISOString().split('T')[0] 
  const endDate = new Date(booking.endDate).toISOString().split('T')[0]


  return (
    <div class={`${classes.bookingcard} bg-gray-800 text-white rounded-lg  p-6 max-w-xs`}>
      <h2 class="text-2xl font-bold">{car.make}</h2>
      <p class="text-lg">{car.model}</p>
      <img src={`${process.env.REACT_APP_BASE_URL}${car.carDisplayImg}`} alt="Car" class="w-full h-auto my-4 rounded" />
        <div class="border-t  border-gray-600 my-4"></div>
        <p className='text-xl '><span class="uppercase  tracking-wide font-semibold">BOOKING ID :</span>{booking._id}</p>
        <p className='text-xl capitalize '><span class="uppercase tracking-wide font-semibold">NAME :</span> {user.fullname}</p>
        <p className='text-xl'><span class="uppercase tracking-wide font-semibold">CNIC :</span> {user.cnic}</p>
        <p className='text-xl'><span class="uppercase tracking-wide font-semibold">START DATE :</span> {startDate}</p>
        <p className='text-xl'><span class="uppercase tracking-wide font-semibold">END DATE :</span> {endDate }</p>
        <p className='text-xl'><span class="uppercase tracking-wide font-semibold">DAYS :</span> {booking.noOfDays} DAYS</p>
        <div class="text-right font-bold text-xl my-2">
          TOTAL RENT : {booking.totalCost} /Rs
        </div>
        {isAdmin ? null :
         <button onClick={cancelBookingHandler} class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          CANCEL
        </button>}
    </div>
  )
}

export default BookingCard;
