import React from "react";
import SidebarComp from "../mainComp/SidebarComp";
import HeaderComp from "../mainComp/HeaderComp";
import { Outlet } from "react-router-dom";
import FooterComp from "../mainComp/FooterComp";

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarComp />
        <div className="w-full ">
          <header>
            <HeaderComp />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <FooterComp />
    </>
  );
}

export default MainLayout;
