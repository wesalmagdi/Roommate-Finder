import React from "react";
import './RegisterScreen.css'; 
import { Link } from "react-router-dom";
import api from "../api";

function RegisterScreen() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [university, setUniversity] = React.useState("");
    const [errors, setErrors] = React.useState({});

    function validate() {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email || email.trim() === "") {
            newErrors.email = "Email is required";
        } else {
            const re = /^\S+@\S+\.\S+$/;
            if (!re.test(email)) newErrors.email = "Enter a valid email address";
        }
        if (!password) newErrors.password = "Password is required";
        if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!gender) newErrors.gender = "Please select a gender";
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Match backend expectations for gender
            const genderBackend = gender.toLowerCase();
            const user = { name, email, password, gender: genderBackend, university };
            try {
                const response = await api.registerUser(user);
                console.log("Registration successful:", response);
                alert("User registered successfully!");
            } catch (err) {
                console.error("Registration failed:", err);
                alert(`Registration failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert--warning" role="alert">
                        <small>
                            {Object.values(errors).map((msg, idx) => (
                                <span key={idx} className="alert-item">{msg}{idx < Object.values(errors).length - 1 ? ' · ' : ''}</span>
                            ))}
                        </small>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        name="university"
                        className="form-control"
                        placeholder="University (optional)"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />

                    <div className="radio-group" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            /> Female
                        </label>
                    </div>

                    <button className="register-btn" type="submit">
                        Register
                    </button>
                </form>

                <p className="register-text">Have an account? <Link to="/login">Login here.</Link></p>
            </div>
        </div>
    );
}

export default RegisterScreen;
