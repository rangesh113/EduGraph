import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './home.css';

function Login() {
    const [teachid, setTeachid] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Added state to handle error message
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message on new submit attempt

        axios.post('http://localhost:3001/techlogin', { teachid, password })
            .then(result => {
                const res = result.data;
                const name = res.name ? res.name.toUpperCase() : '';
                if (res.message === "success") {
                    sessionStorage.setItem('tname', name);
                    navigate('/teachhome');
                } else {
                    // Set error message depending on the backend response
                    setErrorMessage(res.message || "Username or password is incorrect");
                }
            })
            .catch(err => {
                // Handle error if axios request fails (e.g., network issues)
                console.log("Error occurred:", err);
                setErrorMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div className="home-body">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <nav id='navigation'>
                    <a href="/">Home</a>
                </nav>
                
                <div className="container d-flex justify-content-center align-items-center vh-100" id='login'>
                    <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: "400px" ,fontSize:"10px"}}>
                        <h2 style={{fontSize:"20px"}}>Teacher Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="teachid">
                                    <strong>Teacher Id</strong>
                                </label>
                                <input 
                                    type="text"
                                    required
                                    placeholder="Enter the Teacher ID"
                                    autoComplete="off"
                                    name="teachid"
                                    className="form-control rounded-0"
                                    style={{fontSize:"15px"}}
                                    onChange={(e) => setTeachid(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">
                                    <strong>Password</strong>
                                </label>
                                <input 
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    name="password"
                                    className="form-control rounded-0"
                                    style={{fontSize:"15px"}}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* Display the error message if there's an issue */}
                                {errorMessage && <span id="error" style={{ color: "red", fontSize: "14px" }}>{errorMessage}</span>}
                            </div>
                            <button type="submit" className="btn btn-success w-100 rounded-0">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
