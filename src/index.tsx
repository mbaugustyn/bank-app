import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
// 476364745866-q5i324hf0li5ub413skaq5rg2it24sn9.apps.googleusercontent.com
root.render(
  <GoogleOAuthProvider clientId="476364745866-q5i324hf0li5ub413skaq5rg2it24sn9.apps.googleusercontent.com">
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
