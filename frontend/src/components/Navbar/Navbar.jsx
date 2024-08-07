import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import classes from './Navbar.module.css';
import gsap from 'gsap/all';
import logoDesktop from '../../assets/WhiteLogo.png'
import logoMobile from '../../assets/romwheelsLogo.png';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/Slices/authSlice'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const [state, setState] = useState(false)
    const [scrolled, setScrolled] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoading, setIsLoading] = useState(false);





    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            onLogout();
            setIsLoading(false);
        }, 1500);
    };

    const navigation = [
        { title: "Home", path: "/" },
        { title: "Book a Car", path: "/shop" },
        { title: "About Us", path: "/about" },
        { title: "Contact Us", path: "/contact" },
    ]



    useEffect(() => {


        gsap.fromTo('.navbar', { y: -100 }, {
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.25,
            scrollTrigger: {
                trigger: '.navbar',
                start: 'top top',
            }
        })
        const menuItems = document.querySelectorAll('.menu-item');

        gsap.from(menuItems, {
            y: -50,
            opacity: 0,
            stagger: 0.2,
            ease: 'bounce.out',
            duration: 1,
        });
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };




    }, [])



    return (

        <nav className={`${scrolled} ${classes.header} navbar border-b w-full md:static md:text-sm md:border-none`}>
            <div className={`${classes.mobileheader} items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8`}>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to='/'>
                        <img
                            src={isMobile ? logoMobile : logoDesktop}
                            alt="Urban Edge"
                            className='w-40'
                        />
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-gray-900"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className={`hover:font-bold text-2xl ${isMobile ? 'text-black' : 'text-white'}`}>
                                        <Link to={item.path} className=" menu-item mr-6 block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        {isLoggedIn ? <li className={`hover:font-bold text-2xl ${isMobile ? 'text-black' : 'text-white'}`}>
                            <Link to='/mybookings' className=" menu-item mr-6 block">
                                My Bookings
                            </Link>
                        </li> : null}
                        {user && user.fullname === "admin" && (
                            <li className={`hover:font-bold text-2xl ${isMobile ? 'text-black' : 'text-white'}`}>
                                <Link to='/dashboard' className="menu-item mr-6 block">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3  items-center gap-x-6 md:flex md:space-y-0'>
                            <li>
                                {isLoggedIn ?
                                    <Link onClick={handleLogout} className="block text-xl py-2 px-4 font-medium text-center text-black bg-yellow-500 hover:text-white transition-1 hover:bg-black active:bg-gray-400 transition-colors duration-200 ease-in-out active:shadow-none hover:border hover:border-white hover:border-1  rounded-xl shadow md:inline">
                                        {isLoading ? (
                                            <>
                                                <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#000"></path>
                                                </svg>
                                                Logging Out...
                                            </>
                                        ) : (
                                            'Logout'
                                        )}
                                    </Link>

                                    :
                                    <Link to='/login' className="block text-xl py-2 px-4 font-medium text-center text-black bg-yellow-500 hover:text-white transition-1 hover:bg-black active:bg-gray-400 transition-colors duration-200 ease-in-out active:shadow-none hover:border hover:border-white hover:border-1  rounded-xl shadow md:inline">
                                        Login/Signup
                                    </Link>
                                }
                            </li>
                            <li>
                                {isLoggedIn ?
                                    <p className="text-lg text-black sm:text-white capitalize sm:text-center">
                                        Hello,  {user.fullname}
                                    </p>
                                    : null
                                }
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar




