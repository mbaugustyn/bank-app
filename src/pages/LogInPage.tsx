import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import LogInForm from "../components/LogInForm";

export function LogInPage() {
  let navigate = useNavigate();

  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Login"}></Header>
        <div className="login-container">
          <button className="util-button" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="util-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>

      <LogInForm />
    </div>
  );
}
