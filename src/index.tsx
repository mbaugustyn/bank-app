import React from "react";
import ReactDOM from 'react-dom/client';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
import App from './App';

root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
);