import React from "react";
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
import { FaCamera } from "react-icons/fa";

function EditProfile() {
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

  const handleChange = (e) => {};
  const conditionsMet = Object.values(passwordStrength).reduce(
    (acc, curr) => acc + (curr ? 1 : 0),
    0
  );
  const actualConditionsMet = formData.password === "" ? false : conditionsMet;

  const handleSubmit = () => {};
  return (
    <div className="min-h-screen flex flex-col  items-center p-2 gap-7 ">
      {" "}
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
              <Label htmlFor="comment" value="Your message: 0/2000" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a message..."
              required
              className="w-full"
              rows={4}
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
            <div className="mb-2 block">
              <Label htmlFor="emailOrPhone" value="Email*" />
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

          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>Update password</Accordion.Title>
              <Accordion.Content>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="oldPassword" value="Old password" />
                  </div>
                  <TextInput
                    onChange={handleChange}
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    required
                    shadow
                    autoComplete="Old-password"
                  />
                  <div className="flex gap-2 justify-start items-center mt-3">
                    <Checkbox
                      id="showPassword"
                      name="showPassword"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <p>Show password</p>
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value=" New Password*" />
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
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </form>
      <Button
        type="submit"
        className="bg-cyan-800 w-full sm:w-[300px]"
        gradientDuoTone="purpleToBlue"
        disabled={loading}
      >
        {loading ? "submitting" : "update"}
      </Button>
    </div>
  );
}

export default EditProfile;
