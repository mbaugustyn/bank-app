import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MessageResponse {
    message: string;
}

export function MessagePage() {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    async function fetchMessage() {
        const response = await fetch('http://localhost:8000/message', {
            method: 'GET',
            mode: 'cors',
        })
        var mess: MessageResponse = await response.json();
        setMessage(mess.message);
    }

    useEffect(() => {
        fetchMessage();
    })
    return (
        <div>
            <button onClick={() => navigate('/home')}>Home </button>
            {message}
        </div >
    )
}