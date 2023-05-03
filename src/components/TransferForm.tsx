import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const dataObj = {
    firstName: "Michal",
    surName: "Augustyn",
    accnr: "",
    amt: "",
    title: "",
    email: ""
};

export default function NameForm() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(dataObj);

    const handleInputChange = (event: any) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form onSubmit={() => console.log("XD")} className="form_main">
            <div className="form_header">
                Please fill:
            </div>
            <label className="form_field">
                <input name="firstName" type="text" placeholder="Firstname" value={inputs.firstName} onChange={handleInputChange} />
            </label>
            <label className="form_field">
                <input name="surName" type="text" value={inputs.surName} placeholder="Surname" onChange={handleInputChange} />
            </label>
            <label className="form_field">
                <input id="accnr_id" name="accnr"
                    pattern="[0-9]+"
                    type="text" value={inputs.accnr}
                    placeholder="Account number" onChange={handleInputChange} />
            </label>
            <label className="form_field">
                <input name="amt" type="number" min="0"
                    value={inputs.amt} placeholder="Amount"
                    onChange={handleInputChange} />
            </label>
            <label className="form_field">
                <input name="title" type="text" value={inputs.title} placeholder="Title" onChange={handleInputChange} />
            </label>
            <button id="bttn_id" name="bttn" type="button"
                value="button" onClick={() => navigate("./confirmtransfer", { state: inputs })} > Confirm </button>
        </form >
    );
}