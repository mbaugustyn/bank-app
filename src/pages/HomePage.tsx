import React, { useState } from "react";
import { Header } from '../components/Header'
import { useNavigate } from "react-router-dom";
export function HomePage() {
    let navigate = useNavigate();
    return (
        <div className="main">

            <Header text={'Welcome to Michals Bank'}></Header>
            <div className="func-buttons-container">
                <button className="func-button" onClick={() => navigate('/login')}>Login</button>
                <button className="func-button" onClick={() => navigate('/signup')}>Sign Up</button>
                <button className="func-button" onClick={() => navigate('/message')}>See messages</button>
                <button className="func-button" onClick={() => navigate('/transfer')}>Send Transfer</button>  </div>
        </div >
    )
}