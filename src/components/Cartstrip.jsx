import React from "react";
import { QuantitySelector } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Cartstrip({ isCart, image, title, price, quantity, status }) {
  return (
    <div className="flex-center border-b last:border-0 group relative hover:shadow h-28 px-6">
      <div className="w-2/5 flex items-center text-left bg-white">
        <img
          className="rounded-l-xl pe-3 py-1 bg-white"
          src={image}
          alt={title}
        />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="w-1/5">
        <span className="text-lime-600 font-bold">रु. {price}</span>
      </p>
      <div className="w-1/5">
        {isCart ? (
          <QuantitySelector isCart={true} />
        ) : (
          <p className="ps-9">
            <span className="text-lime-600 font-bold">{quantity}</span>
          </p>
        )}
      </div>
      <p className={`w-1/5 font-semibold ${isCart ? "" : "text-center"} ps-2`}>
        <span className="text-lime-600 font-bold">रु. १०००</span>
      </p>
      {isCart ? (
        <button className="absolute right-6 bg-lime-600 p-1 leading-3 w-7 h-7 rounded-full text-xs text-white">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : (
        <p className="w-1/5 font-semibold text-center">
          <span className="text-lime-600 font-bold">{status}</span>
        </p>
      )}
    </div>
  );
}

export default Cartstrip;
