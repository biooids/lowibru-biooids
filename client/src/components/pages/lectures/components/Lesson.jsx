import React from "react";
import profilePic from "../../../../assets/father.jpg";
import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function Lesson() {
  return (
    <div className=" flex gap-5 flex-col">
      <div className=" h-[500px] rounded-md overflow-hidden ">
        <img
          src={profilePic}
          alt="yes"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-amber-950 p-2 w-full flex justify-between items-center text-xl rounded-md">
        <span className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
          <BiLike /> 1k
        </span>
        <FaShareAlt className="hover:text-amber-400 cursor-pointer" />
        <MdDeleteForever className="hover:text-amber-400 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-3">
        <h5 className="text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur
        </h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          aperiam delectus unde, cumque nostrum, doloremque accusantium quam
          provident minima eius illum atque dolorum voluptate incidunt esse
          eligendi fugit facilis vero. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Architecto consequuntur pariatur inventore saepe
          iusto assumenda quas facilis, repudiandae dolore debitis quae, labore
          nesciunt vel rerum veniam. Qui accusantium optio excepturi. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Culpa sit omnis et
          praesentium repellat possimus quidem exercitationem repellendus dolor
          molestias impedit officiis tempore, sint ex excepturi deleniti ea
          delectus ab.
        </p>
      </div>
    </div>
  );
}

export default Lesson;
