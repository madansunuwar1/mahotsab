import React from "react";
import { Button } from "../components";
import profile from "../assets/images/profile.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faFile,
  faPenToSquare,
  faUser,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Profile({ heading, items, title }) {
  return (
    <section className="container text-left mt-16">
      {heading && (
        <h3 className="text-2xl font-semibold w-fit mb-4">{heading}</h3>
      )}
      <div className="flex gap-6">
        <div className="bg-lime-100 w-2/6 h-fit rounded-lg">
          <div className="p-4 text-md">
            <div className="flex-center w-fit px-3 py-1 mb-3">
              <img
                className="w-14 rounded-l-xl pe-3 py-1"
                src={profile}
                alt={title}
              />
              <h3 className="text-xl font-semibold">Firstname Lastname</h3>
            </div>
            <hr />
            <div className="mt-4">
              <h4 className="text-sm text-slate-600 mb-4">MENU</h4>
              <Link className="text-left" to="/profile">
                <h4 className="p-2">
                  <FontAwesomeIcon className="me-1" icon={faHouse} /> Dashboard
                </h4>
              </Link>
              <Link className="text-left" to="/profile">
                <h4 className="p-2">
                  <FontAwesomeIcon className="me-1" icon={faCartShopping} />
                  Orders
                </h4>
              </Link>
              <Link className="text-left" to="/profile">
                <h4 className="p-2 ps-3">
                  <FontAwesomeIcon className="me-1" icon={faFile} />
                  History
                </h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white w-4/6 rounded-lg">
          <div className="flex justify-between px-8 pt-8 text-md">
            <div className="bg-lime-100 flex justify-between items-center px-4 py-3 p-2 rounded-md w-full">
              <div className="flex-center">
                <img
                  className="w-14 rounded-l-xl pe-3 py-1"
                  src={profile}
                  alt={title}
                />
                <h3 className="text-xl font-semibold">Firstname Lastname</h3>
              </div>
              <Link to="/profile">
                <Button text="Edit" faCode={faPenToSquare}></Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between px-8 pt-4 pb-8 text-md">
            <div className="bg-lime-100 px-5 py-4 rounded-md w-full">
              <div className="flex">
                <h3 className="text-xl font-semibold">Personal Information</h3>
              </div>
              <div className="py-4 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-2">
                <h5 className="py-1">
                  <FontAwesomeIcon className="me-2" icon={faUser} />
                  First Name : Ram
                </h5>
                <h5 className="py-1">
                  <FontAwesomeIcon className="me-2" icon={faUser} />
                  Last Name : Nepali
                </h5>
                <h5 className="py-1">
                  <FontAwesomeIcon className="me-2" icon={faPhone} />
                  Phone: 9876543210
                </h5>
                <h5 className="py-1">
                  <FontAwesomeIcon className="me-2" icon={faEnvelope} />
                  Email: 9876543210
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
