import React, { useEffect } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import History from "./pages/History";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Message from "./pages/Message";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the location (route) changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/product/:stockId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/*" element={<Sidebar />} />
        <Route path="/history" element={<History />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/message" element={<Message />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* For invalid routes */}
      </Routes>
    </>
  );
}

const AppWrapper = () => {
  return (
    <div className="App font-suse">
      <ThemeProvider>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default AppWrapper;
