import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import OAuth from "./OAuth.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../../../app/user/userSlice.js";
function SignUp() {
  const [openModal, setOpenModal] = useState(false);

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const errorMessage = String(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    specialCharacter: false,
    number: false,
    matching: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailOrPhone: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((previous) => {
      return { ...previous, [id]: value.trim() };
    });

    if (id === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        number: /\d/.test(value),
        specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
        matching: formData.repeatPassword === value,
      });
    } else if (id === "repeatPassword") {
      setPasswordStrength((previous) => {
        return {
          ...previous,
          matching: formData.password === value,
        };
      });
    }
  };
  const conditionsMet = Object.values(passwordStrength).reduce(
    (acc, curr) => acc + (curr ? 1 : 0),
    0
  );

  const actualConditionsMet = formData.password === "" ? false : conditionsMet;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      dispatch(
        signUpFailure("repeated password and password must be the same")
      );
      setOpenModal(true);
      return;
    } else if (formData.password.length < 8) {
      dispatch(
        signUpFailure(
          "password must be the greater than or equal to 8 characters"
        )
      );
      setOpenModal(true);
      return;
    }
    try {
      dispatch(signUpStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        dispatch(signUpFailure(data.message));
        setOpenModal(true);
        return;
      } else if (data.success) {
        dispatch(signUpSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("this error happened error", error);
      dispatch(
        signUpFailure(
          "something went wrong, You can check your internet connection"
        )
      );
      setOpenModal(true);
      return;
    }
  };

  return (
    <div className="b-slate-700 min-h-screen flex flex-col justify-center items-center gap-4 pt-10">
      <div>
        <p>
          Do you have an account?{" "}
          <Link to="/login" className="text-cyan-500 underline">
            Log In
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-1">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value=" First name* " />
              </div>
              <TextInput
                onChange={handleChange}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name*"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value=" Last name*" />
              </div>
              <TextInput
                onChange={handleChange}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name*"
                required
                shadow
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userName" value=" User name*" />
            </div>
            <TextInput
              onChange={handleChange}
              id="userName"
              name="userName"
              type="text"
              placeholder="User Name*"
              autoComplete="userName"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 flex gap-3  items-center">
              <Label htmlFor="emailOrPhone" value="Email*" />
              <p className="text-xs text-red-500">Please be accurate</p>
            </div>
            <TextInput
              onChange={handleChange}
              id="emailOrPhone"
              name="emailOrPhone"
              type="email"
              placeholder="Email*"
              required
              shadow
              autoComplete="email"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value=" Password*" />
            </div>
            <TextInput
              onChange={handleChange}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              shadow
              placeholder="8 min characters*"
              autoComplete="new-password"
            />

            <div>
              <div className="flex gap-2 justify-start items-center mt-3">
                <Checkbox
                  id="showPassword"
                  name="showPassword"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <p>Show password</p>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <div className="grid grid-cols-4 gap-1 bg-slate-800">
                  <div
                    className={`h-1 ${
                      actualConditionsMet >= 1 ? "bg-green-700" : "bg-red-700"
                    }`}
                  ></div>
                  <div
                    className={`h-1 ${
                      actualConditionsMet >= 2 ? "bg-green-700" : "bg-red-700"
                    }`}
                  ></div>
                  <div
                    className={`h-1 ${
                      actualConditionsMet >= 3 ? "bg-green-700" : "bg-red-700"
                    }`}
                  ></div>
                  <div
                    className={`h-1 ${
                      actualConditionsMet >= 4 ? "bg-green-700" : "bg-red-700"
                    }`}
                  ></div>
                </div>
                <p>Password Strength :</p>

                <ul className="text-xs">
                  <li
                    className={
                      passwordStrength.length
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    8 min characters*
                  </li>
                  <li
                    className={
                      passwordStrength.number
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    At least one number
                  </li>
                  <li
                    className={
                      passwordStrength.specialCharacter
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeatPassword" value="Repeat password" />
            </div>
            <TextInput
              onChange={handleChange}
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              required
              shadow
              autoComplete="new-password"
            />
            <p
              className={`mt-3 text-sm ${
                passwordStrength.matching
                  ? "text-green-500"
                  : "text-red-500 text-sm"
              }`}
            >
              Password match
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agreeTerms" name="agreeTerms" required />
            <Label htmlFor="agreeTerms" className="flex">
              I agree with the&nbsp;
            </Label>
            <Link
              to="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-cyan-800"
            gradientDuoTone="purpleToBlue"
            disabled={loading}
          >
            {loading ? "submitting" : "Register"}
          </Button>
        </form>

        <p>Or register with Google if applicable</p>
        <OAuth />
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
                {errorMessage.includes("userName") ? (
                  "This username exists. Change username."
                ) : errorMessage.includes("emailOrPhone") ? (
                  <>
                    This email or phone exists.{" "}
                    <Link className="underline" to="/login">
                      Log In.
                    </Link>
                  </>
                ) : (
                  errorMessage
                )}
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

export default SignUp;
