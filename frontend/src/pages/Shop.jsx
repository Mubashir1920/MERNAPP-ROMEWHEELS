import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import CarCard from '../components/CarCard/Carcard';
import Footer from '../components/Footer/Footer';
import axiosInstance from '../Utils/axiosInstance';
import toast from 'react-hot-toast';

const Shop = () => {

    const [activeTab, setActiveTab] = useState('All');
    const [cars, setCars] = useState([])
    const [filteredCar, setFilteredCar] = useState([]);
    const tabs = ['All', 'sedan', 'suv', 'hatchback'];

    const ActiveTab = (tab) => {
        setActiveTab(tab);

        if (tab === 'All') {
            setFilteredCar(cars);
        } else {

            setFilteredCar(cars.filter(car => car.carType.toLowerCase() === tab.toLowerCase()))
        }


    }
    const features = [
        {
            title: "Best price guaranteed",
            desc: "Find a lower price? We'll refund you 100% of the difference."
        },
        {
            title: "Experienced driver",
            desc: "Don't have driver? Don't worry, we have many experienced drivers for you."
        },
        {
            title: "24 hour car delivery",
            desc: "Book your car anytime and we will deliver it directly to you."
        },
        {
            title: "24/7 technical support",
            desc: "Have a question? Contact Rentcars support any time when you have problem."
        }
    ];




    useEffect(() => {

        const fetchcars = async () => {
            try {
                const response = await axiosInstance.get('/get-cars')
                if (response.data && response.data.cars) {
                    setCars(response.data.cars)
                    setFilteredCar(response.data.cars)
                }
            } catch (error) {
                toast.error(error);
            }
        }

        fetchcars();


    }, [])

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center pt-32 bg-black text-white">
                <h1 className="text-3xl sm:mt-11 md:text-5xl font-bold mb-4">Start your search today -</h1>
                <p className="text-xl md:text-2xl mb-8">Discover your next car with us!</p>
                <div className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 text-xl capitalize py-2 rounded ${activeTab === tab ? 'bg-gray-700' : 'bg-gray-900 hover:bg-gray-700'}`}
                            onClick={() => ActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="container mt-10 flex flex-wrap justify-center lg:justify-left gap-8">
                    {filteredCar.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>

                <div className="why-choose-us  py-20 px-10">
                    <h2 className="text-4xl text-center font-bold mb-10">Why Choose Us</h2>
                    <p className="text-2xl text-center mb-4">We offer the best experience with our rental deals</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex cursor-pointer flex-col items-center bg-gray-900 shadow-lg p-4 hover:translate-y-2 transition-transform duration-300 rounded-md">
                                <i className="text-5xl text-blue-500 fas fa-check-circle"></i>
                                <p className="text-2xl mt-2 text-white">{feature.title}</p>
                                <p className="text-lg text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Shop;
