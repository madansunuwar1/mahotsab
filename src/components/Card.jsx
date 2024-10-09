import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Card({ image, title, maxQty, price, seller, stockId }) {
  const handlePhoneClick = () => {
    window.location.href = "tel:9876543210";
  };

  return (
    <Link
      key={stockId}
      to={`/product/${stockId}`}
      className="flex flex-col justify-between w-full rounded-xl relative shadow-lg hover:shadow-lg border bg-white hover:-translate-y-2 transition duration-150"
    >
      <div className="p-2 text-left">
        <img
          className="w-full h-28 md:h-36 object-cover rounded-xl"
          src={image}
          alt={title}
        />
        <h5 className="text-xl font-semibold mt-3 mx-2">{title}</h5>
        <p className="m-2 hidden md:block">
          <span className="text-slate-600 text-ms">
            उपलब्ध मात्रा : {maxQty} केजी
          </span>
        </p>
        <p className="m-2">बिक्रेता : {seller}</p>
      </div>
      <div className="flex justify-between items-center px-4 py-3 text-left bg-lime-100 rounded-b-xl bottom-0">
        <p>
          <span className="text-lime-800 text-lg md:text-2xl">{price}</span>
        </p>
        <button
          onClick={handlePhoneClick}
          className="relative border px-2.5 py-1 rounded-lg bg-[#45730A] text-white hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-sm md:text-md" icon={faPhone} />
        </button>
      </div>
    </Link>
  );
}

export default Card;
