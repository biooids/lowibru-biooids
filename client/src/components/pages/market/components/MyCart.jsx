import React from "react";
import MyCartCard from "./MyCartCard";

function MyCart() {
  return (
    <div className="flex flex-col gap-3 ">
      <MyCartCard />
      <MyCartCard />
      <MyCartCard />
      <MyCartCard />
    </div>
  );
}

export default MyCart;
