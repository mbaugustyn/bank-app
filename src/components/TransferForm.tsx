import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TransferInfo } from "../util/DBQueries";

const Transfer: TransferInfo = {
  Name: "",
  Surname: "",
  AccountNr: "",
  Amount: "",
  Title: "Transfer of money",
  DateSent: "10-10-2010",
  ID: -1,
  SenderID: -1,
  email: "blank",
};

export default function NameForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(Transfer);

  const handleInputChange = (event: any) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="form_main">
      <div className="form_header">Please fill:</div>
      <label className="form_field">
        <input
          name="Name"
          type="text"
          placeholder="First name"
          value={inputs.Name}
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name={"Surname"}
          type="text"
          value={inputs.Surname}
          placeholder="Surname"
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          id="accnr_id"
          name="AccountNr"
          pattern="[0-9]+"
          type="text"
          value={inputs.AccountNr}
          placeholder="Account number"
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name="Amount"
          type="number"
          min="0"
          value={inputs.Amount}
          placeholder="Amount"
          onChange={handleInputChange}
        />
      </label>
      <label className="form_field">
        <input
          name="Title"
          type="text"
          value={inputs.Title}
          placeholder="Title"
          onChange={handleInputChange}
        />
      </label>
      <button
        className="func-button"
        name="bttn"
        type="button"
        value="button"
        onClick={() => {navigate("./confirmtransfer", { state: inputs }); window.location.reload()}}
      >
        {" "}
        Confirm{" "}
      </button>
    </form>
  );
}
