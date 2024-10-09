import React from "react";
import "../App.css";
import { Header, History, Footer } from "../components";

function CartPage() {
  return (
    <>
      <Header />
      <History heading="Shopping Cart" items="4" />
      <Footer />
    </>
  );
}

export default CartPage;
