import React from 'react';
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiOrange } from "react-icons/gi";
import { IoSpeedometer } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoCarSport } from "react-icons/io5";
import { LuPaintbrush2 } from "react-icons/lu";
import { GiGearStick } from "react-icons/gi";
import { GrStatusInfoSmall } from "react-icons/gr";



const CarCard = ({ car, isAdmin,deleteCarHandler }) => {
   

    return (
        <div className="max-w-sm rounded-lg shadow-lg bg-gray-800 text-white">
            <div className="p-4 ">
                <h2 className="text-2xl tracking-wide font-bold">{car.make}</h2>
                <p className="text-gray-400 text-xl">{car.model}</p>
                <div className="my-4 w-72 h-52 ">
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}${car.carDisplayImg}`}
                        alt="Car"
                        className="w-full object-cover  h-full rounded-lg"
                    />
                </div>
                <div className=" flex text-xl items-center justify-left gap-4  text-md">
                    <div className=" flex items-center">
                        <GiOrange className='text-white mr-1' />
                        <span className="mr-2  ">{car.year}</span>
                    </div>
                    <div className="flex items-center">
                        <LuPaintbrush2 className='text-white mr-1' />
                        <span className="mr-2 ">{car.color}</span>
                    </div>
                    <div className="flex items-center">
                        <IoSpeedometer className='text-white mr-1' />
                        <span className="mr-2 ">{car.fuelType}</span>
                    </div>
                </div>
                <div className="flex text-xl items-center gap-4 justify-start mt-4 text-md">
                    <div className="flex items-center">
                        <IoCarSport className='text-white mr-1' />
                        <span className="mr-2 ">{car.carType}</span>
                    </div>
                    <div className="flex items-center">
                        <GiGearStick className='text-white mr-1' />
                        <span className="mr-2 ">{car.transmission}</span>
                    </div>
                   {isAdmin && <div className="flex items-center">
                        <GrStatusInfoSmall  className={`${car.status.toLowerCase() === 'available' ? 'text-green-600' : car.status.toLowerCase() === 'booked' ? 'text-red-600' :''  } mr-1`} />
                        <span className=" capitalize mr-2 ">{car.status}</span>
                    </div>}
                </div>
                <div className="mt-4">
                    <p className=" tracking-wide text-xl font-semibold">PKR {car.perDayRate}/Per Day</p>
                </div>
                {!isAdmin && <Link to={`/car/${car._id}`}>
                    <button className="mt-4 w-full text-xl bg-yellow-500 text-black font-bold py-2 rounded-md">
                        BOOK NOW
                    </button>
                </Link>}
                {isAdmin && <button onClick={deleteCarHandler} className="mt-4 w-full text-xl bg-red-500 text-white font-bold py-2 rounded-md">
                    DELETE CAR
                </button>}
            </div>
        </div>
    );
};

export default CarCard;
