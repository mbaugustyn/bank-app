import React, { useState } from "react";

interface SignUpInt {
    firstName: string,
    surName: string,
    email: string,
    password1: string,
    password2: string,
};

export default function SignUpForm() {
    const Obj: SignUpInt = { firstName: "", surName: "", email: "", password1: "", password2: "" };
    const [inputs, setInputs] = useState(Obj);

    const correctData = (): boolean => {
        return inputs.password1 === inputs.password2;
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        let packet_to_sent = { ...inputs };

        if (correctData()) {
            console.log("OK");
        }
        else {
            console.log("NIE OK");
        }
        // fetch('http://localhost:8000/newuser', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(packet_to_sent)
        // })
        //     .then(response => {
        //         return response.json()
        //     })
        //     .catch((error) => {
        //         console.log('error: ' + error);
        //     });
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
                <input id="email" name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={inputs.email} placeholder="Email" onChange={handleInputChange}
                />
            </label>
            <label className="form_field">
                <input name="password1" type="password" value={inputs.password1} placeholder="Password" onChange={handleInputChange} />
            </label>
            <label className="form_field">
                <input name="password2" type="password" value={inputs.password2} placeholder="Repeat password" onChange={handleInputChange} />
            </label>
            <input id="bttn_id" className="bttn-submit" name="bttn" type="submit" value="Submit" />
            <input className="bttn-reset" name="bttn" type="reset" value="Reset" />

        </form>
    );
}