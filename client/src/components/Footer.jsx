import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#408DBC] text-white  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://cdn.prod.website-files.com/6292201af07b5e3eec285411/6669c88faddc5cdc1cf73fd0_Untitled%20design(6).webp"
            alt="img"
            className="w-20 h-20 md:w-32 md:h-32"
          />
          <p>"All Good Things are wild and free"</p>
          <p>- Henry David Thoreau</p>
        </div>
        <div className="md:w-1/2 flex flex-col md:flex-row md:my-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4 font-sans">Resources</h2>
            <ul className="list-none">
              <Link to="https://www.wildandfree.us/submit-an-event-old">
                <li className="mb-2">Submit An Event</li>
              </Link>
              <Link to="https://www.wildandfree.us/contact-us">
                <li className="  ">Contact Page</li>
              </Link>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4 font-sans">About</h2>
            <ul className="list-none">
              <li className="mb-2">Follow our social media to</li>
              <li className="mb-2">get instant updates!</li>
              <li className="mb-2 flex gap-2">
                <Link>
                  <FaFacebookF />
                </Link>
                <Link>
                  {" "}
                  <FaInstagram />{" "}
                </Link>
                <Link>
                  <FaLinkedinIn />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white mt-6  w-[50%] mx-auto    pt-6">
        <p className="text-center"> Copyright © 2021 Wild&Free</p>
      </div>
    </footer>
  );
};

export default Footer;
