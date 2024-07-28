import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/WhiteLogo.png';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import bgImg from '../../assets/Herobg.jpg';
import gsap from 'gsap';
import axiosInstance from '../../Utils/axiosInstance';
import toast from 'react-hot-toast'

const SignUp = () => {

    const navigate = useNavigate();
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (!fullname) {
            setError("Please Enter Full Name!");
            return;
        }
        if (!email) {
            setError("Please Enter Email!");
            return;
        }
        if (!password) {
            setError("Please Enter Password!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError(null);

        try {
            const response = await axiosInstance.post('/create-account', {
                fullname,
                email,
                password
            });
            //Successful Signup 
            if (response.data) {
                setIsLoading(true);
                setTimeout(() => {
                    toast.success('Account Created Successfully!');
                    setIsLoading(false);
                    navigate('/login')
                }, 1500);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong! Please try again later.")
            }
        }
    };

    useEffect(() => {
        gsap.fromTo('.signup',
            {
                opacity: 0,
                y: '100%'
            },
            {
                opacity: 1,
                y: '0%',
                duration: 0.7,
                ease: 'power2.out',
                delay: 0.2
            }
        );
    }, []);

    return (
        <div className='overflow-hidden' >
            <div className="min-h-screen flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="flex flex-col signup bg-gray-900 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-3xl">
                    <img className="w-40 mx-auto my-6" src={Logo} alt="RomeWheels" />

                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-white">Create Your Account</div>
                    <div className="mt-10">
                        <form onSubmit={signUpHandler} action="#">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="fullName" className="mb-1 text-lg text-white">Full Name:</label>
                                    <input value={fullname} onChange={({ target }) => setFullName(target.value)} id="fullName" type="text" name="fullName" className="text-lg placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 tracking-wider font-semibold focus:outline-none focus:border-blue-400" required />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="email" className="mb-1 text-lg text-white">E-Mail Address:</label>
                                    <input value={email} onChange={({ target }) => setEmail(target.value)} id="email" type="email" name="email" className="text-lg placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 tracking-wider font-semibold focus:outline-none focus:border-blue-400" required />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="password" className="mb-1 text-lg font-semibold tracking-wide text-white">Password:</label>
                                    <div className="relative">
                                        <input className="bg-gray-50 border text-lg font-semibold pl-4 pr-10 text-black rounded-lg block w-full p-2.5" value={password} onChange={({ target }) => setPassword(target.value)} type={isShowPassword ? 'text' : 'password'} placeholder="Password" required />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            {isShowPassword ? (
                                                <FaRegEye size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
                                            ) : (
                                                <FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="confirmPassword" className="mb-1 text-lg font-semibold tracking-wide text-white">Confirm Password:</label>
                                    <div className="relative">
                                        <input className="bg-gray-50 border text-lg font-semibold pl-4 pr-10 text-black rounded-lg block w-full p-2.5" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} type={isShowPassword ? 'text' : 'password'} placeholder="Confirm Password" required />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            {isShowPassword ? (
                                                <FaRegEye size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
                                            ) : (
                                                <FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {error && <p className="text-red-600 text-lg pb-1">{error}</p>}
                            <div className="flex w-full mt-4">
                                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 rounded py-2 w-full transition duration-150 ease-in">
                                    <span className="mr-2 text-lg font-semibold uppercase">
                                        {isLoading ? (
                                            <>
                                                <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-white animate-spin dark:text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="white"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#000"></path>
                                                </svg>
                                                Creating Account

                                            </>
                                        ) :

                                            < span className='flex gap-1' >
                                                Sign Up
                                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                        }



                                    </span>

                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <Link to="/login" className="inline-flex items-center font-semibold text-yellow-500 hover:text-yellow-700 text-lg text-center">
                            <span className="ml-2">Already have an account? Login</span>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <Link to="/" className="inline-flex items-center font-semibold text-yellow-500 hover:text-yellow-700 text-lg text-center">
                            <span className="ml-2">Go To Home</span>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SignUp;
