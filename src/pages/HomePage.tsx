import React, { useState } from "react";
import { Header } from '../components/Header'
import { useNavigate } from "react-router-dom";
export function HomePage() {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem("loggedIn");
    const email = localStorage.getItem("email");
    console.log("Logged in? " + loggedInUser);
    if (loggedInUser == "true") {
        return (
            <div className="main">
                <div>
                    You are logged in as {email}
                </div>
                <Header text={'Welcome to Michals Bank'}></Header>
                <div className="func-buttons-container">
                    <button className="func-button" onClick={() => navigate('/login')}>Signout</button>
                    <button className="func-button" onClick={() => navigate('/message')}>See messages</button>
                    <button className="func-button" onClick={() => navigate('/transfer')}>Send Transfer</button>
                    <button className="func-button" onClick={() => navigate('/transferhistory')}>See transfer history </button>
                </div>
            </div >
        )
    }
    return (
        <div className="main">
            <Header text={'Welcome to Michals Bank'}></Header>
            <div className="func-buttons-container">
                <button className="func-button" onClick={() => navigate('/login')}>Login</button>
                <button className="func-button" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
        </div >
    )
}