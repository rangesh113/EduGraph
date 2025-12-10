import React, { useState, useEffect } from "react";
import "./entryMark.css";

const Report = () => {
  const [semester, setSemester] = useState("sem1"); // Default semester is 'sem1'
  const [students, setStudents] = useState([]); // All students for the semester
  const [rollno, setRollno] = useState(""); // Roll number input for filtering
  const [filteredStudent, setFilteredStudent] = useState(null); // Store the filtered student data

  // Define the subject names for each semester
  const subjects = {
    sem1: ["Maths", "C Programming", "Web Technologies"],
    sem2: ["Data Structures", "OOPs", "Database Systems"],
    sem3: ["Software Engineering", "Mobile App Development", "Cloud Computing"],
    sem4: ["Operating Systems", "C++ Programming", "Python"],
  };

  // Function to handle semester change
  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setRollno(""); // Reset roll number filter when semester changes
    setFilteredStudent(null); // Clear filtered student data
  };

  // Fetch all students for the selected semester
  useEffect(() => {
    fetch(`http://localhost:3001/studentmarks/${semester}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        return response.json();
      })
      .then((data) => {
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

  // Filter a specific student based on roll number
  useEffect(() => {
    if (rollno.trim() === "") {
      setFilteredStudent(null); // Clear filtered student if rollno is empty
      return;
    }

    const student = students.find((s) => s.rollno === rollno);
    setFilteredStudent(student || null); // Set the matched student or null
  }, [rollno, students]);

  // Function to calculate CGPA and grade
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

  return (
    <div className="semester-container">
      <nav id="navigation">
        <a href="/teachhome" style={{ fontSize: "15px" }}>Home</a>
      </nav>
      <div style={{ marginTop: "30px" }}>
        <h1 style={{ fontSize: "30px", color: "white" }}>STUDENT REPORT</h1>
        <div>
          <button onClick={() => handleSemesterChange("sem1")}>Sem 1</button>
          <button onClick={() => handleSemesterChange("sem2")}>Sem 2</button>
          <button onClick={() => handleSemesterChange("sem3")}>Sem 3</button>
          <button onClick={() => handleSemesterChange("sem4")}>Sem 4</button>
        </div>

        <h2 style={{ fontSize: "25px" }}>{semester.toUpperCase()} Marks Table</h2>
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
            {students.map((student) => (
              <tr key={student.rollno}>
                <td>{student.rollno}</td>
                <td>{student.name}</td>
                {subjects[semester].map((subject, idx) => (
                  <td key={idx}>{student[semester]?.[`mark${idx + 1}`]}</td>
                ))}
                <td>{student[semester]?.cgpa}</td>
                <td>{student[semester]?.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
