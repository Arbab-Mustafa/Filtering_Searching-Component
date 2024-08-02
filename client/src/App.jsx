import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import axios from "axios";
import {
  CityWiseEvent,
  EventDetail,
  Footer,
  SearchFilter,
  VenuDetail,
} from "./components";
import AddEvent from "./pages/addNewEvent";
import Navbar from "./components/navbar";

axios.defaults.baseURL = "http://localhost:3001/api";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchFilter />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/venu/:name" element={<VenuDetail />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/venu/:name" element={<VenuDetail />} />
          <Route path="/cities/:city" element={<CityWiseEvent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
