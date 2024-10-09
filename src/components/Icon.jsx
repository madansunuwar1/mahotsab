import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faViber,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Icon({ isFooter }) {
  return (
    <ul className="list-none flex items-center gap-2 text-lg">
      {isFooter ? (
        <>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2 rounded-full hover:bg-[#1877F2] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#1877F2]"
            }`}
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </li>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2  rounded-full hover:bg-[#E4405F] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#E4405F]"
            }`}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2 rounded-full hover:bg-[#FF0000] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#FF0000]"
            }`}
          >
            <FontAwesomeIcon icon={faYoutube} />
          </li>
        </>
      ) : (
        <>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2 rounded-full hover:bg-[#45730A] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#45730A]"
            }`}
          >
            <FontAwesomeIcon icon={faPhone} />
          </li>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2 rounded-full hover:bg-[#7360F2] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#7360F2]"
            }`}
          >
            <FontAwesomeIcon icon={faViber} />
          </li>
          <li
            className={`flex-center w-8 md:w-10 h-8 md:h-10 border-2 rounded-full hover:bg-[#075E54] hover:text-white hover:cursor-pointer text-sm md:text-lg ${
              isFooter ? "border-white" : "border-[#075E54]"
            }`}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Icon;
