import TransferForm from '../components/TransferForm'
import { UNSAFE_LocationContext, useNavigate } from "react-router-dom";
import { Header } from '../components/Header'
import { useOutletContext } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { TransferInfo } from "../util/DBQueries"

export function TransferConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const TransferInfo: TransferInfo = location.state;

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const email = localStorage.getItem("email");
        TransferInfo.email = email;

        // packet_to_sent.accnr = hacked_accnr;
        // packet_to_sent.accnr = (document.getElementById("accnr_id") as HTMLInputElement).value;
        // setInputs(dataObj);
        // alert(`Sent transfer to [${packet_to_sent.accnr}]`);
        // alert(`Sent transfer to [${inputs.accnr}]`);

        fetch('http://localhost:8000/newtransfer', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TransferInfo)
        })
            .then(response => {
                return response.json()
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }

    return (
        <div className="main">
            <Header text='Please confirm below info'></Header>
            <ul>
                <li> First Name = {TransferInfo.firstName}  </li>
                <li> Last Name = {TransferInfo.surName}  </li>
                <li> Account number  = {TransferInfo.accnr}  </li>
                <li> Amount = {TransferInfo.amt}  </li>
                <li> Title = {TransferInfo.title}  </li>
            </ul>
            <button id="bttn_id" name="bttn" type="button"
                value="button" onClick={() => navigate(-1)} > Go back </button>
            <button id="bttn_id" name="bttn" type="button"
                value="button" onClick={handleSubmit} > Confirm </button>

        </div>
    )
}

// {isShow ? <Welcome text={greeting} /> : null}