import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Contact = () => {
    return (
        <>
            <div>
                <Navbar />
                <br />

                <section>
                    <div className="relative w-full h-96"><img className="absolute h-full w-full object-cover object-center" src="https://c4.wallpaperflare.com/wallpaper/835/37/166/black-car-wallpaper-preview.jpg" alt="nature image" />
                        <div className="absolute inset-0 h-full w-full bg-black/50"></div>
                        <div className="relative pt-28 text-center">
                            <h2 className="block tracking-normal  font-semibold leading-[1.3] text-white mb-4 text-4xl lg:text-5xl">Contact Us</h2>
                            <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">Have questions or need assistance? We’re here to help! Reach out to our friendly team</p>
                        </div>
                    </div>
                    <div className="-mt-16 mb-8 px-8   ">
                        <div className="container mx-auto ">



                            <div className="flex min-h-screen items-center justify-start bg-white p-4 sm:p-8 text-center sm:text-left rounded-xl">
                                <div className="mx-auto w-full max-w-lg">
                                    <h1 className="text-6xl font-medium">React Out To Us</h1>
                                    <p className="mt-3 text-xl">Email us at help@romewheels.com or message us here:</p>

                                    <form action="https://api.web3forms.com/submit" className="text-xl mt-10">
                                        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="relative z-0">
                                                <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-xl text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                                                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
                                            </div>
                                            <div className="relative z-0">
                                                <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-xl text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                                                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
                                            </div>
                                            <div className="relative z-0 col-span-2">
                                                <textarea name="message" rows="5" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-xl text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
                                                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export default Contact
