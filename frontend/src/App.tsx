import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import EntertainerList from "./pages/EntertainerList";
import EntertainerDetails from "./pages/EntertainerDetails";
import EditEntertainer from "./pages/EditEntertainer";
import AddEntertainer from "./pages/AddEntertainer";
import HeaderNavbar from "./Nav/HeaderNavbar";

const App = () => {
  return (
    <Router>
      <HeaderNavbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/entertainers" element={<EntertainerList />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
        <Route path="/entertainers/edit/:id" element={<EditEntertainer />} />
        <Route path="/entertainers/add" element={<AddEntertainer />} />
      </Routes>
    </Router>
  );
};

export default App;
