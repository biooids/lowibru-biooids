import React, { useState } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import profilePic from "../../../assets/father.jpg";
import AllOthersPosts from "./components/AllOthersPosts";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

function UserProfile() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const { currentUser } = useSelector((state) => state.user);
  const {
    profilePicture,
    firstName,
    lastName,
    userName,
    isLeader,
    isAdmin,
    isDeveloper,
  } = currentUser?.user || {};
  return (
    <section>
      <section className="flex flex-col gap-3 p-2 bg-slate-800 rounded-lg mt-4">
        <div className="flex gap-3">
          <h3 className="text-xl border-l-4 pl-3 justify-center">
            User details
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
              <Button>Connect</Button>
              <Button>Message</Button>
              <Dropdown label={<BsThreeDots className="text-xl" />}>
                <Dropdown.Item>
                  <span className="text-red-500">Block</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Report</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Share</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Separated link</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="flex gap-3 justify-between ">
              <div className="flex flex-col">
                <span>Connected :</span>
                <span>33</span>
              </div>
              <div className="flex flex-col">
                <span>Interested :</span>
                <span>1000</span>
              </div>
              <div className="flex flex-col">
                <span>Posts :</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:max-w-72 border-l-4 pl-3 ">
          <p>
            how many seasons of one piece and when were they released{" "}
            {isExpanded && (
              <span>
                consequuntur sequi similique dicta ut accusantium tenetur porro
                voluptatibus asperiores soluta magni eligendi a tempora. Facere,
                consectetur laborum.
              </span>
            )}
          </p>
          <span className=" cursor-pointer underline" onClick={handleToggle}>
            {isExpanded ? " read less" : " read more"}
          </span>
        </div>

        <div className="w-full justify-around gap-3  flex flex-col sm:flex-row">
          <div className="flex flex-col">
            <span className="text-amber-500">Role :</span>
            <span>Admin-0</span>
          </div>
          <div className="flex flex-col">
            <span className="text-amber-500">Contacts :</span>
            <span>(+250) 790 931 024</span>
            <span>ehwapyongm@gmail.com</span>
          </div>
          <div className="flex flex-col">
            <span className="text-amber-500">Links :</span>
            <span>none </span>
          </div>
        </div>
      </section>

      <section>
        <AllOthersPosts />
      </section>
    </section>
  );
}

export default UserProfile;
