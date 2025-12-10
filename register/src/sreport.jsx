import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./sreport.css";

function StudentDetails() {
  const [studentData, setStudentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const rollno = sessionStorage.getItem('rollno');
      if (!rollno) {
        // Redirect to login if there's no roll number in session storage
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/stulogin/${rollno}`);
        setStudentData(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error occurred:", error);
        setErrorMessage("An error occurred while fetching student data.");
        if (error.response) {
          // The request was made and the server responded with a status code outside the range of 2xx
          console.error('Response error:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Setup error:', error.message);
        }
      }
    };

    fetchStudentData();
  }, [navigate]); // Re-run the effect whenever the component is mounted or rollno in session changes

  if (studentData) {
    // Display the student data
    return (
        <div id='srep'>
        <nav id="repnavigation">
            <a href="/stuhome" style={{ fontSize: "20px" }}>Home</a>
        </nav>
        <div id="container">
            <h1 style={{marginTop:'50px',color:'black'}}>{studentData.name.toUpperCase()}</h1>
            
            <h2>Semester 1 Marks</h2>
            <table class='srepTable'>
                <thead>
                    <tr>
                        <th>SUBJECT</th>
                        <th>MARK</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MATHS</td>
                        <td>{studentData.sem1.mark1}</td>
                    </tr>
                    <tr>
                        <td>C PROGRAMMING</td>
                        <td>{studentData.sem1.mark2}</td>
                    </tr>
                    <tr>
                        <td>WEB TECHNOLOGIES</td>
                        <td>{studentData.sem1.mark3}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Semester 2 Marks</h2>
            <table class='srepTable'>
                <thead>
                    <tr>
                        <th>SUBJECT</th>
                        <th>MARK</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DATA STRUCTURES</td>
                        <td>{studentData.sem2.mark1}</td>
                    </tr>
                    <tr>
                        <td>OOPs</td>
                        <td>{studentData.sem2.mark2}</td>
                    </tr>
                    <tr>
                        <td>DATABASE SYSTEMS</td>
                        <td>{studentData.sem2.mark3}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Semester 3 Marks</h2>
            <table class='srepTable'>
                <thead>
                    <tr>
                        <th>SUBJECT</th>
                        <th>MARK</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SOFTWARE ENGINEERING</td>
                        <td>{studentData.sem3.mark1}</td>
                    </tr>
                    <tr>
                        <td>MOBILE APP DEVELOPMENT</td>
                        <td>{studentData.sem3.mark2}</td>
                    </tr>
                    <tr>
                        <td>CLOUD COMPUTING</td>
                        <td>{studentData.sem3.mark3}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Semester 4 Marks</h2>
            <table class='srepTable'>
                <thead>
                    <tr>
                        <th>SUBJECT</th>
                        <th>MARK</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>OPERATING SYSTEMS</td>
                        <td>{studentData.sem4.mark1}</td>
                    </tr>
                    <tr>
                        <td>C++ PROGRAMMING</td>
                        <td>{studentData.sem4.mark2}</td>
                    </tr>
                    <tr>
                        <td>PYTHON</td>
                        <td>{studentData.sem4.mark3}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
  }

  // Show error message if data fetching fails
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // Loading state
  return <div>Loading...</div>;
}

export default StudentDetails;
