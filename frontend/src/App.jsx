
import React from 'react';
import { Route, Routes } from 'react-router'
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import AboutUs from './pages/Aboutus';
import Admin from './pages/Admin';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/Signup';
import MyBookings from './pages/mybookings';
import { Toaster } from 'react-hot-toast';
import FullCarCard from './components/FullCarCard/FullCarCard';
import Admindash from './pages/Admindash';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminProtectRoute from './components/ProtectedRoute/AdminProtectRoute';


function App() {
  return (

    <div>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/mybookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path='/dashboard' element={<AdminProtectRoute><Admindash /></AdminProtectRoute>} />
        <Route path="/car/:id" exact element={<FullCarCard/>} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>

  );
}

export default App;
