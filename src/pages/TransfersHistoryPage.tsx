import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransferInfo, getUserTransfers } from "../util/DBQueries"


// const CreateList = ({ list, handleDone, handleDelete }: { list: any, handleDone: any, handleDelete: any }) => (
//     <div className="list">
//       {list.map((item: { id: string, name: string, done: boolean }) => (
//         <Task id={item.id} name={item.name} isDone={item.done} onDone={handleDone} onDelete={handleDelete} key={item.id} ></Task>
//       ))}
//     </div>
//   );
// const Task = ({ id, name, isDone, onDone, onDelete }: {
//     id: string, name: string,
//     isDone: boolean, onDone: any, onDelete: any
//   }) => {
//     const classes = `item item${isDone}`
//     return (
//       <div className={classes}>
//         <p className="item__name"> {name} </p>
//         <button className="button item__btn-done" type="submit" onClick={() => onDone(id, isDone)}> {isDone ? "Undone" : "Done"} </button>
//         <button className="button item__btn-remove" type="submit" onClick={() => onDelete(id, isDone)}> Remove </button>
//       </div>
//     )
//   }


const TransferItem = ({ item }: { item: TransferInfo }) => {
    return (
        <ul className={"transfer"}>
            <li> Title </li>
            <li> {item.Title} </li>
            <li> Recipient </li>
            <li> {item.Name} {item.Surname} </li>
            <li> Account number </li>
            <li> {item.AccountNr} </li>
            <li> Date </li>
            <li> 2020-10-02 </li>
        </ul>
    )
}

function TransferList({ list }: { list: TransferInfo[] }) {
    console.log("LISTA")
    console.log(list)
    return (
        <div className="list"> Historia przelewow:
            {list.map((item: TransferInfo) => (
                <TransferItem item={item}></TransferItem>
            ))}
        </div>
    );
}



export function TransfersHist() {
    let navigate = useNavigate();
    const email: string = localStorage.getItem("email");

    const [transfers, setTransfers] = useState<TransferInfo[]>();
    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                console.log("Requesting transfer hist for " + email);
                const response: TransferInfo[] = await getUserTransfers(email);
                console.log("getUserTransfers response = ")
                console.log(response)
                setTransfers(response)
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
    if (transfers) {
        return (
            <div>
                <div >
                    <button onClick={() => navigate('/home')}>Home </button>
                </div>
                <div>
                    <TransferList list={transfers}></TransferList>
                </div>
            </div >
        )
    }
    else {
        return (
            <div>
                <div >
                    <button onClick={() => navigate('/home')}>Home </button>
                </div>
                <div>
                    No transfers
                </div>
            </div >
        )
    }
}