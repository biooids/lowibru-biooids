"use client";

import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../../assets/ffwpu.png";

function FooterComp() {
  return (
    <Footer
      container
      className="bg-gray-900 text-white border-t-2 border-amber-500 p-6"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="mb-4 text-center">
            <Footer.Brand
              href="https://flowbite.com"
              src={logo}
              alt="FFWPU Logo"
              name="FFWPU"
            />
            {/* Sugar Words */}
            <p className="mt-2 text-sm text-gray-400">
              Welcome to FFWPU – A global community striving for unity, peace,
              and love. Discover, connect, and grow with us.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {/* Important Links Section */}
            <div>
              <Footer.Title
                title="Important Links"
                className="text-amber-500"
              />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Home</Footer.Link>
                <Footer.Link href="/myprofile">Update Profile</Footer.Link>
                <Footer.Link href="/events">Events</Footer.Link>
                <Footer.Link href="/flicks">Flicks</Footer.Link>
                <Footer.Link href="/lectures">Lectures</Footer.Link>
                <Footer.Link href="/market">Market</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Trusted Resources Section */}
            <div>
              <Footer.Title
                title="Trusted Resources"
                className="text-amber-500"
              />
              <Footer.LinkGroup col>
                <a href="#" className="hover:text-amber-500">
                  Resource 1
                </a>
                <a href="#" className="hover:text-amber-500">
                  Resource 2
                </a>
                <a href="#" className="hover:text-amber-500">
                  Resource 3
                </a>
                <a href="#" className="hover:text-amber-500">
                  Resource 4
                </a>
                <a href="#" className="hover:text-amber-500">
                  Resource 5
                </a>
                <a href="#" className="hover:text-amber-500">
                  Resource 6
                </a>
              </Footer.LinkGroup>
            </div>
            {/* Legal Section */}
            <div>
              <Footer.Title title="Legal" className="text-amber-500" />
              <Footer.LinkGroup col>
                <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="my-4 border-amber-500" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="FFWPU™"
            year={new Date().getFullYear()}
            className="text-gray-500"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
