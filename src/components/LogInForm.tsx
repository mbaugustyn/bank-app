import { get } from "http";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login, AuthUser, getUserPassword } from "../util/DBQueries";

export default function LogInForm() {
  const Obj: Login = { email: "", password: "" };
  const [inputs, setInputs] = useState(Obj);
  let navigate = useNavigate();
  const divRef = React.useRef(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Login!");
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    // eval(inputs.email);
    try {
      const res = await AuthUser(inputs);
      console.log("Res  = ");
      console.log(res);
      {
        /* <script>console.log("YOU HAVE BEEN HACKED")</script> */
      }
      if (res.status === 200) {
        alert("Login Successfull!");
        // Keeping it in local storage spefically that i can exploit it later with XSS attack
        localStorage.setItem("JWT", res.accessToken);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", inputs.email);

        navigate("/home");
        window.location.href = "/";
      } else {
        console.log("inner html:");
        console.log(divRef.current.innerHTML);
        const fail_message = inputs.email;
        divRef.current.innerHTML = fail_message;
        alert(fail_message);
        localStorage.setItem("loggedIn", "false");
      }
    } catch (err) {
      console.log("handle login error " + err.message);
    }
  };

  async function ResetPass(email: string): Promise<number> {
    console.log("reset pass...");
    return;
    const authUserUrl = new URL("http://localhost:8000/resetpassword");
    authUserUrl.searchParams.append("email", email);
    try {
      const res = await fetch(authUserUrl, {
        method: "GET",
        mode: "cors",
      });
      if (res.status == 200) return 200;
      else return 404;
    } catch (err) {
      console.log("AuthUser Error  " + err.message);
      return 404;
    }
  }

  // <img src="1" onerror="alert('Gotcha!')" />
  const handlePasswordReset = async (event: any) => {
    event.preventDefault();
    console.log("password reset for " + inputs.email);
    const res = await ResetPass(inputs.email);
    if (res == 200) {
      alert("New password has been send to your email");
    } else {
      alert("No user found");
    }
  };

  const handleInputChange = (event: any) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="form_main" onSubmit={handleSubmit}>
      <div ref={divRef}></div>
      <div className="form_header">Please fill:</div>
      <label className="form_field">
        <input
          id="email"
          name="email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={inputs.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name="password"
          type="password"
          value={inputs.password}
          placeholder="Password"
          onChange={handleInputChange}
        />
      </label>
      <div>
        <button
          type="button"
          className="func-button"
          onClick={handlePasswordReset}
        >
          Reset my password
        </button>
        <button
          className="func-button"
          name="bttn"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
}
