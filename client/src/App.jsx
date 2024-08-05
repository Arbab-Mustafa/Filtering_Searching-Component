import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  CityWiseEvent,
  EventDetail,
  SearchFilter,
  VenuDetail,
} from "./components";
import AddEvent from "./pages/addNewEvent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchFilter />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/venu/:name" element={<VenuDetail />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/venu/:name" element={<VenuDetail />} />
          <Route path="/cities/:city" element={<CityWiseEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
