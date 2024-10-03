import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosInstance from '../Utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from '../store/Slices/authSlice';


const Admin = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');

    const LoginHandler = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please Enter Email!")
            return;

        }
        if (!password) {
            setError("Please Enter Password!")
            return;
        }

        setError(" ")
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password
            });
            //Successful Login 
            if (response.data && response.data.accessToken) {
                toast.success('Login Successful!');
                dispatch(login(response.data))
                navigate('/dashboard')
            }


        } catch (error) {
            toast.error('Login Failed!');
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong! Please try again later.")
            }
        }
    }
    return (
        <div>

            <div className="h-screen md:flex">
                <div
                    className="relative overflow-hidden md:flex w-1/2 bg-black i justify-around items-center hidden">
                    <div>
                        <h1 className="text-white font-bold text-6xl">ROMEWHEELS</h1>
                        <p className="text-white text-center mt-1">Admin Panel</p>

                    </div>
                    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>
                <div className="flex md:w-1/2 text-2xl justify-center py-10 items-center bg-white">
                    <form onSubmit={LoginHandler} className="w-64 bg-white">
                        <h1 className="text-gray-800 font-bold text-3xl mb-1">Welcome Back</h1>

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-2 w-[100%] outline-none border-none" type="text" name="" id="" placeholder="Email Address" required />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="pl-2 outline-none border-none w-[100%] " type="password" name="" id="" placeholder="Password" required />
                        </div>
                        {error && <p className='text-red-600 text-lg pb-1' >{error}</p>}
                        <button type="submit" className="block w-full bg-black mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Admin
