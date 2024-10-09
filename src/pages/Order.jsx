import React from "react";
import "../App.css";
import { Header, Order, Footer } from "../components";

function CartPage() {
  return (
    <>
      <Header />
      <Order heading="Orders" items="4" />
      <Footer />
    </>
  );
}

export default CartPage;
