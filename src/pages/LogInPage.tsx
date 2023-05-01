import React, { useState, useEffect } from "react";
import { Header } from '../components/Header'
import { useNavigate } from "react-router-dom";
import LogInForm from "../components/LogInForm"

export function LogInPage() {

    let navigate = useNavigate();
    var loggedInUser = localStorage.getItem("loggedIn");
    console.log("Logged in? " + loggedInUser);

    if (loggedInUser == 'false') {
        return (
            <div className="main">
                <button onClick={() => navigate('/home')}>Home </button>
                <Header text={"Login"}></Header>
                <LogInForm></LogInForm>
            </div>
        )
    }
    else {
        return (
            <div className="main">
                <button onClick={() => navigate('/home')}>Home </button>
                <Header text={"You are logged in"}></Header>
                <button onClick={() => { localStorage.setItem('loggedIn', 'false'); window.location.reload(); }}>
                    Sign out </button>
            </div >
        )
    }
}