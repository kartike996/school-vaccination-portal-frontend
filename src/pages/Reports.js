import React, { useState } from 'react';
import axios from '../api/axios';

const Reports = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    try {
      const res = await axios.get(`/status/report?vaccineName=${vaccineName}&page=${page}&size=${size}`);
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Failed to load report');
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchReport();
  };

  return (
    <div className="container mt-5">
      <h2>Vaccination Reports</h2>

      <div className="form-group mb-3 w-50">
        <label>Vaccine Name</label>
        <input
          className="form-control"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
          placeholder="Enter Vaccine Name"
          required
        />
      </div>

      <button className="btn btn-primary mb-4" onClick={fetchReport}>Generate Report</button>

      {error && <p className="text-danger">{error}</p>}

      {students.length > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Vaccination Dates</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>{student.studentClass}</td>
                  <td>
                    {student.vaccinationStatuses
                      .filter(v => v.vaccineName.toLowerCase() === vaccineName.toLowerCase())
                      .map((v, idx) => (
                        <div key={idx}>{v.vaccinationDate}</div>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              disabled={page + 1 === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;