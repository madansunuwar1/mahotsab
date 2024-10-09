import React, { useState, useEffect } from "react";
import { Cartstrip } from "../components";
import { Modal, Button } from "flowbite-react";
import { useLocation } from "react-router-dom";
import potatoImage from "../assets/images/potato.png";
import tomatoImage from "../assets/images/tomato.png";
import garlicImage from "../assets/images/garlic.png";
import onionImage from "../assets/images/onion.png";

function Checkout({ heading, items, qty }) {
  const cartImages = [potatoImage, tomatoImage, garlicImage, onionImage];
  const location = useLocation();

  const cartData = [
    {
      title: "आलु",
      image: cartImages[0],
      price: "१००",
      quantity: "३",
      status: "Pending",
    },
    {
      title: "गोलभेडा",
      image: cartImages[1],
      price: "१५०",
      quantity: "३",
      status: "Pending",
    },
    {
      title: "लसुन",
      image: cartImages[2],
      price: "२००",
      quantity: "३",
      status: "Pending",
    },
    {
      title: "प्याज",
      image: cartImages[3],
      price: "२५०",
      quantity: "३",
      status: "Pending",
    },
  ];

  const [openModal, setOpenModal] = useState(true);

  // Trigger modal to open when navigating to /checkout
  useEffect(() => {
    if (location.pathname === "/checkout") {
      setOpenModal(true);
    }
  }, [location]);

  return (
    <>
      <section className="container text-left mt-16">
        {heading && <h3 className="text-2xl font-semibold w-fit">{heading}</h3>}
        <h6 className="mb-8">{items} Items in your cart.</h6>
        <div className="flex gap-6">
          <div className="bg-white w-4/6 rounded-lg">
            <div className="flex bg-[#45730A] text-white text-lg font-semibold rounded-t-lg justify-between px-8 py-4 text-md">
              <h3 className="w-2/6">Product</h3>
              <h3 className="w-1/6">Price</h3>
              <h3 className="w-1/6 ps-2">Quantity</h3>
              <h3 className="w-1/6 text-center ps-3">Total Price</h3>
              <h3 className="w-1/6 text-center ps-2">Status</h3>
            </div>
            {cartData.map((cart, index) => (
              <Cartstrip
                key={index}
                title={cart.title}
                image={cart.image}
                price={cart.price}
                quantity={cart.quantity}
                status={cart.status}
                isCart={false}
              />
            ))}
          </div>
          <div className="w-2/6 h-fit">
            <div className="bg-lime-100 p-4 text-md rounded-lg">
              <h3 className="font-medium text-xl mb-4">Your Orders</h3>
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">
                  आलु<span> x {qty}</span>
                </h3>
                <p className="w-1/5 font-semibold">
                  <span className="text-lime-600">रु. १०००</span>
                </p>
              </div>
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">
                  गोलभेडा<span> x {qty}</span>
                </h3>
                <p className="w-1/5 font-semibold">
                  <span className="text-lime-600">रु. १०००</span>
                </p>
              </div>
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">
                  लसुन<span> x {qty}</span>
                </h3>
                <p className="w-1/5 font-semibold">
                  <span className="text-lime-600">रु. १०००</span>
                </p>
              </div>
              <hr className="my-3 bg-black" />
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-medium">Shipping :</h3>
                <p className="w-1/5 font-semibold">
                  <span className="text-lime-600">रु. ३०</span>
                </p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Total :</h3>
                <p className="w-1/5 font-semibold">
                  <span className="text-lime-600">रु. ३०३०</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Choose Your Delivery Location</Modal.Header>
        <Modal.Body>
          <div className="flex justify-between items-center mb-1">
            <label className="w-3/7 text-lg font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-4/7 font-semibold px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
              placeholder="Enter your Name"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <label className="w-3/7 text-lg font-medium" htmlFor="name">
              Address
            </label>
            <input
              type="text"
              id="name"
              className="w-4/7 font-semibold px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
              placeholder="Enter your Address"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <label className="w-3/7 text-lg font-medium" htmlFor="name">
              Number
            </label>
            <input
              type="number"
              id="name"
              className="w-4/7 font-semibold px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D853A]"
              placeholder="Enter your Number"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-[#45730A] hover:bg-[#45730A]"
            onClick={() => setOpenModal(false)}
          >
            Order Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Checkout;
