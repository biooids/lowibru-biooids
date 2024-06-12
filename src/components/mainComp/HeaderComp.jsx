import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";

import { ImSearch } from "react-icons/im";
import { Dropdown } from "flowbite-react";
import { IoSettings } from "react-icons/io5";
import { MdOutlineEvent, MdMenuBook } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";
import logo from "../../assets/ffwpu.png";
import { Link } from "react-router-dom";

function HeaderComp() {
  return (
    <Navbar className="bg-transparent dark:bg-transparent border-b-2  relative flex-wrap">
      <Link to="/">
        <Navbar.Brand as={"div"}>
          <img src={logo} className="mr-1 h-6 sm:h-9" alt="ffwpu Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            FFWPU
          </span>
        </Navbar.Brand>
      </Link>
      <form className=" gap-1 flex">
        <TextInput type="text" placeholder="Search" />
        <Button
          type="submit"
          className="flex justify-center items-center   focus:ring-0"
        >
          <ImSearch />
        </Button>
      </form>

      <div className="flex">
        <Link to="events">
          <Button
            color="gray "
            className="hover:bg-amber-900 rounded-l rounded-r-none focus:ring-0"
          >
            <MdOutlineEvent className="mr-3 h-4 w-4" />
            Events
          </Button>
        </Link>
        <Link to="lectures">
          <Button
            color="gray "
            className="hover:bg-amber-900 rounded-none focus:ring-0"
          >
            <MdMenuBook className="mr-3 h-4 w-4" />
            Ectures
          </Button>
        </Link>
        <Link as="div">
          <Button
            color="gray "
            className="hover:bg-amber-900 rounded-l-none rounded-r focus:ring-0"
          >
            <FaStoreAlt className="mr-3 h-4 w-4" />
            Store
          </Button>
        </Link>
      </div>

      <div className="flex gap-3 justify-center items-center  ">
        <Dropdown label={<IoSettings />} className="" color="none">
          <Dropdown.Item>Light </Dropdown.Item>
          <Dropdown.Item>Dark</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default HeaderComp;
