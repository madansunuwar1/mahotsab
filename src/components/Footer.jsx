import React from "react";
import municipalityLogo from "../assets/images/mun.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from ".";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white pt-6 sm:pt-8 pb-6 sm:pb-6 flex-center bg-[#45730A]">
      <div className="container">
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-4 sm:col-span-1 md:col-span-2 me-8 flex gap-4">
            <img
              className="w-16 sm:w-24 h-16 sm:h-24"
              src={municipalityLogo}
              alt=""
            />
            <div className="h-fit mt-1">
              <h4 className="text-3xl font-medium font-suse mb-2">
                सुनकोशी गाउँपालिका
              </h4>
              <h3 className="text-base">
                बागमती प्रदेश "हामी सबैको शान, समृद्ध सुनकोशी हाम्रो अभियान"
              </h3>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <div className="mt-4 sm:mt-0 sm:ms-auto w-3/5 text-start">
              <h4 className="text-lg font-semibold font-suse mb-2">
                साइट लिङ्कहरू
              </h4>
              <ul className="list-none font-suse">
                <li className="py-1 px-1 md:mb-0.5">
                  <Link to="/">गृहपृष्ठ</Link>
                </li>
                <li className="py-1 px-1">
                  <Link to="/about">हाम्रो बारेमा</Link>
                </li>
                <li className="py-1 px-1">
                  <Link to="/contact">सम्पर्क</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <div className="mt-4 sm:mt-0 text-start sm:mx-auto sm:w-3/4">
              <h4 className="text-lg font-semibold font-suse mb-2 ps-2">
                सम्पर्क
              </h4>
              <ul className="list-none font-suse">
                <li className="py-1 px-2 md:px-3 md:mb-0.5">
                  <FontAwesomeIcon
                    className="me-2 text-[#F0D95D]"
                    icon={faAddressBook}
                  />
                  पालि गाउँ, सुनकोशी
                </li>
                <li className="py-1 px-2 md:px-3">
                  <FontAwesomeIcon
                    className="me-2 text-[#F0D95D]"
                    icon={faPhone}
                  />
                  <a href="tel:9876543210">९८७६५४३२१०</a>
                </li>
                <li className="py-1 px-2 md:px-3">
                  <FontAwesomeIcon
                    className="me-2 text-[#F0D95D]"
                    icon={faEnvelope}
                  />
                  <a href="mailto:mail@email.com">mail@email.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mt-2 sm:mt-0 sm:w-3/4">
              <h4 className="text-lg font-semibold font-suse mb-2 text-left">
                सामाजिक सञ्जाल
              </h4>
              <Icon isFooter={true} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
