import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicationForm from "./componant/ApplicationForm";
import AllApplications from "./componant/AllApplications";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<ApplicationForm />} />
      <Route path="/AllApplications" element={<AllApplications />} />
  
    </Routes>
  </Router>
  );
}

export default App;
