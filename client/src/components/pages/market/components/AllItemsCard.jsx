import { Button, Card } from "flowbite-react";
import React from "react";

import profilePic from "../../../../assets/father.jpg";
function AllItemsCard() {
  return (
    <article>
      <Card
        className="w-full overflow-hidden  h-full"
        imgAlt="the picture"
        imgSrc={profilePic}
      >
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lorem ipsum, dolor sit amet
        </h5>
        <div className="flex w-full justify-between">
          <span> Price:</span>

          <h6 className=" tracking-tight text-gray-900 dark:text-white">
            12.54
          </h6>
          <span className="line-through text-red-600"> 14.05 </span>
          <span>USD</span>
        </div>
        <Button>Add To Cart</Button>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque est
          rerum sint et dignissimos beatae consectetur neque illum sit? Ullam
        </p>
      </Card>
    </article>
  );
}

export default AllItemsCard;
