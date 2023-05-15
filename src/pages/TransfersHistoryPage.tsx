import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransferInfo, getUserTransfers } from "../util/DBQueries";
import { Header } from "../components/Header";

const TransferItem = ({ item }: { item: TransferInfo }) => {
  return (
    <li className={"Transfer"}>
      <div className="info-wrapper">
        <div className="list-header"> Title </div>
        <div className="list-input"> {item.Title} </div>
      </div>
      <div className="info-wrapper">
        <div className="list-header"> Recipient </div>
        <div className="list-input">
          {" "}
          {item.Name} {item.Surname}{" "}
        </div>
      </div>
      <div className="info-wrapper">
        <div className="list-header"> Account number </div>
        <div className="list-input"> {item.AccountNr} </div>
      </div>
      <div className="info-wrapper">
        <div className="list-header"> Date </div>
        <div className="list-input"> 2020-10-02 </div>
      </div>
    </li>
  );
};

function TransferList({ list }: { list: TransferInfo[] }) {
  return (
    <ul className="TransferHistoryContainer">
      Historia przelewow:
      {list.map((item: TransferInfo) => (
        <TransferItem item={item} key={item.ID}></TransferItem>
      ))}
    </ul>
  );
}

export function TransfersHist() {
  let navigate = useNavigate();

  const email: string = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState<TransferInfo[]>();
  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true);
      const response: TransferInfo[] = await getUserTransfers(email);
      setTransfers(response);
      setLoading(false);
    };
    fetchTransfers();
  }, []);

  console.log("loading = " + loading);
  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Transfer History"} />
        <div className="login-container">
          <button className="util-button" onClick={() => navigate("/home")}>
            Home
          </button>
        </div>
      </div>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div>
          {transfers ? (
            <TransferList list={transfers}></TransferList>
          ) : (
            <div>No transfers</div>
          )}
        </div>
      )}
    </div>
  );
}
