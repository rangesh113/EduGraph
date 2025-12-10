import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';

function Login() {
    const [rollno, setRollno] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for the error message
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset the error message before each attempt
        setErrorMessage('');

        axios.post('http://localhost:3001/stulogin', { rollno, password })
            .then(result => {
                console.log(result.data);
                const res = result.data;
                const message = res.message;
                const name = res.name ? res.name.toUpperCase() : '';  
                console.log("Name:", name);
                console.log("Message:", message);

                if (message === "success") {
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('rollno', rollno);
                    navigate('/stuhome');
                } else {
                    // Update the state for the error message
                    setErrorMessage(message || "Username or Password is invalid");
                }
            })
            .catch(err => {
                // Handle unexpected errors or server errors
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
                        <h2 style={{fontSize:"20px"}}>Student Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="rollno">
                                    <strong>RollNo</strong>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the Roll no"
                                    autoComplete="off"
                                    name="rollno"
                                    className="form-control rounded-0"
                                    style={{fontSize:"15px"}}
                                    onChange={(e) => setRollno(e.target.value)}
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
                            </div>

                            {/* Display the error message */}
                            {errorMessage && <span id="error" style={{ color: "red", fontSize: '14px' }}>{errorMessage}</span>}

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
