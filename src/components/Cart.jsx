import React from "react";
import { Cartstrip, Button } from "../components";
import potatoImage from "../assets/images/potato.png";
import tomatoImage from "../assets/images/tomato.png";
import garlicImage from "../assets/images/garlic.png";
import onionImage from "../assets/images/onion.png";
import { Link } from "react-router-dom";

function Cart({ heading, items }) {
  const cartImages = [potatoImage, tomatoImage, garlicImage, onionImage];

  const cartData = [
    {
      title: "आलु",
      image: cartImages[0],
      price: "१००",
    },
    {
      title: "गोलभेडा",
      image: cartImages[1],
      price: "१५०",
    },
    {
      title: "लसुन",
      image: cartImages[2],
      price: "२००",
    },
    {
      title: "प्याज",
      image: cartImages[3],
      price: "२५०",
    },
  ];

  return (
    <section className="container text-left my-4 md:mt-6 md:mb-8">
      {heading && (
        <h3 className="text-2xl font-semibold w-fit text-[#382426]">
          {heading}
        </h3>
      )}
      <h6 className="mb-3">{items} Items in your cart.</h6>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white w-full md:w-4/6 rounded-lg border">
          <div className="flex bg-[#45730A] text-white text-lg font-semibold rounded-t-lg justify-between px-8 py-4 text-md">
            <h3 className="md:w-2/5">Product</h3>
            <h3 className="md:w-1/5">Price</h3>
            <h3 className="md:w-1/5 ps-6">Quantity</h3>
            <h3 className="md:w-1/5">Total Price</h3>
          </div>
          {cartData.map((cart, index) => (
            <Cartstrip
              key={index}
              title={cart.title}
              image={cart.image}
              price={cart.price}
              isCart={true}
            />
          ))}
        </div>
        <div className="bg-lime-100 w-full md:w-2/6 h-fit rounded-lg">
          <div className="p-4 text-md">
            <h3 className="font-medium text-xl mb-4">Cart Total</h3>
            <div className="flex justify-between mb-1">
              <h3 className="text-lg font-medium">आलु</h3>
              <p className="w-1/5 font-semibold">
                <span className="text-lime-600">रु. १०००</span>
              </p>
            </div>
            <div className="flex justify-between mb-1">
              <h3 className="text-lg font-medium">गोलभेडा</h3>
              <p className="w-1/5 font-semibold">
                <span className="text-lime-600">रु. १०००</span>
              </p>
            </div>
            <div className="flex justify-between mb-1">
              <h3 className="text-lg font-medium">लसुन</h3>
              <p className="w-1/5 font-semibold">
                <span className="text-lime-600">रु. १०००</span>
              </p>
            </div>
            <hr className="my-3 bg-black" />
            <div className="flex justify-between mb-5">
              <h3 className="text-lg font-medium">Sub Total :</h3>
              <p className="w-1/5 font-semibold">
                <span className="text-lime-600">रु. ३०००</span>
              </p>
            </div>
            <Link className="text-center" to="/checkout">
              <Button text="Order Now" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
