import React, { useState } from "react";
import EventCreateCard from "./EventCreateCard";
import {
  Alert,
  Avatar,
  Button,
  Carousel,
  Datepicker,
  FileInput,
  Label,
  Select,
  Textarea,
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

function EventMyPostEdit() {
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

  const handleUploadImage = () => {
    if (!file || file.length === 0) {
      setImageUploadError("Please select images");
      return;
    }

    const validFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    let invalidFiles = [];

    // Check each file for size and format
    const validFiles = Array.from(file).filter((fileItem) => {
      const isValidFormat = validFormats.includes(fileItem.type);
      const isValidSize = fileItem.size <= maxSize;

      if (!isValidFormat || !isValidSize) {
        invalidFiles.push(fileItem.name);
        return false;
      }
      return true;
    });

    // If any invalid files are found, show an error message
    if (invalidFiles.length > 0) {
      setImageUploadError(
        `The following files are invalid (must be an image under 2MB): ${invalidFiles.join(
          ", "
        )}`
      );
      return;
    }

    // Check if more than 6 valid files are selected
    const totalFiles = validFiles.length;
    const filesToUpload = totalFiles > 6 ? validFiles.slice(0, 6) : validFiles;

    if (totalFiles > 6) {
      setImageUploadError(
        `Only the first 6 images were uploaded. The last ${
          totalFiles - 6
        } images were not uploaded.`
      );
    } else {
      setImageUploadError(null);
    }

    setImageUploadProgress(0);
    const storage = getStorage(app);
    const urls = [];

    filesToUpload.forEach((fileItem) => {
      const fileName = new Date().getTime() + "-" + fileItem.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(
            "Uploading the image failed due to: " + error.message
          );
          setImageUploadProgress(null);
          return;
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          urls.push(downloadURL);

          if (urls.length === filesToUpload.length) {
            setImageUploadSuccess("Images uploaded successfully");
            setFormData((prevState) => ({
              ...prevState,
              images: urls,
            }));
            setImageUploadProgress(null);
          }
        }
      );
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((previous) => ({ ...previous, schedule: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await data.json();
      console.log(res);

      if (!res.success) {
        setError(res.message);
        setLoading(false);
        return;
      } else {
        setSuccess(true);
        // navigate("/posts");
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while creating the post");
      setLoading(false);
      return;
    }
  };

  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

      {imageUploadSuccess && (
        <Alert color="success" className="">
          {imageUploadSuccess}
        </Alert>
      )}

      {error ? (
        <Alert color="failure" className="">
          {error}
        </Alert>
      ) : success ? (
        <Alert color="success" className="">
          "Post created bro 😭✋"
        </Alert>
      ) : (
        ""
      )}
      <form
        className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700  "
        onSubmit={handleSubmit}
      >
        <div className=" p-3 flex flex-col justify-between bg-black gap-3">
          <div className="h-56  sm:h-64 xl:h-80 2xl:h-96 p-3">
            <Carousel
              slideInterval={3000}
              as={"div"}
              className="border-2 rounded-lg"
            >
              {formData.images?.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </Carousel>
          </div>

          <p>
            max 6 , other images before will be discarded because of data base
            limitation :)
          </p>
          <div className="flex gap-3">
            <FileInput
              type="file"
              accept="image/*"
              className="w-full"
              multiple
              onChange={(e) => setFile(e.target.files)}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              disabled={imageUploadProgress}
              onClick={handleUploadImage}
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
            <div className="mt-3 flex gap-3 flex-col">
              <div className="flex  gap-4 flex-col">
                <div className="flex gap-4">
                  <TextInput
                    type="text"
                    placeholder="Title"
                    required
                    id="title"
                    className="flex-1"
                    onChange={handleChange}
                  />
                  <Select id="category" onChange={handleChange}>
                    <option value="happened">Happened</option>
                    <option value="upcoming">Upcoming</option>
                  </Select>
                </div>
                {formData.category === "upcoming" ? (
                  <div className="flex gap-3 flex-col">
                    <p className="text-xl font-bold">Selected date :</p>
                    <Datepicker
                      id="schedule"
                      minDate={new Date()}
                      onSelectedDateChanged={handleDateChange} // Use the correct prop
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="">
                  <div className="mb-2 block">
                    <Label htmlFor="content" value="Your content" />
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Leave a content..."
                    required
                    rows={4}
                    onChange={handleChange}
                  />
                </div>
                <TextInput
                  type="text"
                  placeholder="External Link (optional)"
                  id="externalLink"
                  className="flex-1"
                  onChange={handleChange}
                />
              </div>
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

export default EventMyPostEdit;
