import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  Textarea,
  Accordion,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../../../../app/user/userSlice.js";

import { FaCamera } from "react-icons/fa";

function EditProfile() {
  const [openModal, setOpenModal] = useState(false);

  const { currentUser, error, loading } = useSelector((state) => state.user);
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
    shortDescription: "",
    externalLink: "",
  });

  const [isValidLink, setIsValidLink] = useState(true);
  const [isSecureLink, setIsSecureLink] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((previous) => {
      return { ...previous, [id]: value };
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
    } else if (id === "externalLink") {
      const trimmedValue = value.trim(); // Trim spaces before validation
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}(\\/.*)?$"
      );

      if (trimmedValue === "") {
        setIsValidLink(true); // Accept empty or space-only field
        setIsSecureLink(true); // No need to check security for an empty field
      } else {
        const isValidLink = urlPattern.test(trimmedValue);
        const isSecure = trimmedValue.startsWith("https://");

        setIsValidLink(isValidLink);
        setIsSecureLink(isSecure);
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/getuser/${currentUser.user._id}`);
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setFormData(data.user);
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const conditionsMet = Object.values(passwordStrength).reduce(
    (acc, curr) => acc + (curr ? 1 : 0),
    0
  );

  const actualConditionsMet = formData.password === "" ? false : conditionsMet;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.repeatPassword) {
      dispatch(
        updateFailure("repeated password and password must be the same")
      );
      return;
    } else if (formData.password && formData.password.length < 8) {
      dispatch(
        updateFailure(
          "password must be the greater than or equal to 8 characters"
        )
      );
      return;
    } else if (
      (formData.externalLink && !isValidLink) ||
      (formData.externalLink && !isSecureLink)
    ) {
      dispatch(updateFailure("link must be secure and valid"));
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser.user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateFailure(data.message));
        return;
      } else {
        console.log(data);
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(
        updateFailure("some thing went wrong check network or " + error)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col  items-center p-2 gap-7 ">
      {error ? <div className="text-red-500 P-3">{error}</div> : ""}{" "}
      <form
        className="flex flex-col items-center sm:flex-row gap-3 justify-around relative w-full "
        onSubmit={handleSubmit}
      >
        <div className=" h-fit flex flex-col gap-3  sm:w-fit">
          <div className="border-2 p-2 border-slate-800 flex flex-col justify-center items-center gap-3">
            <div className="w-[250px] h-[250px] relative ">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt=""
                className="rounded-full object-cover"
              />
            </div>
            <FaCamera className=" text-xl " />
          </div>
          <div className="  ">
            <div className="mb-2 block">
              <Label
                htmlFor="shortDescription"
                value={`Your message: ${
                  formData.shortDescription?.length || 0
                }/200`}
              />
            </div>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Leave a short description"
              className="w-full"
              rows={4}
              onChange={handleChange}
              value={formData.shortDescription || " "}
              maxLength={200}
            />
          </div>
        </div>

        <div className=" h-fit w-fit flex flex-col gap-3">
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
                shadow
                value={formData.firstName || " "}
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
                shadow
                value={formData.lastName || " "}
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
              shadow
              value={formData.userName || " "}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="emailOrPhone" value="Email*" />
            </div>
            <TextInput
              onChange={handleChange}
              id="emailOrPhone"
              name="emailOrPhone"
              type="email"
              placeholder="Email*"
              shadow
              autoComplete="email"
              value={formData.emailOrPhone || " "}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="externalLink" value="External Link" />
            </div>
            <TextInput
              onChange={handleChange}
              id="externalLink"
              name="externalLink"
              type="externalLink"
              placeholder="External Link"
              shadow
              value={formData.externalLink || ""}
            />
            {/* Show message only if the field is not empty and the link is invalid */}
            {formData.externalLink.trim() && !isValidLink && (
              <p className="text-sm text-red-500">
                Please provide a valid link, e.g., https://resource.com
              </p>
            )}
            {/* Show warning if the link is valid but not secure */}
            {formData.externalLink.trim() && isValidLink && !isSecureLink && (
              <p className="text-sm text-yellow-500">
                Warning: This link is not secure. Use HTTPS instead.
              </p>
            )}
          </div>

          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>Update password</Accordion.Title>
              <Accordion.Content>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value=" New Password*" />
                  </div>
                  <TextInput
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                            actualConditionsMet >= 1
                              ? "bg-green-700"
                              : "bg-red-700"
                          }`}
                        ></div>
                        <div
                          className={`h-1 ${
                            actualConditionsMet >= 2
                              ? "bg-green-700"
                              : "bg-red-700"
                          }`}
                        ></div>
                        <div
                          className={`h-1 ${
                            actualConditionsMet >= 3
                              ? "bg-green-700"
                              : "bg-red-700"
                          }`}
                        ></div>
                        <div
                          className={`h-1 ${
                            actualConditionsMet >= 4
                              ? "bg-green-700"
                              : "bg-red-700"
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
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <Button
            type="submit"
            className="bg-cyan-800 w-full "
            gradientDuoTone="purpleToBlue"
            disabled={loading}
          >
            {loading ? "updating" : "update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
