import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ text, faCode, isHeader, onClick, type = "button" }) {
  return (
    <button
      type={type} // Ensures it can be a 'button' or 'submit' for forms
      onClick={onClick} // Handles click events
      className={`px-4 md:px-6 py-2.5 w-full md:w-fit mx-auto rounded-md hover:cursor-pointer flex-center ${
        isHeader
          ? "border-2 border-white text-white"
          : "bg-[#45730A] text-white"
      }`}
    >
      {faCode && <FontAwesomeIcon className="me-3" icon={faCode} />}
      <h3 className={`inline font-suse font-semibold`}>{text}</h3>
    </button>
  );
}

export default Button;
