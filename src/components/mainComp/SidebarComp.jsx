import React from "react";
import { Avatar, Sidebar } from "flowbite-react";

import { FaUserCircle, FaHome, FaStoreAlt } from "react-icons/fa";
import {
  MdMessage,
  MdOutlinePublic,
  MdOutlineEvent,
  MdOutlinePermMedia,
  MdNotificationsActive,
  MdHelp,
  MdMenuBook,
} from "react-icons/md";

import profilePic from "../../assets/father.jpg";
import { Link } from "react-router-dom";

function SidebarComp() {
  return (
    <>
      {/* Sidebar for larger screens */}
      <Sidebar className=" sticky top-0  hidden md:block w-[300px]  z-10  ">
        <div className=" border-b-2 border-amber-500 pt-5">
          <Avatar img={profilePic} size="lg" rounded bordered />
          <div className="text-center">
            <h3>John Doe: Leader</h3>
          </div>
        </div>
        <Sidebar.Items className="mt-3  h-screen  ">
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FaUserCircle}>Update Profile</Sidebar.Item>

            <Sidebar.Item icon={FaHome}>Home</Sidebar.Item>
            <Sidebar.Item icon={MdMessage} label="4" labelColor="dark">
              Chat
            </Sidebar.Item>

            <Link to="events">
              <Sidebar.Item
                icon={MdOutlineEvent}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Events
              </Sidebar.Item>
            </Link>
            <Link to="talents">
              <Sidebar.Item
                icon={MdOutlineEvent}
                label="2"
                labelColor="dark"
                as={"div"}
              >
                Talents
              </Sidebar.Item>
            </Link>
            <Link to="lectures">
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
            >
              Notifications
            </Sidebar.Item>
            <Sidebar.Item icon={MdHelp}>Help</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Bottom navigation for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-amber-500 md:hidden flex justify-around items-center py-2 z-10">
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
    </>
  );
}

export default SidebarComp;
