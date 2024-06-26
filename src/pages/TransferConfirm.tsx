import TransferForm from "../components/TransferForm";
import { UNSAFE_LocationContext, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
// import { useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TransferInfo } from "../util/DBQueries";
import React from "react";

export function TransferConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const Transfer: TransferInfo = location.state;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const email = localStorage.getItem("email");
    Transfer.email = email;

    fetch("http://localhost:8000/newtransfer", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Transfer),
    })
      .then((response) => {
        if (response.status == 200) {
          alert("Transfer sent!");
          navigate("/transferhistory");
        } else {
          alert("Transfer failed!");
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <div className="main">
      <Header text="Please confirm below info"></Header>
      <ul>
        <li> First Name = {Transfer.Name} </li>
        <li> Last Name = {Transfer.Surname} </li>
        <li id="accnr_id"> Account number = {Transfer.AccountNr} </li>
        <li> Amount = {Transfer.Amount} </li>
        <li> Title = {Transfer.Title} </li>
      </ul>
      <button
        id="bttn_id"
        name="bttn"
        type="button"
        value="button"
        onClick={() => navigate(-1)}
      >
        {" "}
        Go back{" "}
      </button>
      <button
        id="confirm_id"
        name="bttn"
        type="button"
        value="button"
        onClick={handleSubmit}
      >
        {" "}
        Confirm{" "}
      </button>
    </div>
  );
}

// {isShow ? <Welcome text={greeting} /> : null}
