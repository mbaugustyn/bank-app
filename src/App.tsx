import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TransferPage } from "./pages/TransferPage";
import { MessagePage } from "./pages/Message";
import { SignUpPage } from "./pages/SignUpPage";
import { LogInPage } from "./pages/LogInPage";
import { TransfersHist } from "./pages/TransfersHistoryPage";
import { TransferConfirm } from "./pages/TransferConfirm";
// import { userContext, userProvider } from './userContext';
import "./styles/App.css";

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default function App() {
  const loggedInUser = localStorage.getItem("loggedIn") == "true";
  console.log(loggedInUser);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="transferhistory"
            element={
              <ProtectedRoute loggedIn={loggedInUser}>
                <TransfersHist />
              </ProtectedRoute>
            }
          />
          <Route
            path="transfer"
            element={
              <ProtectedRoute loggedIn={loggedInUser}>
                <TransferPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="transfer/confirmtransfer"
            element={
              <ProtectedRoute loggedIn={loggedInUser}>
                <TransferConfirm />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
