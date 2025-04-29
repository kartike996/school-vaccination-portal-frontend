import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/status/students');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to load students');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/status/students', {
        studentId,
        studentName,
        studentClass,
      });
      setStudentId('');
      setStudentName('');
      setStudentClass('');
      fetchStudents();
    } catch (err) {
      setError('Failed to add student');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Students</h2>

      <form onSubmit={handleSubmit} className="w-50 mb-4">
        <div className="form-group mb-3">
          <label>Student ID</label>
          <input type="text" className="form-control" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Student Name</label>
          <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Student Class</label>
          <input type="text" className="form-control" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
        </div>
        <button className="btn btn-success">Add Student</button>
      </form>

      <h4>All Students</h4>
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Vaccinations</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.studentClass}</td>
              <td>{student.vaccinationStatuses ? student.vaccinationStatuses.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;