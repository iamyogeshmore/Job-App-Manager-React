import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const BASE_URL = "http://localhost:8085";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios.get(`${BASE_URL}/getAllApplications`).then((res) => {
      setApplications(res.data.obj);
      console.log(res.data.obj);
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", marginTop: "20px" }}>
        All Applications
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        {applications.map((application) => (
          <Box key={application.id} sx={{ border: "1px solid #ccc", padding: "10px" }}>
            <Typography variant="h6">Application ID: {application.id}</Typography>
            <Typography variant="body1">Full Name: {application.fullName}</Typography>
            <Typography variant="body1">Email: {application.email}</Typography>
            <Typography variant="body1">Contact Number: {application.contactNumber}</Typography>
            <Typography variant="body1">Total Experience: {application.totalExperience}</Typography>
            <Typography variant="body1">Current CTC: {application.currentCTC}</Typography>
            <Typography variant="body1">Expected CTC: {application.expectedCTC}</Typography>
            <Typography variant="body1">Skills: {application.skills}</Typography>
            <Typography variant="body1">Resume: {application.resume}</Typography>
            <Typography variant="body1">Cover Letter: {application.coverLetter}</Typography>
            <Typography variant="body1">Job Role: {application.jobRole.roleName}</Typography>
            <Typography variant="body1">Department: {application.department.departmentName}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllApplications;
