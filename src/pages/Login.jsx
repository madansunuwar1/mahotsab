import React from "react";
import "../App.css";
import { Header, Login, Footer } from "../components";

function LoginPage() {
  return (
    <>
      <Header />
      <Login heading="Login" isLogin={true} />
      <Footer />
    </>
  );
}

export default LoginPage;
