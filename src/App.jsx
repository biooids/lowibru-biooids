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
import Discover from "./components/pages/lectures/components/Discover";
import MyLectures from "./components/pages/lectures/components/MyLectures";
import UploadLectures from "./components/pages/lectures/components/UploadLectures";
import Lesson from "./components/pages/lectures/components/Lesson";
import Market from "./components/pages/market/Market";
import AllItems from "./components/pages/market/components/AllItems";
import MyCart from "./components/pages/market/components/MyCart";
import Status from "./components/pages/market/components/Status";
import UploadItems from "./components/pages/market/components/UploadItems";
import SignUp from "./components/pages/userForm/SignUp";
import LogIn from "./components/pages/userForm/LogIn";
import Profile from "./components/pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>

          {/* from */}
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>

          {/* Events */}
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

          {/* Lectures */}
          <Route path="/lectures" element={<Lectures />}>
            <Route index element={<Discover />} />
            <Route path="mylectures" element={<MyLectures />} />
            <Route path="mylectures/:id" element={<Lesson />} />
            <Route path="upload" element={<UploadLectures />} />
          </Route>

          {/* Market */}
          <Route path="/market" element={<Market />}>
            <Route index element={<AllItems />} />
            <Route path="mycart" element={<MyCart />} />
            <Route path="status" element={<Status />} />
            <Route path="uploaditems" element={<UploadItems />} />
          </Route>
          {/*Profile page*/}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
