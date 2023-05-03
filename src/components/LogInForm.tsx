import { get } from "http";
import React, { useState, useEffect } from "react";

import { Login, AuthUser, getUserPassword } from "../util/DBQueries";


export default function LogInForm() {
    const Obj: Login = { email: "", password: "" };
    const [inputs, setInputs] = useState(Obj);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log("Submit!");
    }

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            const res = await AuthUser(inputs);
            if (res.status === 200) {
                alert("Login Successfull!")
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('email', inputs.email);
                window.location.reload();
            }
            else {
                alert("Login Unsuccesfull!");
                localStorage.setItem('loggedIn', 'false');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handlePasswordReset = async (event: any) => {
        event.preventDefault();
        try {
            const res = await getUserPassword(inputs);
            if (res.status === 200) {
                alert("Your Password is " + res.password);
            }
            else {
                alert("No user found");
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleInputChange = (event: any) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }


    return (

        <form className="form_main" onSubmit={handleSubmit}>
            <div className="form_header">
                Please fill:
            </div>
            <label className="form_field">
                <input id="email" name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={inputs.email} placeholder="Email" onChange={handleInputChange}
                />
            </label>
            <label className="form_field">
                <input name="password" type="password" value={inputs.password} placeholder="Password" onChange={handleInputChange} />
            </label>

            <button id="bttn_id" className="bttn-submit" name="bttn" type="button" onClick={handleLogin}>Login</button>
            {/* If you forgot your password, write your email and click the below button. */}
            {/* <input id="bttn_id" className="bttn-submit" name="bttn" type="submit" value="Remind my password" /> */}
            <button type="button" onClick={handlePasswordReset}>Remind my password</button>
        </form>
    );

}