import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchFilter from "./components/SearchFilter";
import EventDetail from "./components/EventDetail";
import VenuDetail from "./components/VanuDetail";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchFilter />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/venu/:name" element={<VenuDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
