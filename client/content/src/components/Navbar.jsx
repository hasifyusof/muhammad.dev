import React from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {

    const navigate = useNavigate();

    const handlelogout = async () =>{
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate("/");
    }

    return(
        <nav className="site-nav">
            <Link to="/" className="brand">Home</Link>
            <div className="nav-links">
                {user ?(
                    <button className="nav-button" onClick={handlelogout}>Logout</button>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
