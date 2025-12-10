const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const StudentModel = require('./model/student')
const TeacherModel = require("./model/teacher")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
uri = process.env.Mongodb_string

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.post("/stulogin",(req,res) => {
    const{rollno,password} = req.body;
    StudentModel.findOne({rollno: rollno})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json({message:"success",
                    name:user.name,
                })

            } else {
                
                res.json({message:"the password is incorrect"});
            }
        }else {
            res.json({message:"No record existed"});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:"An error occurred"});
    })
})

app.post("/techlogin",(req,res) => {
    const{teachid,password} = req.body;
    
    TeacherModel.findOne({teachid: teachid})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json({message:"success",
                    name:user.name,
                })

            } else {
                
                res.json("the password is incorrect");
            }
        }else {
            res.json("No record existed")
        }
    })
})

app.post('/studentmarks/save', async (req, res) => {
  try {
    const { students, semester } = req.body.obj;

    for (let studentData of students) {
      try {
        console.log("Processing student:", studentData.rollno);

        // Validate semester data exists
        if (!studentData[semester]) {
          console.error(`Semester data not found for student ${studentData.rollno}`);
          continue;
        }

        const result = await StudentModel.updateOne(
          { rollno: studentData.rollno },
          { 
            $set: { 
              [`${semester}.mark1`]: studentData[semester].mark1,
              [`${semester}.mark2`]: studentData[semester].mark2,
              [`${semester}.mark3`]: studentData[semester].mark3
            }
          },
          { upsert: true } // Insert if not exists
        );

        if (result.matchedCount === 0) {
          console.log(`Document inserted for new student: ${studentData.rollno}`);
        } else {
          console.log(`Document updated for student: ${studentData.rollno}`);
        }
      } catch (err) {
        console.error(`Error processing student ${studentData.rollno}:`, err);
      }
    }

    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving student data:', error);
    res.status(500).json({ message: 'Error saving student data.' });
  }
});


app.get("/studentdata", async (req, res) => {
  try {
    const data = await StudentModel.find({}, {
      rollno: 1,
      password: 1,
      name: 1,
      "sem1.mark1": 1,
      "sem1.mark2": 1,
      "sem1.mark3": 1,
      "sem2.mark1": 1,
      "sem2.mark2": 1,
      "sem2.mark3": 1,
      "sem3.mark1": 1,
      "sem3.mark2": 1,
      "sem3.mark3": 1,
      "sem4.mark1": 1,
      "sem4.mark2": 1,
      "sem4.mark3": 1,
      _id: 0
    });

    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No student data found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching student data",
    });
  }
});

app.get("/studentmarks/:semester", async (req, res) => {
  const { semester } = req.params;

  // Validate semester parameter
  const validSemesters = ["sem1", "sem2", "sem3", "sem4"];
  if (!validSemesters.includes(semester)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid semester. Valid options are: sem1, sem2, sem3, sem4.",
    });
  }

  try {
    // Build dynamic projection for the selected semester
    const projection = {
      rollno: 1,
      name: 1,
      [`${semester}.mark1`]: 1,
      [`${semester}.mark2`]: 1,
      [`${semester}.mark3`]: 1,
      _id: 0, // Exclude MongoDB `_id` field
    };

    // Fetch data from the database
    const data = await StudentModel.find({}, projection);

    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No data found for semester: ${semester}`,
      });
    }

    res.status(200).json({
      status: "success",
      semester,
      data,
    });
  } catch (error) {
    console.error(`Error fetching data for ${semester}:`, error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the data",
    });
  }
});

app.get("/studentlist", async (req, res) => {
  try {
    const namelist = await StudentModel.find({}, { rollno: 1, name: 1, _id: 0 });
    console.log("Result:", namelist);

    if (namelist.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No students found",
      });
    }

    res.status(200).json({
      status: "success",
      data: namelist,
    });
  } catch (error) {
    console.error("Error fetching student list:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the student list",
    });
  }
});

app.get("/stulogin/:rollno", (req, res) => {
  const rollno = req.params.rollno; // Roll number from request parameters
  console.log(rollno);
  StudentModel.findOne({ rollno: new RegExp(`^${rollno}$`, "i") }) // Case-insensitive match
    .then(user => {
      if (user) {
        res.json({
          name: user.name,
          sem1: {
            mark1: user.sem1.mark1,
            mark2: user.sem1.mark2,
            mark3: user.sem1.mark3
          },
          sem2: {
            mark1: user.sem2.mark1,
            mark2: user.sem2.mark2,
            mark3: user.sem2.mark3
          },
          sem3: {
            mark1: user.sem3.mark1,
            mark2: user.sem3.mark2,
            mark3: user.sem3.mark3
          },
          sem4: {
            mark1: user.sem4.mark1,
            mark2: user.sem4.mark2,
            mark3: user.sem4.mark3
          }
        });
      } else {
        res.status(404).json({ message: "No record found for the given roll number" });
      }
    })
    .catch(err => {
      console.error("Error fetching student:", err);
      res.status(500).json({ message: "An error occurred while fetching data" });
    });
});

  
 app.post("/update", async (req, res) => {
    try {
      const { rollno, marks } = req.body;
      
      const student = await StudentModel.findOne({ rollno });
      if (!student) {
        return res.status(404).json({ 
          message: "Student not found" 
        });
      }
  
      student.marks = { ...student.marks, ...marks };
      await student.save();
  
      res.json({ 
        message: "Marks updated successfully", 
        marks: student.marks 
      });
    } catch (err) {
      console.error("Error updating marks:", err);
      res.status(500).json({ 
        message: "An error occurred while updating marks" 
      });
    }
  });
  
app.listen(3001,() => {
    console.log("server is running")
})