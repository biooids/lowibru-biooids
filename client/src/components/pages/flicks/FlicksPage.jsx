import React from "react";
import "./flicks.css";
import { Link, Outlet } from "react-router-dom";
import { Button } from "flowbite-react";

function FlicksPage() {
  return (
    <section className="flex flex-col gap-3   main-flicks-container">
      <h3>Post and enjoy short flicks content</h3>
      <nav className="P-3 flex justify-around w-full">
        <Link className="p-1 bg-slate-800 rounded-lg">All flicks</Link>
        <Link className="p-1 bg-slate-800 rounded-lg">My flicks</Link>
        <Link className="p-1 bg-slate-800 rounded-lg">Create flick</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </section>
  );
}

export default FlicksPage;
