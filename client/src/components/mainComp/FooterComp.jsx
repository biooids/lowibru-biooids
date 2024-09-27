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

import {
  FaTv,
  FaGlobe,
  FaChurch,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

function FooterComp() {
  return (
    <Footer
      container
      className="bg-gray-900 text-white border-t-2 border-amber-500 p-6 pb-32"
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
                {/* <ul className="flex flex-col gap-3 lg:flex-row justify-between text-gray-400 "> */}
                <li className="hover:underline flex items-center">
                  <FaTv className="text-red-600 mr-2" />
                  <a href="https://www.ipeacetv.com/" target="_blank">
                    Peace TV
                  </a>
                </li>

                <li className="hover:underline flex items-center">
                  <FaGlobe className="text-blue-600 mr-2" />
                  <a href="https://www.upf.org/" target="_blank">
                    UPF Main Site
                  </a>
                </li>

                <li className="hover:underline flex items-center">
                  <FaChurch className="text-green-600 mr-2" />
                  <a href="https://familyfed.org/">FFWPU World</a>
                </li>

                <li className="hover:underline flex items-center">
                  <FaYoutube className="text-red-600 mr-2" />
                  <a
                    href="https://www.youtube.com/@FamilyFedMedia"
                    target="_blank"
                  >
                    YouTube
                  </a>
                </li>

                <li className="hover:underline flex items-center">
                  <FaFacebook className="text-blue-600 mr-2" />
                  <a
                    href="https://web.facebook.com/groups/tplove4/"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
                {/* </ul> */}
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
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
