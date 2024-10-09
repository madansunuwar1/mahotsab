import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../redux/stockSlice";
import { addOrder } from "../../redux/orderSlice";
import api from "../../utils/api"; // Adjust the import path as needed

const AddOrder = () => {
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [places, setPlaces] = useState([]); // State for places
  const [person, setPerson] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    permanent_place: "",
    permanent_address: "",
    current_place: "",
    current_address: "",
    id_no: "",
  });
  const [error, setError] = useState(null);

  const { stocks } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStocks());
    // Fetch places when the component mounts
    const fetchPlaces = async () => {
      try {
        const response = await api.get("v1/setting/places");
        setPlaces(response.data.results); // Assuming response.data is the array of places
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, [dispatch]);

  function convertImage(url) {
    if (url) {
      // Use regex to add "haat" before "/media"
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  const handleSelectStock = (stock, isChecked) => {
    if (isChecked) {
      // If the item is selected (checked), add it to the cart
      const existingItem = cartItems.find(
        (item) => item.price_variation.id === stock.id
      );
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.price_variation.id === stock.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            price_variation: { id: stock.id },
            quantity: 1,
            discount_amount: "0.00",
            name: stock.variety.name,
            photo: stock.variety.photo || "",
          },
        ]);
      }
    } else {
      // If the item is deselected (unchecked), remove it from the cart
      setCartItems(
        cartItems.filter((item) => item.price_variation.id !== stock.id)
      );
    }
  };

  const handleQuantityChange = (stockId, value) => {
    // Remove validation to allow any input type (including text)
    setCartItems(
      cartItems.map((item) =>
        item.price_variation.id === stockId
          ? { ...item, quantity: value }
          : item
      )
    );
    setError(null);
  };

  const handlePersonChange = (key, value) => {
    if (key === "permanent_place" || key === "current_place") {
      // Ensure only numbers are entered
      const numericValue = value.replace(/\D/g, "");
      setPerson({ ...person, [key]: numericValue });
    } else {
      setPerson({ ...person, [key]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const orderData = {
      cart_items: cartItems.map((item) => ({
        ...item,
        price_variation: item.price_variation.id,
      })),
      person: {
        ...person,
        permanent_place: person.permanent_place
          ? parseInt(person.permanent_place, 10)
          : null,
        current_place: person.current_place
          ? parseInt(person.current_place, 10)
          : null,
      },
    };
    dispatch(addOrder(orderData))
      .then((response) => {
        // Check if the order creation was successful based on response status
        if (response.meta.requestStatus === "fulfilled") {
          alert("Order successfully added");
          // Reset form after successful submission
          setCartItems([]);
          setPerson({
            name: "",
            phone: "",
            email: "",
            address: "",
            permanent_place: "",
            permanent_address: "",
            current_place: "",
            current_address: "",
            id_no: "",
          });
        } else {
          alert("Error adding order: " + response.error.message);
        }
      })
      .catch((error) => {
        alert("Error adding order: " + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Order</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Cart Items</h3>
        <div className="flex gap-8 flex-wrap">
          {stocks.map((stock) => (
            <div key={stock.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`stock-${stock.id}`}
                checked={cartItems.some(
                  (item) => item.price_variation.id === stock.id
                )}
                onChange={(e) => handleSelectStock(stock, e.target.checked)}
              />
              <label htmlFor={`stock-${stock.id}`} className="ml-2">
                {stock.name}
              </label>
              {stock.variety.photo && (
                <img
                  src={convertImage(stock.variety.photo)}
                  alt={stock.variety.name}
                  className="ml-2 h-10 w-10 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {cartItems.map((item, index) => (
        <div key={index} className="mb-4 flex items-center">
          <span className="mr-2">Item: {item.name}</span>
          {item.photo && (
            <img
              src={convertImage(item.photo)}
              alt={item.name}
              className="ml-2 h-10 w-10 object-cover"
            />
          )}
          <input
            type="text" // Change input type to "text"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.price_variation.id, e.target.value)
            }
            className="border rounded p-1 w-16 ml-2"
          />
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-4">Person Details</h3>
      {Object.keys(person).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-1">
            {key.replace(/_/g, " ").toUpperCase()}
          </label>
          {key === "permanent_place" || key === "current_place" ? (
            <select
              value={person[key]}
              onChange={(e) => setPerson({ ...person, [key]: e.target.value })}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select {key.replace(/_/g, " ")}</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name} {/* Assuming each place has an id and name */}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={key === "email" ? "email" : "text"}
              value={person[key]}
              onChange={(e) => setPerson({ ...person, [key]: e.target.value })}
              className="border rounded p-2 w-full"
              required
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-[#45730a] text-white py-2 px-4 rounded primary"
      >
        Add Order
      </button>
    </form>
  );
};

export default AddOrder;
