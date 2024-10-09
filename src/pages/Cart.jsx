import React from "react";
import "../App.css";
import { Header, Cart, Footer } from "../components";

function CartPage() {
  return (
    <>
      <Header />
      <Cart heading="Shopping Cart" items="4" />
      <Footer />
    </>
  );
}

export default CartPage;
