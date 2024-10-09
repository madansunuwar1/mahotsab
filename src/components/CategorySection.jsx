import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCategories } from "../redux/vegetableSlice";

function CategorySection({ heading, cTShow }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector((state) => state.vegetable.vegetables);

  useEffect(() => {
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  function convertImage(url) {
    if (url) {
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  const categoryData = categories.map((vegetable) => ({
    id: vegetable.id,
    title: vegetable.name,
    image: convertImage(vegetable.photo),
  }));

  return (
    <section className={`bg-[#fff7cb] py-4 md:pb-0`}>
      <div className="container">
        <div className="flex justify-between mb-3">
          <h3 className="text-2xl font-semibold md:text-left w-fit">
            {heading}
          </h3>
          {location.pathname !== "/categories" && (
            <Link
              className="font-semibold group sm:flex-center hidden"
              to="/categories"
            >
              सबै हेर्नुहोस्
              <FontAwesomeIcon
                className="ms-2 transition-transform group-hover:animate-swish"
                icon={faMinus}
              />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-4 xs:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 gap-2 sm:gap-0">
          {categoryData.slice(0, cTShow).map((category, index) => (
            <>
              <Link
                to={`/products/${category.id}`}
                className="flex-center flex-col mx-auto sm:mx-0 sm:p-3 group"
              >
                <img
                  className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-full group-hover:animate-bounceCustom transition-transform"
                  src={category.image}
                  alt={category.title}
                />
                <h6 className="text-lg mt-2">{category.title}</h6>
              </Link>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
