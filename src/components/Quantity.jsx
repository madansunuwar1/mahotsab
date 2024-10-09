import React, { useState } from "react";

function QuantitySelector({ isCart, onQuantityChange }) {
  // Initialize state for quantity with a default value of 1
  const [quantity, setQuantity] = useState(1);

  // Function to increment quantity by 1
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // Notify parent component of the change
  };

  // Function to decrement quantity by 1, ensuring it doesn't go below 1
  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // Notify parent component of the change
  };

  // Handle manual input change
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
      onQuantityChange(value); // Notify parent component of the change
    }
  };

  return (
    <div>
      {/* Decrement Button */}
      <button
        className="px-3 py-1 hover:text-white bg-gray-300 hover:bg-gray-500 rounded-l"
        onClick={handleDecrement}
      >
        -
      </button>

      {/* Input to display and change quantity */}
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        className="w-12 md:ps-3.5 py-1 px-0 text-center leading-3 border-0 bg-transparent"
      />

      {/* Increment Button */}
      <button
        className="px-3 py-1 hover:text-white bg-gray-300 hover:bg-gray-500 rounded-r"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
