import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import EventDetail from "./EventDetail";
import VenuDetail from "./VanuDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchFilter />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/venu/:id" element={<VenuDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
