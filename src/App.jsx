import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/mainComp/LandingPage";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./components/pages/home/HomePage";
import Events from "./components/pages/events/Events";
import Activities from "./components/pages/events/components/Activities";
import LiveEvents from "./components/pages/events/components/LiveEvents";
import UpcomingEvents from "./components/pages/events/components/UpcomingEvents";
import SavedEvents from "./components/pages/events/components/SavedEvents";
import PostEvents from "./components/pages/events/components/post/PostEvents";
import EventCreate from "./components/pages/events/components/post/EventCreate";
import EventMyPost from "./components/pages/events/components/post/EventMyPost";
import EventPermission from "./components/pages/events/components/post/EventPermission";
import Lectures from "./components/pages/lectures/Lectures";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>

          <Route path="/events" element={<Events />}>
            <Route index element={<Activities />} />
            <Route path="live" element={<LiveEvents />} />
            <Route path="upcoming" element={<UpcomingEvents />} />
            <Route path="saved" element={<SavedEvents />} />

            <Route path="post" element={<PostEvents />}>
              <Route index element={<EventCreate />} />
              <Route path="mypost" element={<EventMyPost />} />
              <Route path="permission" element={<EventPermission />} />
              {/* 
              <Route path="golive" element={<EventGolive />} />
              */}
            </Route>
          </Route>

          <Route path="/lectures" element={<Lectures />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
