import React, { useState, useEffect } from "react";
import municipalityLogo from "../assets/images/mun.png";
import nepalLogo from "../assets/images/nepal.png";
import nepalFlag from "../assets/images/nepal-flag.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBars,
  faXmark,
  faShop,
  faBagShopping,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from ".";
import { Link } from "react-router-dom";
import menuImage from "../assets/images/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCategories } from "../redux/vegetableSlice";

function Header({ isSticky }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll when nav is open
    } else {
      document.body.style.overflow = ""; // Restore scroll
    }

    return () => {
      document.body.style.overflow = ""; // Reset scroll when component unmounts
    };
  }, [isNavOpen]);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.vegetable.vegetables);
  useEffect(() => {
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  return (
    <header className="text-black shadow">
      <div className="container px-2 md:px-4 py-3">
        <div className="flex justify-between">
          <div className="flex-center gap-12 md:me-8 w-2/3 md:w-auto">
            <Link className="flex items-center" to="/">
              <div className="text-left ms-2 md:ms-4 text-[#b83955] w-fit">
                <h2 className="text-sm md:text-2xl">हाम्रो</h2>
                <h4 className="text-xs md:text-lg">महोत्सब</h4>
              </div>
            </Link>
          </div>
          <div className="flex-center gap-3 md:gap-5 w-1/3 md:w-auto">
            <Link to="/">
              <img className="w-16 md:w-20" src={nepalLogo} alt="Logo" />
            </Link>
            <Link to="/">
              <img className="w-10 md:w-12" src={nepalFlag} alt="Nepal Flag" />
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom header that will become sticky */}
      <div
        className={`bottom-header bg-[#45730A] transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-md" : "relative"
        }`}
      >
        <div className="container px-2 md:px-4 py-3">
          <div className="flex justify-between">
            <div className="flex-center md:gap-12 md:me-8">
              <nav
                className={`${
                  isNavOpen
                    ? "right-0 translate-x-0"
                    : "left-0 translate-x-full md:translate-x-0"
                } md:block fixed md:relative top-0 bg-white md:bg-transparent md:left-0 border-t border-[#45730A] md:border-none md:text-white w-full md:w-auto z-10 transition-transform duration-500 h-full md:h-fit z-50`}
              >
                <ul className="flex flex-col md:flex-row md:gap-2 list-none p-4 md:p-0">
                  <li className="hidden md:block py-3 md:py-4 px-3 group">
                    <Link
                      className="font-semibold hover:text-[#fff7cb] group-hover:border-b-2 border-white"
                      to="/"
                    >
                      गृहपृष्ठ
                    </Link>
                  </li>
                  <li className="relative py-3 md:py-4 px-3 group">
                    <Link
                      className="hidden md:inline font-semibold hover:text-[#fff7cb] group-hover:border-b-2 border-white"
                      to="/products"
                    >
                      उत्पादनहरू
                    </Link>

                    <ul
                      className={`md:hidden md:group-hover:flex absolute top-5 md:top-12 left-0 bg-white md:border rounded-md w-full md:w-[500px] ps-3 pe-2 py-2`}
                    >
                      <div className="me-1.5 md:grid md:grid-cols-2 w-2/3">
                        {categories?.map((category) => (
                          <li key={category.id} className="relative group">
                            <Link
                              className="block w-full p-1.5 font-semibold hover:bg-[#6FAE14] hover:text-white text-black rounded-md"
                              to={`/products/${category.id}`}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                      <div className="hidden md:block w-1/3">
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={menuImage}
                          alt=""
                        />
                      </div>
                    </ul>
                  </li>
                  <li className="hidden md:inline relative py-3 md:py-4 px-3 group">
                    <Link className="font-semibold hover:text-[#fff7cb] group-hover:border-b-2 border-white">
                      हाम्रो बारेमा
                    </Link>
                    <ul className="hidden group-hover:block absolute top-12 left-0 bg-white border rounded-md w-48 p-1.5">
                      <li className="relative group">
                        <Link
                          className="block w-full p-1.5 font-semibold hover:bg-[#6FAE14] hover:text-white text-black rounded-md"
                          to="/about"
                        >
                          परिचय
                        </Link>
                      </li>
                      <li className="relative group">
                        <Link
                          className="block w-full p-1.5 font-semibold hover:bg-[#6FAE14] hover:text-white text-black rounded-md"
                          to="/message"
                        >
                          अध्यक्षको सन्देश
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <FontAwesomeIcon
                  className="text-black text-xl md:hidden cursor-pointer absolute top-3 right-4"
                  icon={faXmark}
                  onClick={handleNavToggle}
                />
              </nav>
            </div>
            <div className="flex justify-between items-center md:flex-center gap-3 w-full md:w-3/5 px-1.5 md:px-0">
              <div className="w-full rounded-md text-left px-3 md:px-4 flex items-center hover:cursor-pointer transition-border duration-300 ease-in-out border border-white bg-white">
                <input
                  type="text"
                  id="name"
                  className="ms-3 py-1 md:py-2.5 w-full font-semibold p-0 border-0 focus:outline-0 focus:ring-0 bg-transparent transition-width duration-300 ease-in-out opacity-100 visible"
                  placeholder="यहाँ खोज्नुहोस् ...."
                />
                <FontAwesomeIcon
                  className="text-[#45730A]"
                  icon={faMagnifyingGlass}
                />
              </div>

              <Link className="font-semibold w-40 hidden md:block" to="/login">
                <Button
                  faCode={faUser}
                  text="लगइन"
                  isHeader={true}
                  color="black"
                />
              </Link>
              <FontAwesomeIcon
                className="text-xl md:hidden cursor-pointer text-white"
                icon={faBars}
                onClick={handleNavToggle}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full md:hidden text-black shadow z-40">
        <div className={`bg-[#45730A] transition-all duration-300`}>
          <div className="container px-4 pt-3 pb-1.5">
            <div className="flex justify-between">
              <div className="flex justify-between items-center md:flex-center gap-3 w-full md:w-3/5 px-1.5 md:px-0">
                <Link
                  className="font-semibold w-fit text-white flex-center flex-col"
                  to="/"
                >
                  <FontAwesomeIcon className="" icon={faShop} />
                  <p>Home</p>
                </Link>
                <Link
                  className="font-semibold w-fit text-white flex-center flex-col"
                  onClick={handleNavToggle}
                >
                  <FontAwesomeIcon icon={faBagShopping} />
                  <p>Categories</p>
                </Link>
                <Link
                  className="font-semibold w-fit text-white flex-center flex-col"
                  to="/contact"
                >
                  <FontAwesomeIcon className="" icon={faAddressBook} />
                  <p>Inquiry</p>
                </Link>
                <Link
                  className="font-semibold w-fit text-white flex-center flex-col"
                  to="/login"
                >
                  <FontAwesomeIcon className="" icon={faUser} />
                  <p>Profile</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
