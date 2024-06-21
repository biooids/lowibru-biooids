import { Avatar } from "flowbite-react";
import React from "react";

function CommentsComp() {
  return (
    <div className="flex gap-3 pb-3 border-b-2 pt-3">
      <Avatar
        img="/images/people/profile-picture-5.jpg"
        rounded
        bordered
        className="flex justify-start items-start"
      />
      <div className="flex  flex-col gap-3">
        <div className=" font-medium dark:text-white flex items-center  gap-3">
          <span>Jese Leos</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            posted in August 2014
          </span>
        </div>
        <p className=" text-sm text-gray-400">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          alias, illum tempora officia quos nostrum. Pariatur vero sunt
          eligendi? Rerum tempora numquam consequuntur dolores perferendis
          assumenda laborum accusantium accusamus ea?Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nostrum atque animi vitae, corrupti
          numquam consectetur vero modi autem totam ex necessitatibus illo
          quaerat vel! Est quod cumque voluptate aperiam necessitatibus.
        </p>
        <div className="flex justify-between">
          <span className="hover:underline cursor-pointer">reply</span>
          <span className="hover:underline cursor-pointer"> replies: 11</span>
          <span className="hover:underline cursor-pointer"> like: 11</span>
          <span className="hover:underline cursor-pointer"> share</span>
        </div>
      </div>
    </div>
  );
}

export default CommentsComp;
