import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/WhiteLogo.png';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import bgImg from '../../assets/Herobg.jpg';
import gsap from 'gsap';
import axiosInstance from '../../Utils/axiosInstance';
import toast from 'react-hot-toast';
import { login } from '../../store/Slices/authSlice';
import { useDispatch } from 'react-redux'



const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);

    const toggleshowpassword = () => {
        setisShowPassword(!isShowPassword)
    }

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
                navigate('/')
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

    useEffect(() => {
        gsap.fromTo('.login',
            {
                opacity: 0,
                y: '-100%'
            },
            {
                opacity: 1,
                y: '0%',
                duration: 0.7,
                ease: 'power2.out',
                delay: 0.2
            }
        );

    }, [])

    return (
        <div>

            <div className="min-h-screen  flex flex-col items-center justify-center "
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="flex flex-col login bg-gray-900 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                    <img className='w-40 mx-auto my-6' src={Logo} alt="RomeWheels" />

                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-white">Login To Your Account</div>
                    <div className="mt-10">
                        <form onSubmit={LoginHandler} action="#">
                            <div className="flex flex-col mb-6">
                                <label for="email" className="mb-1 text-lg  text-white">E-Mail Address:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center  justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>

                                    <input value={email} onChange={({ target }) => setEmail(target.value)} id="email" type="email" name="email" className="text-lg  placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 tracking-wider font-semibold focus:outline-none focus:border-blue-400" required />

                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label for="password" className="mb-1 text-lg font-semibold tracking-wide text-white">Password:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <span>
                                            <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className='flex items-center border  rounded-lg'>

                                        <div className='rounded-lg flex items-center bg-white w-full' >
                                            <input className="bg-gray-50 border text-lg font-semibold pl-10  text-black rounded-lg block w-full mr-3 p-2.5"
                                                required
                                                value={password}
                                                onChange={({ target }) => setPassword(target.value)}
                                                type={isShowPassword ? 'text' : 'password'}
                                                placeholder={'Password'}
                                            />
                                            {isShowPassword ?
                                                <FaRegEye
                                                    size={22}
                                                    className='text-primary cursor-pointer'
                                                    onClick={() => toggleshowpassword()}
                                                />
                                                :
                                                <FaRegEyeSlash size={22}
                                                    className='text-primary cursor-pointer'
                                                    onClick={() => toggleshowpassword()} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {error && <p className='text-red-600 text-lg pb-1' >{error}</p>}
                            <div className="flex w-full">
                                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 rounded py-2 w-full transition duration-150 ease-in">
                                    <span className="mr-2 text-lg font-semibold uppercase">Login</span>
                                    <span>
                                        <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <a href="#" target="_blank" className="inline-flex items-center font-semibold text-yellow-500 hover:text-yellow-700 text-lg text-center">
                            <Link to='/signup' > <span className="ml-2">Don't have an account? SignUp</span></Link>
                        </a>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <a href="#" target="_blank" className="inline-flex items-center font-semibold text-yellow-500 hover:text-yellow-700 text-lg text-center">
                            <Link to='/' > <span className="ml-2">Go To Home</span></Link>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
