import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../../../app/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function ForgotPassword() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const errorMessage = String(error);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((previous) => ({ ...previous, [id]: value.trim() }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(logInStart());
      const res = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (!data.success) {
        dispatch(logInFailure(data.message));
        setOpenModal(true);
        return;
      } else if (data.success) {
        setShowMessage(true);
        dispatch(logInSuccess());
      }
    } catch (error) {
      dispatch(logInFailure("some thing went wrong"));
      setOpenModal(true);
      return;
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div className="w-[300px]">
        {showMessage ? (
          <div className="flex flex-col gap-3">
            <p>
              A new password have been sent to your email. PLEASE use it to log
              in and change password emediately
            </p>
            <Link to="/login">
              <Button className="w-full">Log in</Button>
            </Link>
            <p className=" text-xs">
              Didn't get an email ? wait a few seconds or Verify again or click{" "}
              <Link to="/signup">
                <span className="text-purple-500 text-sm underline">Here</span>
              </Link>{" "}
              to ask for help
            </p>
          </div>
        ) : (
          ""
        )}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="emailOrPhone" value="Enter your Email*" />
            </div>
            <TextInput
              onChange={handleChange}
              id="emailOrPhone"
              name="emailOrPhone"
              type="text"
              placeholder="Email or Phone*"
              required
              shadow
              autoComplete="email"
            />
          </div>

          <Button
            type="submit"
            className="bg-cyan-800"
            gradientDuoTone="purpleToPink"
          >
            {loading ? "verifying" : "Verify"}
          </Button>
        </form>
      </div>
      <div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {errorMessage}
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  close
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ForgotPassword;
