import React, { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
export function HomePage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedIn");
  const email = localStorage.getItem("email");

  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Michals Bank"}></Header>

        {loggedInUser == "true" ? (
          <div className="logout-container">
            <button
              className="util-button"
              onClick={() => {
                localStorage.setItem("loggedIn", "false");
                window.location.reload();
                googleLogout();
              }}
            >
              Log out <br /> {email}
            </button>
          </div>
        ) : (
          <div className="login-container">
            <button className="util-button" onClick={() => navigate("/login")}>
              Log in
            </button>
            <button className="util-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        )}
      </div>

      {loggedInUser == "true" ? (
        <div className="func-buttons-container">
          <button className="func-button" onClick={() => navigate("/transfer")}>
            Send Transfer
          </button>
          <button
            className="func-button"
            onClick={() => navigate("/transferhistory")}
          >
            See transfer history{" "}
          </button>
          <button className="func-button" onClick={() => navigate("/message")}>
            See messages
          </button>
        </div>
      ) : null}
    </div>
  );
}
