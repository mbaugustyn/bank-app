import fs from "fs";
import https from "https";

interface SignUpResponse {
    status: number,
    message: string,
    id: number
};

interface Login {
    email: string,
    password: string,
};

interface LoginResponse {
    status: number,
    message: string,
    id: number
};

interface getPassResponse {
    status: number,
    message: string,
    password: string
};

interface SignUpInt {
    firstName: string,
    surName: string,
    email: string,
    password1: string,
    password2: string,
};

interface TransferInfo {
    ID: number,
    SenderID: number,
    Name: string,
    Surname: string,
    AccountNr: number | string,
    Amount: number | string,
    Title: string,
    DateSent: Date | string
    email: string
};


async function AddUser(inputs: SignUpInt): Promise<any> {
    console.log("inputs");
    console.log(inputs);
    const res = await fetch('http://localhost:8000/createuser', {
        method: 'POST',
        mode: 'cors',
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
    });
    
    console.log("Res");
    console.log(res);
    return res;

}

async function AuthUser(inputs: Login): Promise<any> {

    const res = await fetch('http://localhost:8000/authuser', {
            method: 'POST',
            mode: 'cors',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        });
        const Resp: LoginResponse = await res.json();
        return Resp;
}

async function getUserPassword(inputs: Login): Promise<getPassResponse> {
    return await (
        await fetch('http://localhost:8000/userpass', {
            method: 'POST',
            mode: 'cors',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs.email)
        })).json();
}

async function getUserTransfers(email: string): Promise<any> {
    const authUserUrl = new URL("http://localhost:8000/transferhistory");
    authUserUrl.searchParams.append("email", (email));
    const response = await fetch(authUserUrl, {
        method: 'GET',
        mode: 'cors',
    });
    const Resp: getPassResponse = await response.json();
    return Resp;
}

export { getUserTransfers, TransferInfo, AddUser, SignUpInt, SignUpResponse, Login, AuthUser, getUserPassword };
