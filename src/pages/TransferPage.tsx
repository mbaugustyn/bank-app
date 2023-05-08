import TransferForm from "../components/TransferForm";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";

export function TransferPage() {
  let navigate = useNavigate();
  return (
    <div className="main">
      <div className="Header-container">
        <Header text={"Send transfer"}></Header>
        <div className="login-container">
          <button className="util-button" onClick={() => navigate("/home")}>
            Home
          </button>
        </div>
      </div>
      <TransferForm />
    </div>
  );
}
