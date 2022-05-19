import logo from './logo.svg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);


  useEffect(() => {
    async function getAllStudents() {
      try {
        const students = await axios.get('http://127.0.0.1:8000/api/');
        console.log(students.data);
        setStudents(students.data);
      }catch(error) {
        console.log(error);
      }
    }
    getAllStudents();
  }, []);
  return (
    <div className="App">
      <h1>Connect React JS with Django</h1>
      {
        students.map((student, index) => {
          return (
            <h1 key={index}>{student.stuname} - {student.email}</h1>
          );
        })
      }
    </div>
  );
}

export default App;
