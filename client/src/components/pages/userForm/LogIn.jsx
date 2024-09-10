import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { HiOutlineExclamationCircle } from "react-icons/hi";

import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../../../app/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
function LogIn() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const errorMessage = String(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((previous) => ({ ...previous, [id]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(logInStart());
      const res = await fetch("/api/auth/login", {
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
        dispatch(logInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure("some thing went wrong"));
      setOpenModal(true);
      return;
    }
  };
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-3">
      <div>
        <p>
          Don't Have an account?{" "}
          <Link to="/signup" className="text-cyan-500 underline">
            Sign Up
          </Link>
        </p>
      </div>

      <form
        className="flex max-w-md flex-col gap-4 p-3  w-[300px]"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="emailOrPhone" value="Email*" />
          </div>
          <TextInput
            onChange={handleChange}
            name="emailOrPhone"
            id="emailOrPhone"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            onChange={handleChange}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            required
            shadow
            placeholder="8 min characters"
          />
          <div className="flex gap-2 justify-start items-center mt-3">
            <Checkbox
              id="showPassword"
              name="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <p>show password</p>
          </div>
        </div>
        <Link to="/forgot-password" className="text-cyan-500 underline">
          forgot password
        </Link>

        <Button type="submit" disabled={loading}>
          {loading ? "submitting" : "Log In"}
        </Button>
      </form>

      <div>
        {" "}
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

export default LogIn;
