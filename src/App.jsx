import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/mainComp/LandingPage";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./components/pages/home/HomePage";
import Events from "./components/pages/events/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/events" element={<Events />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
