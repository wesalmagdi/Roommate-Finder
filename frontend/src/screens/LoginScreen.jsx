import React from "react";
import './LoginScreen.css';
import { Link } from "react-router-dom";
import api from "../api"; // <-- use helper
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const Login = async () => {
        try {
            const response = await api.loginUser({ email, password });// <-- call helper
            localStorage.setItem("user", JSON.stringify(response.user));

             login({
                
                ...response.user,
                token: response.token
            });

            console.log("Login successful:", response);
            
            

            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={Login}>
                    Login
                </button>

               <p className="register-text">Don't have an account? <Link to="/register">Register here.</Link></p>
            </div>
        </div>
    );
}

export default LoginScreen;
