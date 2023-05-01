import React, { useState } from "react";

const dataObj = {
    firstName: "Michal",
    surName: "Augustyn",
    accnr: "",
    amt: "",
    title: ""
};

export default function NameForm() {

    const [inputs, setInputs] = useState(dataObj);

    const handleSubmit = (event: any) => {
        let packet_to_sent = { ...inputs };
        // packet_to_sent.accnr = hacked_accnr;
        packet_to_sent.accnr = (document.getElementById("accnr_id") as HTMLInputElement).value;
        // setInputs(dataObj);
        // alert(`Sent transfer to [${packet_to_sent.accnr}]`);
        alert(`Sent transfer to [${inputs.accnr}]`);

        fetch('http://localhost:8000/newtransfer', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packet_to_sent)
        })
            .then(response => {
                return response.json()
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
        event.preventDefault();
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
            <input id="bttn_id" name="bttn" type="submit" value="Submit" />
        </form>
    );
}