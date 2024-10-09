import React from "react";
import { Carousel } from "flowbite-react";
import banner0 from "../assets/images/banner.jpg";
import banner1 from "../assets/images/banner1.jpg";

function Banner({ isSticky }) {
  const bannerImages = [banner0, banner1];

  return (
    <section
      className={`md:shadow-md px-3 py-3 md:py-5 mb-0 ${
        isSticky ? "mt-14 md:mt-20" : ""
      }`}
    >
      <div className="container px-0 sm:px-4">
        <Carousel
          className="h-52 max-h-60 sm:h-64 xl:h-80 2xl:h-96"
          indicators={false}
          slideInterval={8000}
        >
          {bannerImages.map((image, index) => (
            <img key={index} src={image} alt={`Banner ${index}`} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Banner;
