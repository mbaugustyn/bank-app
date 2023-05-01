import TransferForm from '../components/TransferForm'
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header'

export function TransferPage() {
    let navigate = useNavigate();
    return (
        <div className="main">
            <button onClick={() => navigate('/home')}>Home </button>
            <Header text={"Send Transfer"}></Header>
            <TransferForm />
        </div>
    )
}