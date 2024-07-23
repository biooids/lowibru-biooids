import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="b-slate-700 min-h-screen flex flex-col justify-center items-center gap-3">
      <form className="flex max-w-md flex-col gap-4 p-3 bg-black w-[300px]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required
            shadow
            placeholder="8 min character "
          />
          <div className="flex gap-2 justify-start items-center mt-3">
            <Checkbox id="agree" />
            <p>show password</p>
          </div>
        </div>
        <Link to="/signup" className="text-cyan-500 underline ">
          forgot password
        </Link>

        <Button type="submit">Register new account</Button>
      </form>
      <div>
        {" "}
        <p>
          Have an account?{" "}
          <Link to="/signup" className="text-cyan-500 underline">
            Sign Up
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}

export default LogIn;
