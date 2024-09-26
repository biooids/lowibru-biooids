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
import { FaPlayCircle } from "react-icons/fa";
import { BiSolidCalendarEvent } from "react-icons/bi";

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
    <div className="mb-10">
      <Sidebar className=" sticky top-0  hidden md:block h-fit  ">
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
              <div className="flex justify-center items-center  gap-2 text-center">
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

                <p className="line-clamp-1 text-xs ">{userName} </p>
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

            <Link to="/">
              <Sidebar.Item icon={FaHome} as={"div"}>
                Home
              </Sidebar.Item>
            </Link>
            <a href="https://lowibru.chat.biooids.com/" target="_blank">
              <Sidebar.Item
                icon={MdMessage}
                label="4"
                labelColor="dark"
                as={"div"}
              >
                Chat
              </Sidebar.Item>
            </a>

            <Link to="events">
              <Sidebar.Item
                icon={BiSolidCalendarEvent}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Events
              </Sidebar.Item>
            </Link>
            <Link to="flicks">
              <Sidebar.Item
                icon={FaPlayCircle}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Flicks
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
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
            <Link to="notifications">
              <Sidebar.Item
                icon={MdNotificationsActive}
                label="9+"
                labelColor="dark"
                as={"div"}
              >
                Notifications
              </Sidebar.Item>
            </Link>
            <Link to="help">
              <Sidebar.Item icon={MdHelp} as={"div"}>
                Help
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Bottom navigation for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-amber-500 sm:hidden flex justify-around items-center py-2 z-50 dark:bg-slate-900">
        <Link className="flex flex-col justify-center items-center" to="/">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </Link>
        <a
          className="flex flex-col justify-center items-center"
          href="https://lowibru.chat.biooids.com/"
          target="_blank"
        >
          <MdMessage className="text-xl" />
          <span className="text-xs">Chat</span>
        </a>
        <Link className="flex flex-col justify-center items-center" to="events">
          <BiSolidCalendarEvent className="text-xl" />
          <span className="text-xs">Events</span>
        </Link>
        <Link className="flex flex-col justify-center items-center" to="flicks">
          <FaPlayCircle className="text-xl" />
          <span className="text-xs">Flicks</span>
        </Link>
        <Link
          className="flex flex-col justify-center items-center"
          to="lectures"
        >
          <MdMenuBook className="text-xl" />
          <span className="text-xs">Lectures</span>
        </Link>
      </div>
    </div>
  );
}

export default SidebarComp;
