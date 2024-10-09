import React, { useState, useEffect } from "react";
import "../App.css";
import { Header, Footer, CardSection } from "../components";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCategories } from "../redux/vegetableSlice";

function ProductsPage() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      const bottomHeader = document.querySelector(".bottom-header");
      if (bottomHeader) {
        let stickyOffset = 90;

        if (window.innerWidth <= 768) {
          stickyOffset = 75;
        }
        setIsSticky(window.pageYOffset > stickyOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.vegetable.vegetables);
  useEffect(() => {
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  const handleCategoryChange = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <>
      <Header isSticky={isSticky} />
      <div className={`py-6 md:py-10 ${isSticky ? "mt-14 md:mt-20" : ""}`}>
        <div className="container">
          <div className="relative pb-3 sm:pb-3 group w-fit ms-auto">
            <Link className="font-semibold border border-slate-400 md:px-6 md:py-1 rounded-lg">
              श्रेणी
            </Link>
            <ul className="hidden group-hover:block absolute top-9 left-0 bg-white border rounded-md w-48 p-1.5 z-50">
              <li className="relative group">
                <Link
                  className="block w-full p-1.5 font-semibold border-b hover:bg-[#6FAE14] hover:text-white text-black rounded-md"
                  to="/products"
                >
                  सबै उत्पादन
                </Link>
              </li>
              {categories?.map((category) => (
                <li key={category.id} className="relative group">
                  <Link
                    className="block w-full p-1.5 font-semibold hover:bg-[#6FAE14] hover:text-white text-black rounded-md"
                    to={`/products/${category.id}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CardSection
          heading={categoryId ? `श्रेणीको उत्पादनहरु` : "सबै उत्पादनहरू"}
          qTShow={20}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductsPage;
