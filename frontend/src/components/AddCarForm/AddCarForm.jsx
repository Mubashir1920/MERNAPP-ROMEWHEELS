import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../../Utils/axiosInstance';

const AddCarForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        engineCapacity: '',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        color: '',
        perDayRate: '',
        carType: 'sedan',
        status: 'available'
    });
    const [carDisplayImg, setCarDisplayImg] = useState(null);
    const [carImages, setCarImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'carDisplayImg') {
            setCarDisplayImg(e.target.files[0]);
        } else if (e.target.name === 'carImages') {
            setCarImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('make', formData.make);
        data.append('model', formData.model);
        data.append('year', formData.year);
        data.append('engineCapacity', formData.engineCapacity);
        data.append('fuelType', formData.fuelType);
        data.append('transmission', formData.transmission);
        data.append('color', formData.color);
        data.append('carDisplayImg', carDisplayImg);
        carImages.forEach((image, index) => {
            data.append('carImages', image);
        });
        data.append('perDayRate', formData.perDayRate);
        data.append('carType', formData.carType);
        data.append('status', formData.status);

        try {
            const res = await axiosInstance.post('/add-car', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='shadow-[0px_0px_145px_-50px_#44337a] relative rounded-2xl bg-gray-800 w-[90%] mx-auto sm:w-[75%] md:w-[60%] lg:w-[50%] lg:mx-auto sm:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 text-white text-2xl shadow-lg'>
            <div className='absolute top-4 right-4 rounded-full'>
                <IoMdClose onClick={onClose} size={22} className='text-white cursor-pointer' />
            </div>
            <h1 className='text-6xl text-center'>Add A Car</h1>
            <form className='w-[100%]' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Make:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="text" name="make" value={formData.make} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Model:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="text" name="model" value={formData.model} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Year:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="number" name="year" value={formData.year} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Engine Capacity:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="number" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Fuel Type:</label>
                    <select className='text-black' name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                        <option value="Plug-In Hybrid">Plug-In Hybrid</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label>Transmission:</label>
                    <select className='text-black' name="transmission" value={formData.transmission} onChange={handleChange} required>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label>Color:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="text" name="color" value={formData.color} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Car Display Image:</label>
                    <input type="file" name="carDisplayImg" onChange={handleFileChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Car Images:</label>
                    <input type="file" name="carImages" multiple onChange={handleFileChange} />
                </div>
                <div className='flex flex-col'>
                    <label>Per Day Rate:</label>
                    <input className='text-black focus:outline-none px-2 rounded-lg' type="number" name="perDayRate" value={formData.perDayRate} onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                    <label>Car Type:</label>
                    <select className='text-black' name="carType" value={formData.carType} onChange={handleChange} required>
                        <option value="sedan">Sedan</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="suv">SUV</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label>Status:</label>
                    <select className='text-black' name="status" value={formData.status} onChange={handleChange} required>
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                    </select>
                </div>
                <div className='flex justify-center w-100%'>
                    <button className='bg-gray-950 mt-2 hover:bg-black shadow drop-shadow-lg px-6 py-2 rounded-lg' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddCarForm;
