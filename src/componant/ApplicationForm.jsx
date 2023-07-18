import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Snackbar, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';



const BASE_URL = "http://localhost:8085";

const ApplicationForm = () => {
  useEffect(() => {
    document.title = "Job App Manager"; // Change the title to 'Job App Manager'
  }, []);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [currentCTC, setCurrentCTC] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const fetchJobRoles = () => {
    axios.get(`${BASE_URL}/jobroles/getAllJobRoles`).then((res) => {
      setJobRoles(res.data.obj);
      console.log(res.data.obj);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const applicationData = {
        fullName,
        email,
        contactNumber,
        totalExperience,
        currentCTC,
        expectedCTC,
        skills,
        resume,
        coverLetter,
      };

      await axios.post(
        `${BASE_URL}/${selectedJobRole.id}/applications`,
        applicationData
      );

      setShowSuccessSnackbar(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting application:", error);
      setShowErrorSnackbar(true);
    }
  };

  const resetForm = () => {
    setSelectedJobRole("");
    setFullName("");
    setEmail("");
    setContactNumber("");
    setTotalExperience("");
    setCurrentCTC("");
    setExpectedCTC("");
    setSkills("");
    setResume("");
    setCoverLetter("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  useEffect(() => {
    fetchJobRoles();
  }, []);

  return (
    
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Snackbar and Typography styles */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        sx={{ width: "100%" }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success">
          Application submitted successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        sx={{ width: "100%" }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="error">
          Error submitting application. Please try again.
        </MuiAlert>
      </Snackbar>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        Job Application Form
      </Typography>
      <form onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
        {/* Form container styles */}
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
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contact Number"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <TextField
            label="Total Experience"
            value={totalExperience}
            onChange={(e) => setTotalExperience(e.target.value)}
            required
          />
          <TextField
            label="Current CTC"
            value={currentCTC}
            onChange={(e) => setCurrentCTC(e.target.value)}
            required
          />
          <TextField
            label="Expected CTC"
            value={expectedCTC}
            onChange={(e) => setExpectedCTC(e.target.value)}
            required
          />
          <TextField
            label="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
          <TextField
            label="Resume URL"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          />
          <TextField
            label="Cover Letter"
            multiline
            rows={4}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <TextField
            select
            label="Job Role"
            value={selectedJobRole ? selectedJobRole.id : ""}
            onChange={(e) => {
              const selectedRoleId = e.target.value;
              const selectedRole = jobRoles.find(
                (role) => role.id === selectedRoleId
              );
              setSelectedJobRole(selectedRole);
            }}
            required
          >
            {jobRoles.map((jobRole) => (
              <MenuItem key={jobRole.id} value={jobRole.id}>
                {jobRole.roleName}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/AllApplications" style={{ fontSize: "18px" }}>View All Applications</Link>
      </div>
    </Box>
    
  );

};

export default ApplicationForm;
