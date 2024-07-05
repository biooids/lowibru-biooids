import { Button } from "flowbite-react";
import React from "react";
import profilePic from "../../../../assets/father.jpg";

function StatusCard() {
  return (
    <section className="gap-3 g-slate-800 cart-containers">
      <article className="bg-slate-800">
        <div className="bg-slate-800 h-[200px] w-[200px]">
          <img
            src={profilePic}
            alt="dd"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3>The necless</h3>
          <div>
            <div>
              <span>12.34 USD</span>
              <span>14.45 USD off</span>
            </div>
            <div className="bg-red-600">
              <span>1</span>
              <span>+</span>
              <span>-</span>
            </div>
          </div>
          <div className="flex  gap-1 justify-between">
            <span>XL</span>
            <span>Blue</span>
            <span>4 Remaining</span>
          </div>
          <div>
            <span>Save</span>
            <span>Delete</span>
          </div>
        </div>
      </article>
      <article className="bg-slate-800 flex flex-col justify-between">
        <h3>PromoCode if any </h3>

        <h4>Sub Total</h4>
        <ul>
          <li>Discount</li>

          <li>At Rwanda HQ </li>
          <li>Time Remaining : 1 day</li>

          <li>Tax</li>
          <li>Transport</li>
        </ul>

        <div>
          <span>Total : 123 USD</span>
        </div>
      </article>
    </section>
  );
}

export default StatusCard;
