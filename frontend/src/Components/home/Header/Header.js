import './Header.css'
import {useNavigate} from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    return (
        <div className={"header p-2"}>
            <div className="d-flex gap-2">
                <button className={"btn btn-primary"} onClick={()=>navigate("/login")}>Login</button>
                <button className={"btn btn-dark"}>Register</button>
            </div>
        </div>
    );
}

export default Header;