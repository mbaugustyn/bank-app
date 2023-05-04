import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserTransfers } from "../util/DBQueries"

function CreateList({ list }: { list: any }) {
    return (
        <ul className="list"> Historia przelewow:
            {list.map((item: { ID: string, Name: string, SenderID: number, SurName: string, Title: string, AccountNr: number, Amount: number }) => (
                <li> {item.Name} {item.SurName} {item.AccountNr} {item.Title} {item.Amount} </li>
            ))}
        </ul>
    );
}

export function TransfersHist() {
    let navigate = useNavigate();
    const email: string = localStorage.getItem("email");

    const [transfers, setTransfers] = useState([]);
    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const response = await getUserTransfers(email);
                console.log(response)
                setTransfers(response.recordset)

            }
            catch (err) { //  Error handling do poprawy
                console.log("Error fetching " + err.message);
            }
        }
        fetchTransfers();
    }, [])
    // The second argument can be used to define all the variables (allocated in this array) 
    // on which the hook depends. If one of the variables changes, the hook runs again. 
    // If the array with the variables is empty, the hook doesn't run when updating the component at all, because it doesn't have to watch any variables.
    return (
        <div>
            <div >
                <button onClick={() => navigate('/home')}>Home </button>
            </div>
            <div>
                <CreateList list={transfers}></CreateList>
            </div>
        </div >
    )
}