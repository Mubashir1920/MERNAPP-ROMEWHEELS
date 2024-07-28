import React, { useEffect } from 'react';
import bg from '../../assets/Herobg.jpg'
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const HeroSection = () => {

    useEffect(() => {


        gsap.from('.animtext', {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            ease: 'Second.inOut',
            stagger: 0.7,

        })

    }, [])
    return (
        <div className="relative bg-black text-white h-screen flex flex-col justify-center items-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${bg})` }}></div>

            <div className="relative animtext text-center p-4">
                <h1 className=" text-4xl md:text-6xl font-bold">RENT RIDE & DRIVE</h1>
                <p className="mt-4 text-xl  mb-4 pb-10 md:text-3xl">RomeWheels</p>
                <p className="mt-8  max-w-md mx-auto text-xl">
                    The open road awaits. Explore with ease - Find your ideal rental car today.
                </p>
                <Link to='/shop' >
                    <button className="mt-8 z-95 px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 text-lg transition">
                        BROWSER CARS
                    </button>
                </Link>
            </div>

            <div className="absolute bottom-4 left-4 text-lg md:text-base">
                <p>+01 800 25923857</p>
                <p>100 Main St, New York NY 10002, USA</p>
            </div>

            <div className="absolute top-50 left-4 space-y-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>

            <div className="absolute bottom-4 right-4 space-y-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
        </div>
    );
};

export default HeroSection;
