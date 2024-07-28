import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Carousel from '../Carousel/Carousel';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';



const FullCarCard = () => {
  const user = useSelector(state=> state.user)

  const navigate = useNavigate();
  const { id: carId } = useParams()
  const [car, setCar] = useState('');
  //Form Handlers
  const [Cnicform, setCnicform] = useState(user ? user.cnic : '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numOfDays, setNumOfDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  //Accordion
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  //Carousel
  const [slides, setSlides] = useState([])
  // Error in Form
  const [error, setError] = useState('');



  const handleDateChange = (start, end) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to the beginning of today

      if (startDateObj < today) {
        setError('The start date cannot be in the past');
        setStartDate('');
        setEndDate('');
        setNumOfDays('');
        setTotalCost('');
        return;
      }

      if (endDateObj <= startDateObj) {
        setError('End date must come after start date.');
        setEndDate('');
        setNumOfDays('');
        setTotalCost('');
        return;
      }

      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumOfDays(diffDays);
      setTotalCost(diffDays * car.perDayRate);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !document.getElementById('terms').checked) {
      setError('Please fill all fields and accept the terms.');
      return;
    }

    // Additional submission logic here (e.g., API call)
    try {

      if (user) {
          await axiosInstance.post('/add-booking', {
          carId: car._id,
          userId: user._id,
          cnic: Cnicform,
          startDate: startDate,
          endDate: endDate,
          noOfDays: numOfDays,
          totalCost: totalCost
        })
        toast.success('Car Booked Successfully!');
        navigate('/mybookings')
      }else{
        toast.error('Please Login First To Book the Car!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error('Please Login to Book a Car! ', {
        style: {
          background: '#000',
          border: '1px solid #000',
          padding: '16px',
          color: '#fff',
        },
      });
      navigate('/login')
    }

  };

  useEffect(() => {
    axiosInstance.get(`/get-car/${carId}`)
      .then(res => {
        setCar(res.data.car);
        setSlides(res.data.car.carImages)
      })
      .catch(err => {
        console.error(err);
        toast.error('Fail To Load! Try Again', {
          style: {
            background: '#000',
            border: '1px solid #000',
            padding: '16px',
            color: '#fff',
          },
        });
      });
  }, [carId])

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 bg-black text-white mt-28 min-h-[100vh]">
        <div className="w-full md:w-1/2 p-4">
          <Carousel  >
            {[...slides.map((s) => (
              <img className='w-[50%] h-[100%] object-cover' src={`${process.env.REACT_APP_BASE_URL}${s}`} />
            ))]}
          </Carousel>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="mb-4">
            <div className="bg-black border-[1px] border-[#ffffff23] p-4 rounded-3xl mb-4">
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <h2 className="text-2xl font-semibold my-1">
                  Car Description
                  <span className="float-right">{isDescriptionOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
                </h2>
              </button>
              {isDescriptionOpen && (
                <div>
                  <p className='mb-3'>Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.</p>
                  <h1 className="text-3xl capitalize font-semibold"> {`${car.make} ${car.model} ${car.year}`}</h1>
                  <div className="flex items-center mt-2">
                    <span className="bg-green-300 capitalize text-black font-semibold  px-3 rounded-full text-md">{car.carType}</span>
                    <span className="bg-green-300 text-black  px-3 rounded-full font-semibold text-md ml-2">Available</span>
                  </div>
                  <ul className="capitalize tracking-wide text-2xl mt-4">
                    {car.engineCapacity === 0 ? null : <li>ENGINE :{car.engineCapacity} CC</li>}
                    <li>TRANSMISSION :{car.transmission}</li>
                    <li>COLOR : {car.color}</li>
                    <li>COST PER DAY: {car.perDayRate} PKR / DAY</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-black border-[1px] border-[#ffffff23] p-4 rounded-3xl">
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => setIsBookingOpen(!isBookingOpen)}
              >
                <h2 className="text-2xl font-semibold my-2">
                  Book This Car
                  <span className="float-right">{isBookingOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
                </h2>
              </button>
              {isBookingOpen && (
                <form onSubmit={handleSubmit} className='text-xl' >
                  <p className='text-white text-lg mb-1 tracking-wide font-semibold' >Note : Login/SignUp Before Booking The Car</p>
                  <div className="mb-5">
                    <label className="mb-3 block text-xl">CNIC</label>
                    <p className='text-sm tracking-wide' >Enter CNIC without Dashes</p>
                    <input value={Cnicform} maxLength={13} onChange={({ target }) => setCnicform(target.value)} type="text" className="w-full p-2 rounded bg-black border-[1px] border-white text-white" />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-xl">From : Date</label>
                    <input
                      type="date"
                      className="w-full p-2 rounded bg-white border-[1px] border-white text-black"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        handleDateChange(e.target.value, endDate);
                      }}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-xl">To : Date</label>
                    <input
                      type="date"
                      className="w-full p-2 rounded  border-[1px] border-white text-black"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        handleDateChange(startDate, e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-xl">NO. OF DAYS</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-black border-[1px] border-white text-white"
                      value={numOfDays}
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-xl">TOTAL COST</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-black border-[1px] border-white text-white"
                      value={totalCost}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label className='text-xl' htmlFor="terms">
                      I accept the terms <a href="#" className=" underline">Read our T&Cs</a>
                    </label>
                  </div>
                  {error && <div><p className='text-red-500 text-lg' >{error}</p></div>}
                  <button type="submit" className="w-full text-xl bg-yellow-500 py-2 rounded text-black font-bold">
                    BOOK NOW
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FullCarCard;
