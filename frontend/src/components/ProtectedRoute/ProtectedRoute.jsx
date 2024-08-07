import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;