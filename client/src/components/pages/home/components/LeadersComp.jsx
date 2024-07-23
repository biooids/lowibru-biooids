import { Card } from "flowbite-react";
import React from "react";

import leaderPic from "../../../../assets/father.jpg";
function LeadersComp({ leaderName, title, description }) {
  return (
    <article>
      <Card
        className="w-full overflow-hidden  h-full"
        imgAlt="the picture"
        imgSrc={leaderPic}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {leaderName}
        </h5>
        <p>{title}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div></div>
      </Card>
    </article>
  );
}

export default LeadersComp;
