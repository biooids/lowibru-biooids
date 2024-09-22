import React, { useState } from "react";
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

import { BiSolidCalendarEvent } from "react-icons/bi";
import { FaPlayCircle, FaStoreAlt } from "react-icons/fa";
import {
  MdMenuBook,
  MdMessage,
  MdOutlineEvent,
  MdOutlinePermMedia,
  MdNotificationsActive,
  MdHelp,
} from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

import logo from "../../assets/ffwpu.png";
import { Link } from "react-router-dom";

function HeaderComp() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(!isOpen);

  return (
    <nav className="  border-b-2 border-amber-500 flex p-3 justify-between items-center">
      <Link to="/" className="flex gap-1">
        <img src={logo} className="mr-1 h-6 sm:h-9" alt="ffwpu Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          FFWPU
        </span>
      </Link>

      <Link className="hover:bg-amber-900 h-fit p-1 text-xl rounded-lg border-2 border-amber-500">
        <MdMessage />
      </Link>

      <Link className="hover:bg-amber-900 h-fit p-1 text-xl rounded-lg border-2 border-amber-500">
        <BiSolidCalendarEvent />
      </Link>

      <Link className="hover:bg-amber-900 h-fit p-1 text-xl rounded-lg border-2 border-amber-500">
        <MdNotificationsActive />
      </Link>

      <div className=" h-fit  text-xl rounded-lg  cursor-pointer md:hidden">
        <TiThMenu onClick={() => setIsOpen(true)} />
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="h-fit"
      >
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link>
                    <Sidebar.Item href="/e-commerce/products" icon={FaStoreAlt}>
                      Market
                    </Sidebar.Item>
                  </Link>

                  <Link>
                    <Sidebar.Item href="/users/list" icon={MdOutlinePermMedia}>
                      Media
                    </Sidebar.Item>
                  </Link>

                  <Link>
                    <Sidebar.Item href="/authentication/sign-in" icon={MdHelp}>
                      Help
                    </Sidebar.Item>
                  </Link>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </nav>
  );
}

export default HeaderComp;
