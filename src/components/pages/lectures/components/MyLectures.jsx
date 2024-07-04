import React from "react";
import { Link } from "react-router-dom";
import MyLecturesCard from "./MyLecturesCard";

function MyLectures() {
  return (
    <div className="lectures-card-containers ">
      <Link to="1">
        <MyLecturesCard />
      </Link>
    </div>
  );
}

export default MyLectures;
