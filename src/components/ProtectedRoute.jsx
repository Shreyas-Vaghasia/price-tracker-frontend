import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            navigate('/login')
        }

    }, [])

    return (
        <Component />
    )
}

export default ProtectedRoute