import React, { useState } from "react";
import {
  AddUser,
  SignUpInt,
  SignUpResponse,
  AuthUser,
} from "../util/DBQueries";

export default function SignUpForm() {
  const Obj: SignUpInt = {
    firstName: "",
    surName: "",
    email: "",
    password1: "",
    password2: "",
  };
  const [inputs, setInputs] = useState(Obj);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Signup!");
  };

  const verifyPass = (pass1: String, pass2: String): boolean => {
    if (pass1 !== pass2) {
      alert("Passwords do no match");
      return false;
    }
    if (pass1.length < 5) {
      alert("Password is too weak");
      return false;
    }
    return true;
  };

  const verifyData = (inputs: SignUpInt): boolean => {
    if (verifyPass(inputs.password1, inputs.password2) == false) return false;
    if (!inputs.firstName || !inputs.surName || !inputs.email) {
      alert("Fields cannot be empty");
      return false;
    }
    return true;
  };

  const handleInputChange = (event: any) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    if (verifyData(inputs) == false) return;
    try {
      const res = await AddUser(inputs);
      if (res.status == 200) alert("Signed up succesffully!");
      else alert("Signed up failed!");
    } catch (err) {
      console.log("handleSignUp " + err.message);
    }
  };

  return (
    <form className="form_main">
      <div className="form_header">Please fill:</div>
      <label className="form_field">
        <input
          name="firstName"
          type="text"
          placeholder="Firstname"
          value={inputs.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name="surName"
          type="text"
          value={inputs.surName}
          placeholder="Surname"
          onChange={handleInputChange}
        />
      </label>
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
          name="password1"
          type="password"
          value={inputs.password1}
          placeholder="Password"
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name="password2"
          type="password"
          value={inputs.password2}
          placeholder="Repeat password"
          onChange={handleInputChange}
        />
      </label>

      <button
        id="bttn_id"
        className="bttn-submit"
        name="bttn"
        type="button"
        onClick={handleSignUp}
      >
        Sign up
      </button>
      <input className="bttn-reset" name="bttn" type="reset" value="Reset" />
    </form>
  );
}
