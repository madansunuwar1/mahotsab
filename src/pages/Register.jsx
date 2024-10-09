import React, { useState } from "react";
import "../App.css";
import { Header, Login, Footer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../redux/authSlice";
import { notification } from "antd";

function RegisterPage() {
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
    if (!user.username) errors.username = "Username is required";
    if (!user.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      errors.email = "Email address is invalid";
    if (!user.password) errors.password = "Password is required";
    if (user.password !== user.confirm_password)
      errors.confirm_password = "Passwords do not match";

    // Person Validation
    if (!person.name) errors.name = "Name is required";
    if (!person.organization) errors.organization = "Organization is required";
    if (!person.phone) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(person.phone))
      errors.phone = "Phone number must be 10 digits";
    if (!person.permanent_place)
      errors.permanent_place = "Permanent place is required";
    if (!person.permanent_address)
      errors.permanent_address = "Permanent address is required";
    if (!person.current_place)
      errors.current_place = "Current place is required";
    if (!person.current_address)
      errors.current_address = "Current address is required";
    if (!person.id_no) errors.id_no = "ID number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

      const resultAction = await dispatch(register(payload));

      if (resultAction.type === "register/fulfilled") {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered.",
          placement: "topRight",
        });
        navigate("/dashboard");
      } else {
        notification.error({
          message: "Registration Failed",
          description:
            resultAction.payload || "An error occurred during registration.",
          placement: "topRight",
        });
      }
    } catch (err) {
      console.error("An error occurred during registration:", err);
    }
  };

  return (
    <>
      <Header />
      <Login
        heading="Register"
        isLogin={false}
        onSubmit={handleRegister}
        loading={loading}
      />
      {error && <div className="error">{error}</div>}
      <Footer />
    </>
  );
}

export default RegisterPage;
