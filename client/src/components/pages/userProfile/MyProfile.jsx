import React, { useState } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import profilePic from "../../../assets/father.jpg";
import AllOthersPosts from "./components/AllOthersPosts";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signoutStart,
  signoutSuccess,
  signoutFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../../app/user/userSlice.js";

import { FaCode } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbAlpha } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";

function MyProfile() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    profilePicture,
    firstName,
    lastName,
    userName,
    isLeader,
    isAdmin,
    isDeveloper,
    shortDescription,
    emailOrPhone,
    externalLink,
  } = currentUser?.user || {};

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        dispatch(signoutFailure(data.message));
        return;
      } else {
        dispatch(signoutSuccess());
        return;
      }
    } catch (error) {
      console.log(error.message);
      dispatch(
        signoutFailure(
          "some thing went wrong check network or " + error.message
        )
      );
      return;
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.user._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      return;
    }
  };
  return (
    <section className="p-3 flex flex-col gap-3 ">
      {error ? <div className="p-3 bg-red-500">{error}</div> : ""}
      <section className="flex flex-col gap-3 p-2 bg-slate-800 rounded-lg mt-4">
        <div className="flex gap-3">
          <h3 className="text-xl border-l-4 pl-3 justify-center">
            Your details
          </h3>
        </div>

        <div className="flex  flex-col gap-3 lg:flex-row justify-between  sm:justify-around ">
          <div className="flex   justify-start items-start gap-3">
            <div className="relative ">
              <Avatar img={profilePicture} rounded bordered size="lg" />
              <FaCamera className="absolute bottom-0 left-8 text-white" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex flex-col ">
                <p className="line-clamp-1">{firstName}</p>
                <p className="line-clamp-1">{lastName}</p>
              </div>
              <p className="text-sm text-amber-500 line-clamp-1">{userName}</p>
            </div>
          </div>

          <div className=" flex flex-col gap-3">
            <div className="flex gap-2 justify-between sm:justify-start">
              <Link to="/edit">
                <Button>Edit</Button>
              </Link>
              <Button onClick={handleSignout}>
                {loading ? "loading" : "sign out"}{" "}
              </Button>
              <Button onClick={handleDeleteUser}>
                {loading ? "deleting" : "delete"}
              </Button>
            </div>
            <div className="flex gap-3 justify-between ">
              <div className="flex flex-col">
                <span>followers :</span>
                <span className="text-red-500 text-xs">under construction</span>
              </div>
              <div className="flex flex-col">
                <span>following :</span>
                <span className="text-red-500 text-xs">under construction</span>
              </div>
              <div className="flex flex-col">
                <span>Posts :</span>
                <span className="text-red-500 text-xs">under construction</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:max-w-72 border-l-4 pl-3 ">
          <p
            className={` break-words
              ${isExpanded ? "line-clamp-none" : "line-clamp-2"}`}
          >
            {shortDescription}
          </p>
          <span className=" cursor-pointer underline" onClick={handleToggle}>
            {isExpanded ? " read less" : " read more"}
          </span>
        </div>

        <div className="w-full justify-around gap-3  flex flex-col sm:flex-row">
          <div className="flex flex-col">
            <span className="text-amber-500">Links :</span>
            <a href={externalLink} className="hover:underline" target="_blank">
              {externalLink || "none"}{" "}
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-amber-500">Role :</span>
            <div className="flex gap-2 text-xl">
              {isLeader ? (
                <TbAlpha />
              ) : isAdmin ? (
                <RiAdminFill />
              ) : isDeveloper ? (
                <FaCode />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-amber-500">Contacts :</span>
            <span>{emailOrPhone}</span>
          </div>
        </div>
      </section>

      <section className="flex gap-3 flex-col ">
        <div className="flex gap-3">
          <Link to="">
            <Button>All Posts</Button>
          </Link>
          <Link to="">
            <Button>Talents</Button>
          </Link>
        </div>
        <AllOthersPosts />
      </section>
    </section>
  );
}

export default MyProfile;
