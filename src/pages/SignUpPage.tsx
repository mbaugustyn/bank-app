import React, { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { Sign } from "crypto";

export function SignUpPage() {
  let navigate = useNavigate();
  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Sign up"}></Header>
        <div className="login-container">
          <button className="util-button" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="util-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>

      <SignUpForm></SignUpForm>
    </div>
  );
}
