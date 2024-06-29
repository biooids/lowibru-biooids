import { Card } from "flowbite-react";
import React from "react";

import profilePic from "../../../../assets/father.jpg";
function DiscoverCard() {
  return (
    <article>
      <Card
        className="w-full overflow-hidden  h-full"
        imgAlt="the picture"
        imgSrc={profilePic}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lorem ipsum, dolor sit amet
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque est
          rerum sint et dignissimos beatae consectetur neque illum sit? Ullam
        </p>
      </Card>
    </article>
  );
}

export default DiscoverCard;
