import React from "react";
import profilePic from "../../../assets/father.jpg";
import { Avatar, Button } from "flowbite-react";

function HomePage() {
  return (
    <>
      <section className=" border-b-2 border-slate-60 p-3 sm:hidden">
        <Avatar img={profilePic} rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </Avatar>
        {/* <div className="flex gap-2 justify-between items-center  ">
          <div className="">
            <p className="mb-3">Have an account ?</p>
            <Button>Log in</Button>
          </div>
          <div>
            <p className="mb-3">don't have an account ?</p>
            <Button>Create account</Button>
          </div>
        </div> */}
      </section>
    </>
  );
}

export default HomePage;
