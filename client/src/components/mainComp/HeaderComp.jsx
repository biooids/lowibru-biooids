import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";

import { IoSettings } from "react-icons/io5";
import { MdOutlineEvent, MdMenuBook } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

import { MdNotificationsActive, MdMessage } from "react-icons/md";

import logo from "../../assets/ffwpu.png";
import { Link } from "react-router-dom";

function HeaderComp() {
  return (
    <Navbar className=" dark:bg-transparent border-b-2 border-gray-400 ">
      <Link to="/">
        <Navbar.Brand as={"div"}>
          <img src={logo} className="mr-1 h-6 sm:h-9" alt="ffwpu Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            FFWPU
          </span>
        </Navbar.Brand>
      </Link>

      <Link className="hover:bg-amber-900 border-2 p-1 border-amber-500 rounded-md  flex justify-center items-center">
        <MdOutlineEvent />
      </Link>

      <Link className="hover:bg-amber-900  border-2 p-1 border-amber-500 rounded-md flex justify-center items-center">
        <MdMessage />
      </Link>

      <Link className="hover:bg-amber-900 h-full border-2 p-1 border-amber-500 rounded-md flex justify-center items-center">
        <MdNotificationsActive />
      </Link>

      <div className="  text-2xl">
        <IoSettings />
      </div>
    </Navbar>
  );
}

export default HeaderComp;
