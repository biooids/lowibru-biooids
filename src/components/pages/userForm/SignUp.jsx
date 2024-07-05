import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="b-slate-700 min-h-screen flex flex-col justify-center items-center gap-3">
      <form className="flex max-w-md flex-col gap-4 p-3">
        <div className="flex gap-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstname" value="Your first name" />
            </div>
            <TextInput
              id="firstname"
              type="text"
              placeholder="first name"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Your last name" />
            </div>
            <TextInput
              id="lastname"
              type="email"
              placeholder="Your last name"
              required
              shadow
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput id="repeat-password" type="password" required shadow />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
      </form>
      <div>
        {" "}
        <p>
          Have an account?{" "}
          <Link to="/login" className="text-cyan-500 underline">
            Lign In
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}

export default SignUp;
