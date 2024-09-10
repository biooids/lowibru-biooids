import React from "react";
import { Link, Outlet } from "react-router-dom";

function Edit() {
  return (
    <div>
      <div className="flex gap-5 p-5">
        <Link className="bg-white bg-opacity-5 p-2 " to=".">
          Edit Form
        </Link>
        <Link className="bg-white bg-opacity-5 p-2 " to="editContacts">
          Edit Contacts
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Edit;
