import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [formData, setFormData] = useState({
    vaccineName: '',
    driveDate: '',
    availableDoses: '',
    applicableClasses: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await axios.get('/status/drives');
      setDrives(res.data);
    } catch (err) {
      setError('Failed to load drives');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/status/drives', {
        vaccineName: formData.vaccineName,
        driveDate: formData.driveDate,
        availableDoses: parseInt(formData.availableDoses),
        applicableClasses: formData.applicableClasses
      });
      setFormData({ vaccineName: '', driveDate: '', availableDoses: '', applicableClasses: '' });
      fetchDrives();
    } catch (err) {
      setError('Failed to create drive. Please check the rules.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Vaccination Drives</h2>

      <form onSubmit={handleSubmit} className="w-50 mb-4">
        <div className="form-group mb-3">
          <label>Vaccine Name</label>
          <input name="vaccineName" className="form-control" value={formData.vaccineName} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Drive Date</label>
          <input name="driveDate" type="date" className="form-control" value={formData.driveDate} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Available Doses</label>
          <input name="availableDoses" type="number" className="form-control" value={formData.availableDoses} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Applicable Classes</label>
          <input name="applicableClasses" className="form-control" value={formData.applicableClasses} onChange={handleChange} required />
        </div>
        <button className="btn btn-success">Create Drive</button>
      </form>

      <h4>All Drives</h4>
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Drive ID</th>
            <th>Vaccine Name</th>
            <th>Drive Date</th>
            <th>Applicable Classes</th>
            <th>Available Doses</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive.driveId}>
              <td>{drive.driveId}</td>
              <td>{drive.vaccineName}</td>
              <td>{drive.driveDate}</td>
              <td>{drive.applicableClasses}</td>
              <td>{drive.availableDoses}</td>
              <td>{drive.completed ? 'Completed' : 'Upcoming'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drives;