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

  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  if (!data) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4">Dashboard</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light">
              <h5 className="text-muted">Total Students</h5>
              <h4>{data.totalStudents}</h4>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light">
              <h5 className="text-muted">Vaccinated</h5>
              <h4>{data.vaccinatedStudents}</h4>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light">
              <h5 className="text-muted">Vaccination %</h5>
              <h4>{data.percentageVaccinated}%</h4>
            </div>
          </div>
        </div>

        <h4 className="mt-5">Upcoming Drives (Next 30 Days)</h4>
        {data.upcomingDrives.length === 0 ? (
          <p className="text-muted">No upcoming drives</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mt-3">
              <thead className="table-light">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;