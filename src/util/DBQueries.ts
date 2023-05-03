
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
    firstName: string,
    surName: string,
    accnr: string,
    amt: string,
    title: string,
    email: string
};




async function AddUser(inputs: SignUpInt): Promise<SignUpResponse> {
    const authUserUrl = new URL("http://localhost:8000/createuser");
    authUserUrl.searchParams.append("firstname", (inputs.firstName));
    authUserUrl.searchParams.append("lastname", (inputs.firstName));
    authUserUrl.searchParams.append("email", (inputs.email));
    authUserUrl.searchParams.append("password", (inputs.password1));
    const response = await fetch(authUserUrl, {
        method: 'GET',
        mode: 'cors',
    });
    const Resp: SignUpResponse = await response.json();
    return Resp;
}

async function AuthUser(inputs: Login): Promise<LoginResponse> {
    const authUserUrl = new URL("http://localhost:8000/authuser");
    authUserUrl.searchParams.append("email", (inputs.email));
    authUserUrl.searchParams.append("password", (inputs.password));
    const response = await fetch(authUserUrl, {
        method: 'GET',
        mode: 'cors',
    });
    const Resp: LoginResponse = await response.json();
    return Resp;
}

async function getUserPassword(inputs: Login): Promise<getPassResponse> {
    const authUserUrl = new URL("http://localhost:8000/userpass");
    authUserUrl.searchParams.append("email", (inputs.email));
    const response = await fetch(authUserUrl, {
        method: 'GET',
        mode: 'cors',
    });
    const Resp: getPassResponse = await response.json();
    return Resp;
}

export { TransferInfo, AddUser, SignUpInt, SignUpResponse, Login, AuthUser, getUserPassword };
