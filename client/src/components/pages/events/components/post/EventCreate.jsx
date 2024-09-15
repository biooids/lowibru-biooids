import React, { useState } from "react";
import EventCreateCard from "./EventCreateCard";
import {
  Avatar,
  Button,
  Carousel,
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import profilePic from "../../../../../assets/father.jpg";

import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { app } from "../../../../../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EventCreate() {
  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    schedule: new Date(),
    category: "happened",
    externalLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      {/* <EventCreateCard /> */}
      <form className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700 ">
        <div className=" p-3 flex flex-col justify-between bg-black h-">
          <Carousel
            slideInterval={1000000}
            as={"div"}
            className="h-56  sm:h-64 xl:h-80 2xl:h-96"
          >
            <img src={profilePic} alt="..." />
            <img src={profilePic} alt="..." />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
          <div className="flex gap-3">
            <FileInput
              type="file"
              accept="image/*"
              className="w-full"
              multiple
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              disabled={imageUploadProgress}
              className=""
              // onClick={handleUploadImage}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
        <div className=" flex gap-3 flex-col bg-ambe-800 p-3 rounded-md justify-between">
          <div className="bg-slate-700  rounded-lg p-3 flex flex-col">
            <h4 className="text-xl w-full mb-1 font-bold">
              Work Shop Lorem ipsum dolor sit amet consectetur,
            </h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate sapiente iusto excepturi velit quos ratione rem
              distinctio quis minima, eaque laboriosam, facere ex pariatur vel,
              ea voluptatum quam officiis aut?
            </p>
            <div className="mt-3 flex gap-3 flex-col">
              <div>
                {/* {formData.category === "upcoming" ? ( */}
                <div className="flex gap-3 flex-col">
                  <p className="text-xl font-bold">Selected date :</p>
                  <Datepicker
                    id="schedule"
                    minDate={new Date()}
                    // onSelectedDateChanged={handleDateChange}
                  />
                </div>
                {/* ) : (
              ""
            )} */}
              </div>
              <span className="text-2xl font-bold">1/3/2024</span>
              <div>
                <div className="flex justify-between mt-3">
                  <Button type="submit">Post now</Button>
                  <Button color="red">Delete</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center w-fit">
            <Avatar
              img="/images/people/profile-picture-5.jpg"
              rounded
              bordered
              className="flex justify-start items-start"
            />
            <div className=" font-medium dark:text-white flex justify-center items-center  gap-3">
              <span>Jese Leos</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ">
                posted in August 2014
              </span>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default EventCreate;
