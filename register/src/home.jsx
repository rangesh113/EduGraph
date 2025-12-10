import React from "react";
import { Link } from "react-router-dom";
import './home.css';

const Home = () => {
    return (
        <div className="home-body">
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to EduGraph</h1>
                <p>Your personalized education management system</p>
            </header>

            <div className="home-buttons">
                <Link to="/stulogin" className="home-btn">
                    Student Login
                </Link>
                <Link to="/techlogin" className="home-btn">
                    Teacher Login
                </Link>
            </div>

            <section className="about-section">
                <h2>About EduGraph</h2>
                <p>
                    EduGraph is a comprehensive education management platform designed to bridge the gap between students and teachers. Whether you're a student tracking your academic performance or a teacher managing student marks, EduGraph has all the tools you need.
                </p>
            </section>

            <section className="contact-section">
                <h2>Contact Us</h2>
                <p>Have questions or need support? We're here to help!</p>
                <p>Email: support@edugraph.com</p>

            </section>

            <footer nkjn>
                <p style={{color:'black', fontSize:'15px', marginTop:'10px'}}>&copy; 2024 PSGTech. All rights reserved.</p>
            </footer>
        </div>
        </div>
    );
};

export default Home;
