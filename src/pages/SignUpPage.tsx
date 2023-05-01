import React, { useState } from "react";
import { Header } from '../components/Header'
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm"
import { Sign } from "crypto";

export function SignUpPage() {
    let navigate = useNavigate();
    return (
        <div className="main">
            <button onClick={() => navigate('/home')}>Home </button>
            <Header text={"Sign up"}></Header>
            <SignUpForm></SignUpForm>
        </div>
    )
}