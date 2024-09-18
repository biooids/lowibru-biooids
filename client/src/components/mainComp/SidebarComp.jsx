import React from "react";
import { Avatar, Button, Sidebar } from "flowbite-react";

import { FaUserCircle, FaHome, FaStoreAlt } from "react-icons/fa";
import {
  MdMessage,
  MdOutlineEvent,
  MdOutlinePermMedia,
  MdNotificationsActive,
  MdHelp,
  MdMenuBook,
} from "react-icons/md";

import { FaCode } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbAlpha } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SidebarComp() {
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
    <div>
      <Sidebar className=" sticky top-0  hidden md:block ">
        <div className=" border-b-2 border-amber-500 pb-2 w-full">
          {currentUser ? (
            <div>
              <Avatar
                img={profilePicture}
                size="lg"
                rounded
                bordered
                className="pb-2"
              />
              <div className="flex justify-center items-center flex-col gap-2 text-center">
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
                <div className="text-xs">
                  <p className="line-clamp-1">
                    <span className="text-amber-500">First : </span> {firstName}
                  </p>
                  <p className="line-clamp-1">
                    <span className="text-amber-500">Last : </span>
                    {lastName}{" "}
                  </p>
                  <p className="line-clamp-1 ">
                    {" "}
                    <span className="text-amber-500">User : </span> {userName}{" "}
                  </p>
                </div>{" "}
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <Link to="login">
                <Button>Log In</Button>
              </Link>
              <Link to="signup">
                <Button>sign up</Button>
              </Link>
            </div>
          )}
        </div>
        <Sidebar.Items className="mt-3  h-screen  ">
          <Sidebar.ItemGroup>
            <Link to="myprofile">
              <Sidebar.Item icon={FaUserCircle} as={"div"}>
                Update Profile
              </Sidebar.Item>
            </Link>

            <Sidebar.Item icon={FaHome} as={"div"}>
              Home
            </Sidebar.Item>
            <Sidebar.Item
              icon={MdMessage}
              label="4"
              labelColor="dark"
              as={"div"}
            >
              Chat
            </Sidebar.Item>

            <Link to="/events">
              <Sidebar.Item
                icon={MdOutlineEvent}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Events
              </Sidebar.Item>
            </Link>
            <Link to="flicks">
              <Sidebar.Item
                icon={MdOutlineEvent}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Flicks
              </Sidebar.Item>
            </Link>
            <Link to="/lectures">
              <Sidebar.Item icon={MdMenuBook} as={"div"}>
                Lectures
              </Sidebar.Item>
            </Link>
            <Link to="market">
              <Sidebar.Item icon={FaStoreAlt} as={"div"}>
                Market
              </Sidebar.Item>
            </Link>
            <Link to="media">
              <Sidebar.Item icon={MdOutlinePermMedia} as={"div"}>
                Media
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={MdNotificationsActive}
              label="9+"
              labelColor="dark"
              as={"div"}
            >
              Notifications
            </Sidebar.Item>
            <Sidebar.Item icon={MdHelp} as={"div"}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Bottom navigation for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-amber-500 sm:hidden flex justify-around items-center py-2 z-50">
        <Link to="events">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="talents">
          <MdOutlineEvent className="text-xl" />
          <span className="text-xs">Talents</span>
        </Link>
        <Link to="lectures">
          <MdMenuBook className="text-xl" />
          <span className="text-xs">Lectures</span>
        </Link>
        <Link to="market">
          <FaStoreAlt className="text-xl" />
          <span className="text-xs">Market</span>
        </Link>
        <Link to="media">
          <MdOutlinePermMedia className="text-xl" />
          <span className="text-xs">Media</span>
        </Link>
      </div>
    </div>
  );
}

export default SidebarComp;
