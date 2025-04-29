import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/status/dashboard')
      .then(res => setData(res.data))
      .catch(err => setError('Failed to load dashboard data'));
  }, []);

  if (error) return <div className="text-danger mt-3">{error}</div>;
  if (!data) return <div className="mt-3">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Students</h5>
            <p>{data.totalStudents}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Vaccinated Students</h5>
            <p>{data.vaccinatedStudents}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Vaccinated %</h5>
            <p>{data.percentageVaccinated}%</p>
          </div>
        </div>
      </div>

      <h4 className="mt-5">Upcoming Drives (Next 30 Days)</h4>
      {data.upcomingDrives.length === 0 ? (
        <p className="text-muted">No upcoming drives</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Date</th>
              <th>Classes</th>
              <th>Doses</th>
            </tr>
          </thead>
          <tbody>
            {data.upcomingDrives.map((drive, index) => (
              <tr key={index}>
                <td>{drive.vaccineName}</td>
                <td>{drive.driveDate}</td>
                <td>{drive.applicableClasses}</td>
                <td>{drive.availableDoses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;