import React, { useState, useEffect } from 'react';
import './entryMark.css';

const StudentMarksSheet = () => {
  const [semester, setSemester] = useState('sem1'); // Default semester is 'sem1'
  const [students, setStudents] = useState([]);

  const handleSave = () => {
    const obj = {
        semester: semester,
        students: students
    }
    console.log({ obj })
    // Send the updated student data to the backend
    fetch('http://localhost:3001/studentmarks/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ obj }), // Send the entire students array
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved successfully:', data);
        alert('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data.');
      });
  };

  // Define the subject names for each semester
  const subjects = {
    sem1: ['Maths', 'C Programming', 'Web Technologies'],
    sem2: ['Data Structures', 'OOPs', 'DataBase Systems'],
    sem3: ['Software Engineering', 'Mobile App Development', 'Cloud Computing'],
    sem4: ['Operating Systems', 'C++ Programming4', 'Python'],
  };

  // Function to change semester
  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
  };

  // Fetch student data whenever the semester changes
  useEffect(() => {
    fetch(`http://localhost:3001/studentmarks/${semester}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.data) {
          const updatedStudents = data.data.map((student) => {
            const marks = [
              student[semester]?.mark1,
              student[semester]?.mark2,
              student[semester]?.mark3,
            ];
            const { cgpa, grade } = calculateCGPAandGrade(marks);
            return {
              ...student,
              [semester]: {
                ...student[semester],
                cgpa,
                grade,
              },
            };
          });
          setStudents(updatedStudents);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [semester]);

  const calculateCGPAandGrade = (marks) => {
    const validMarks = marks.filter((mark) => mark !== "").map((mark) => parseFloat(mark));
    if (validMarks.length === 0) return { cgpa: "N/A", grade: "N/A" };

    const avg = validMarks.reduce((sum, mark) => sum + mark, 0) / validMarks.length;
    const cgpa = (avg / 10).toFixed(2);
    let grade = "F";
    if (cgpa >= 9) grade = "O";
    else if (cgpa >= 8) grade = "A";
    else if (cgpa >= 7) grade = "B";
    else if (cgpa >= 6) grade = "C";

    return { cgpa, grade };
  };

  const handleInputChange = (index, markField, value) => {
    const updatedStudents = [...students];
    
    // Update the field directly, without immediate validation
    updatedStudents[index][semester][markField] = value;
  
    // Check if all marks are valid numbers for CGPA calculation
    const marks = [
      updatedStudents[index][semester].mark1,
      updatedStudents[index][semester].mark2,
      updatedStudents[index][semester].mark3,
    ].map((mark) => (isNaN(parseFloat(mark)) ? 0 : parseFloat(mark)));
  
    const { cgpa, grade } = calculateCGPAandGrade(marks);
  
    // Update CGPA and grade only if marks are valid
    updatedStudents[index][semester].cgpa = cgpa;
    updatedStudents[index][semester].grade = grade;
  
    setStudents(updatedStudents);
  };
  

  return (
  <div className="semester-container">
    <nav id='navigation'>
      <a href="/teachhome" style={{fontSize:'15px'}}>Home</a>
    </nav>
    <div style={{marginTop:'30px'}}>
      <h1 style={{fontSize:'30px', color:'white'}}>SELECT THE SEMESTER MARK</h1>
    <div>
    <button onClick={() => handleSemesterChange("sem1")}>Sem 1</button>
    <button onClick={() => handleSemesterChange("sem2")}>Sem 2</button>
    <button onClick={() => handleSemesterChange("sem3")}>Sem 3</button>
    <button onClick={() => handleSemesterChange("sem4")}>Sem 4</button>
  </div>

  <h2 style={{fontSize:'25px'}}>{semester.toUpperCase()} Marks Table</h2>
  <table className="semester-table">
    <thead>
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        {subjects[semester].map((subject, index) => (
          <th key={index}>{subject}</th>
        ))}
        <th>CGPA</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student, index) => (
        <tr key={student.rollno}>
          <td>{student.rollno}</td>
          <td>{student.name}</td>
          {subjects[semester].map((subject, idx) => (
            <td key={idx}>
              <input
                type="text"
                value={student[semester]?.[`mark${idx + 1}`] || ""}
                onChange={(e) =>
                  handleInputChange(index, `mark${idx + 1}`, e.target.value)
                }
              />
            </td>
          ))}
          <td>{student[semester]?.cgpa}</td>
          <td>{student[semester]?.grade}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <button className="save-button" onClick={handleSave}>Save</button>
  </div>
</div>

  );
};

export default StudentMarksSheet;
