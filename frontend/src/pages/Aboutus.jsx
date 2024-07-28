
import React from 'react';
import Slide from '../assets/Slide1.mp4';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AboutUs = () => {

    return (
        <>
            <Navbar />
            <div className="mt-[10%] bg-black text-white min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <video autoPlay
                                loop
                                muted
                                src={Slide}></video>
                        </div>
                        <div className="md:w-1/2 md:pl-8">
                            <h1 className="text-4xl italic font-bold mb-4">ROME WHEELS </h1>
                            <h1 className="text-4xl font-bold mb-4">About Us</h1>
                            <p className="text-2xl tracking-wide mb-4">
                                Welcome to our car rental company! We are dedicated to providing you with the best car rental experience. Our fleet consists of a wide range of vehicles, from compact cars to luxury models, ensuring that you find the perfect car for your needs.
                            </p>
                            <p className="text-2xl tracking-wide mb-4">
                                Our team is committed to exceptional customer service and ensuring that your experience is as smooth and enjoyable as possible. We value transparency, reliability, and customer satisfaction.
                            </p>
                           
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
