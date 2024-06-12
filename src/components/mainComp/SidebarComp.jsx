import React from "react";
import { Avatar, Sidebar } from "flowbite-react";
import { FaUserCircle, FaHome, FaStoreAlt } from "react-icons/fa";
import { MdOutlineEvent, MdOutlinePermMedia, MdMenuBook } from "react-icons/md";
import profilePic from "../../assets/father.jpg";
import { Link } from "react-router-dom";

function SidebarComp() {
  return (
    <>
      {/* Sidebar for larger screens */}
      <Sidebar className="sticky top-0 hidden md:block w-[300px]">
        <div className="border-b-2 border-amber-500 pt-5">
          <Avatar img={profilePic} size="lg" rounded bordered />
          <div className="text-center">
            <h3>John Doe: Leader</h3>
          </div>
        </div>
        <Sidebar.Items className="mt-3 h-screen">
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FaUserCircle}>Update Profile</Sidebar.Item>
            <Sidebar.Item icon={FaHome}>Home</Sidebar.Item>
            <Link to="events">
              <Sidebar.Item icon={MdOutlineEvent}>Events</Sidebar.Item>
            </Link>
            <Link to="talents">
              <Sidebar.Item icon={MdOutlineEvent}>Talents</Sidebar.Item>
            </Link>
            <Link to="lectures">
              <Sidebar.Item icon={MdMenuBook}>Lectures</Sidebar.Item>
            </Link>
            <Link to="market">
              <Sidebar.Item icon={FaStoreAlt}>Market</Sidebar.Item>
            </Link>
            <Link to="media">
              <Sidebar.Item icon={MdOutlinePermMedia}>Media</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Bottom navigation for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-amber-500 md:hidden flex justify-around items-center py-2 z-10">
        <Link to="events">
          <MdOutlineEvent className="text-xl" />
          <span className="text-xs">Events</span>
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
