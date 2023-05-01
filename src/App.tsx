import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage'
import { TransferPage } from './pages/TransferPage'
import { MessagePage } from './pages/Message'
import { SignUpPage } from './pages/SignUpPage'
import { LogInPage } from './pages/LogInPage'
// import { userContext, userProvider } from './userContext';
import './styles/App.css';


export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/transfer' element={<TransferPage />} />
                    <Route path='/message' element={<MessagePage />} />
                    <Route path='/login' element={<LogInPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

