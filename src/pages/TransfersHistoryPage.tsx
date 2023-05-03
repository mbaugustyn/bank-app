import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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

    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        const fetchTransfers = async () => {
            const response = await fetch('http://localhost:8000/transferhistory', {
                method: 'GET',
            })
            const data = await response.json();
            if (response.ok) {

                setTransfers(data.recordset)
            }
            else { //  Error handling do poprawy
                console.log("Error fetching");
                throw response
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