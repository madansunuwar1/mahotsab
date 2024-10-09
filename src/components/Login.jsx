import React, { useState } from "react";
import { Button } from ".";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/authSlice";
import { notification } from "antd";
import api from "../utils/api";

function AuthForm({ isLogin, heading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    user: {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
    },
    person: {
      name: "",
      organization: "",
      phone: "",
      permanent_place: "",
      permanent_address: "",
      current_place: "",
      current_address: "",
      id_no: "",
    },
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e, section) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [id]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { user, person } = formData;

    // User Validation
    if (!user.username) errors.username = "प्रयोगकर्ता नाम आवश्यक छ";
    if (!user.email) errors.email = "इमेल आवश्यक छ";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      errors.email = "इमेल ठेगाना अमान्य छ";
    if (!user.password) errors.password = "पासवर्ड आवश्यक छ";
    if (user.password !== user.confirm_password)
      errors.confirm_password = "पासवर्डहरू मेल खाँदैनन्";

    // Person Validation
    if (!person.name) errors.name = "नाम आवश्यक छ";
    if (!person.organization) errors.organization = "संगठन आवश्यक छ";
    if (!person.phone) errors.phone = "फोन नम्बर आवश्यक छ";
    else if (!/^\d{10}$/.test(person.phone))
      errors.phone = "फोन नम्बर १० अंकको हुनुपर्छ";
    if (!person.permanent_place)
      errors.permanent_place = "स्थायी स्थान आवश्यक छ";
    if (!person.permanent_address)
      errors.permanent_address = "स्थायी ठेगाना आवश्यक छ";
    if (!person.current_place) errors.current_place = "हालको स्थान आवश्यक छ";
    if (!person.current_address)
      errors.current_address = "हालको ठेगाना आवश्यक छ";
    if (!person.id_no) errors.id_no = "आईडी नम्बर आवश्यक छ";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        login(formData.user.email, formData.user.password)
      );

      if (resultAction.type === "login/fulfilled") {
        notification.success({
          message: "लगइन सफल",
          description: "तपाईं सफलतापूर्वक लगइन गर्नुभयो।",
          placement: "topRight",
        });
        navigate("/dashboard");
      } else {
        console.error("लगइन असफल:", resultAction.payload || resultAction.error);
      }
    } catch (err) {
      console.error("लगइन गर्दा त्रुटि भयो:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { user, person } = formData;

      const payload = {
        user: {
          username: user.username,
          password: user.password,
          confirm_password: user.confirm_password,
          email: user.email,
        },
        person: {
          name: person.name,
          organization: person.organization,
          phone: person.phone,
          permanent_place: person.permanent_place,
          permanent_address: person.permanent_address,
          current_place: person.current_place,
          current_address: person.current_address,
          id_no: person.id_no,
        },
      };

      const resultAction = null;
      api
        .post("/v1/user-mgmt/register-farmer/", payload)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      if (resultAction.type === "register/fulfilled") {
        console.log("दर्ता सफल");
        navigate("/dashboard");
      } else {
        console.error(
          "दर्ता असफल:",
          resultAction.payload || resultAction.error
        );
      }
    } catch (err) {
      console.error("दर्ता गर्दा त्रुटि भयो:", err);
    }
  };

  return (
    <section className="container py-4 md:py-16">
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {isLogin ? (
          <>
            <div className="p-8 mx-auto bg-gray-100 rounded-lg md:w-1/3">
              <h3 className="pb-5 text-3xl font-semibold text-left font-suse">
                {heading}
              </h3>
              {/* Login Form */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                  htmlFor="email"
                >
                  इमेल
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                  placeholder="आफ्नो इमेल प्रविष्ट गर्नुहोस्"
                  value={formData.user.email}
                  onChange={(e) => handleInputChange(e, "user")}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                  htmlFor="password"
                >
                  पासवर्ड
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                  placeholder="आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्"
                  value={formData.user.password}
                  onChange={(e) => handleInputChange(e, "user")}
                />
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-center">
                <Button
                  text={loading ? "लगइन गर्दै..." : "लगइन"}
                  type="submit"
                />
              </div>
              <p className="py-4 flex-center before:content-[''] before:block before:w-full before:h-[1px] before:bg-gray-400 before:mr-4 after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-400 after:ml-4">
                वा
              </p>
              <div className="flex justify-center">
                <Link className="w-full" to="/register">
                  <Button text="दर्ता गर्नुहोस्" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-8 mx-auto bg-gray-100 rounded-lg">
              <h3 className="pb-5 text-3xl font-semibold text-left font-suse">
                {heading}
              </h3>
              {/* Registration Form */}
              <h4 className="pb-3 my-5 text-2xl font-semibold text-left text-green-900 font-suse">
                प्रयोगकर्ता जानकारी
              </h4>

              {/* User Fields */}
              <div className={"flex flex-wrap"}>
                <div className={"w-full md:w-1/2 mb-4 px-4"}>
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="username"
                  >
                    प्रयोगकर्ता नाम
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्"
                    value={formData.user.username}
                    onChange={(e) => handleInputChange(e, "user")}
                  />
                  {formErrors.username && (
                    <p className="text-sm text-red-500">
                      {formErrors.username}
                    </p>
                  )}
                </div>
                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="email"
                  >
                    इमेल
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो इमेल प्रविष्ट गर्नुहोस्"
                    value={formData.user.email}
                    onChange={(e) => handleInputChange(e, "user")}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="password"
                  >
                    पासवर्ड
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्"
                    value={formData.user.password}
                    onChange={(e) => handleInputChange(e, "user")}
                  />
                  {formErrors.password && (
                    <p className="text-sm text-red-500">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="confirm_password"
                  >
                    पासवर्ड पुष्टि गर्नुहोस्
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="पासवर्ड पुनः प्रविष्ट गर्नुहोस्"
                    value={formData.user.confirm_password}
                    onChange={(e) => handleInputChange(e, "user")}
                  />
                  {formErrors.confirm_password && (
                    <p className="text-sm text-red-500">
                      {formErrors.confirm_password}
                    </p>
                  )}
                </div>
              </div>

              <h4 className="pb-3 my-8 text-2xl font-semibold text-left text-green-900 font-suse">
                व्यक्तिगत जानकारी
              </h4>

              {/* Person Fields */}
              <div className={"flex flex-wrap"}>
                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="name"
                  >
                    नाम
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो नाम प्रविष्ट गर्नुहोस्"
                    value={formData.person.name}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="organization"
                  >
                    संगठन आईडी
                  </label>
                  <input
                    type="number"
                    id="organization"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="संगठन आईडी प्रविष्ट गर्नुहोस्"
                    value={formData.person.organization}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.organization && (
                    <p className="text-sm text-red-500">
                      {formErrors.organization}
                    </p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="phone"
                  >
                    फोन नम्बर
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो फोन नम्बर प्रविष्ट गर्नुहोस्"
                    value={formData.person.phone}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                {/* Repeat similar blocks for other fields */}
                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="permanent_place"
                  >
                    स्थायी स्थान
                  </label>
                  <input
                    type="number"
                    id="permanent_place"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="स्थायी स्थान प्रविष्ट गर्नुहोस्"
                    value={formData.person.permanent_place}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.permanent_place && (
                    <p className="text-sm text-red-500">
                      {formErrors.permanent_place}
                    </p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="permanent_address"
                  >
                    स्थायी ठेगाना
                  </label>
                  <input
                    type="text"
                    id="permanent_address"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="स्थायी ठेगाना प्रविष्ट गर्नुहोस्"
                    value={formData.person.permanent_address}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.permanent_address && (
                    <p className="text-sm text-red-500">
                      {formErrors.permanent_address}
                    </p>
                  )}
                </div>

                {/* Add fields for current_place, current_address, id_no */}
                {/* ... similar to above fields */}

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="current_place"
                  >
                    हालको स्थान
                  </label>
                  <input
                    type="number"
                    id="current_place"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="हालको स्थान प्रविष्ट गर्नुहोस्"
                    value={formData.person.current_place}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.current_place && (
                    <p className="text-sm text-red-500">
                      {formErrors.current_place}
                    </p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="current_address"
                  >
                    हालको ठेगाना
                  </label>
                  <input
                    type="text"
                    id="current_address"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="हालको ठेगाना प्रविष्ट गर्नुहोस्"
                    value={formData.person.current_address}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.current_address && (
                    <p className="text-sm text-red-500">
                      {formErrors.current_address}
                    </p>
                  )}
                </div>

                <div className="w-full px-4 mb-4 md:w-1/2">
                  <label
                    className="block mb-2 text-sm font-bold text-left text-gray-700 font-suse"
                    htmlFor="id_no"
                  >
                    आईडी नम्बर
                  </label>
                  <input
                    type="text"
                    id="id_no"
                    className="w-full font-suse px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
                    placeholder="आफ्नो आईडी नम्बर प्रविष्ट गर्नुहोस्"
                    value={formData.person.id_no}
                    onChange={(e) => handleInputChange(e, "person")}
                  />
                  {formErrors.id_no && (
                    <p className="text-sm text-red-500">{formErrors.id_no}</p>
                  )}
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-center mt-8">
                <Button
                  text={loading ? "दर्ता गर्दै..." : "दर्ता गर्नुहोस्"}
                  faCode="fa-sign-in-alt"
                  type="submit"
                />
              </div>
              <p className="py-4 flex-center font-suse">
                पहिले नै खाता छ?
                <Link className="underline ms-1 text-emerald-800" to="/login">
                  लगइन गर्नुहोस्
                </Link>
              </p>
            </div>
          </>
        )}
      </form>
    </section>
  );
}

export default AuthForm;
