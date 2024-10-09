import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Header,
  Banner,
  CategorySection,
  CardSection,
  Button,
  Footer,
} from "../components";
import { Link } from "react-router-dom";
function HomePage() {
  const [isSticky, setIsSticky] = useState(false);
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

  return (
    <>
      <Header isSticky={isSticky} />
      <Banner isSticky={isSticky} />
      <CategorySection
        heading="तपाई आज केको लागि किनमेल गर्दै हुनुहुन्छ ?"
        cTShow="10"
      />
      <div className="py-4 md:pb-6">
        <CardSection heading="ताजा पिकअप" qTShow="15" />
      </div>
      <div className="mb-5">
        <Link to="/products">
          <Button text="थप उत्पादन" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
