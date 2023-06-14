import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthUserGoogle } from "../util/DBQueries";

export function LogInPage() {
  let navigate = useNavigate();

  const [user, setUser] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  var newdata;
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          newdata = res.data;
          setProfile(res.data);
          return AuthUserGoogle(res.data.email);
        })
        .then((res) => {
          console.log("2. Profile:");
          console.log(newdata);
          if (res.status == 200) {
            // succesfully received token
            localStorage.setItem("JWT", res.accessToken);
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("email", newdata.email);
          } else {
            // did not get the token
            localStorage.setItem("loggedIn", "false");
          }
          console.log("Res:");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Login"}></Header>

        <div className="googleLogin">
          <h2>React Google Login</h2>
          <br />
          <br />
          {profile ? (
            <div>
              <img src={profile.picture} alt="user image" />
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <br />
              <br />
              <button onClick={logOut}>Log out</button>
            </div>
          ) : (
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
          )}
        </div>

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
