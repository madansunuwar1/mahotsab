import React from "react";
import "../App.css";
import { Header, Checkout, Footer } from "../components";

function CartPage() {
  return (
    <>
      <Header />
      <Checkout heading="Checkout" items="4" />
      <Footer />
    </>
  );
}

export default CartPage;
