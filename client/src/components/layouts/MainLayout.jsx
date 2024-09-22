import React from "react";
import SidebarComp from "../mainComp/SidebarComp";
import HeaderComp from "../mainComp/HeaderComp";
import { Outlet } from "react-router-dom";
import FooterComp from "../mainComp/FooterComp";

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen max-w-[1440px] m-auto">
        <SidebarComp />
        <div className="w-full ">
          <header>
            <HeaderComp />
          </header>
          <main className="min-h-screen ">
            <Outlet />
          </main>
        </div>
      </div>
      <footer className="mt-10">
        <FooterComp />
      </footer>
    </>
  );
}

export default MainLayout;
