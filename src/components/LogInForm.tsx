import { get } from "http";
import React, { useState, useEffect } from "react";

interface Login {
    email: string,
    password: string,
};

interface LoginResponse {
    status: number,
    message: string,
    id: number
};


export default function LogInForm() {
    const Obj: Login = { email: "", password: "" };
    const [inputs, setInputs] = useState(Obj);

    const authUserUrl = new URL("http://localhost:8000/authuser");
    authUserUrl.searchParams.append("email", (inputs.email));
    authUserUrl.searchParams.append("password", (inputs.password));

    async function AuthUser(): Promise<LoginResponse> {
        var response = await fetch(authUserUrl, {
            method: 'GET',
            mode: 'cors',
        });
        const Resp: LoginResponse = await response.json();
        return Resp;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const res = await AuthUser();
            if (res.status === 200) {
                alert("Login Successfull!")
                localStorage.setItem('loggedIn', 'true');
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

    const handleInputChange = (event: any) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }


    return (

        <form onSubmit={handleSubmit} className="form_main"> Please fill:
            <label className="form_field">
                <input id="email" name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={inputs.email} placeholder="Email" onChange={handleInputChange}
                />
            </label>
            <label className="form_field">
                <input name="password" type="password" value={inputs.password} placeholder="Password" onChange={handleInputChange} />
            </label>

            <input id="bttn_id" className="bttn-submit" name="bttn" type="submit" value="Login" />
            {/* If you forgot your password, write your email and click the below button. */}
            {/* <input id="bttn_id" className="bttn-submit" name="bttn" type="submit" value="Remind my password" /> */}
        </form>
    );

}