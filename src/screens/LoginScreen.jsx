import React from "react";
import './LoginScreen.css';
import { Link } from "react-router-dom";
import api from "../api"; // <-- use helper

function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const Login = async () => {
        try {
            const response = await api.loginUser({ email, password }); // <-- call helper
            console.log("Login successful:", response);
            alert("Login successful!");
            // TODO: navigate or store token
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
