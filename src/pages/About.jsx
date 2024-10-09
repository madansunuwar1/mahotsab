import React from "react";
import "../App.css";
import { Header, Breadcrumb, Content, Footer } from "../components";

function About() {
  return (
    <>
      <Header />
      <Breadcrumb
        title="हाटबजार एपमा तपाईलाई स्वागत छ!"
        text="तपाईंको स्थानिय ताजा तरकारी, फलफूल, अन्न, र मसलाहरु अब एकै ठाउँमा।
            हाटबजारमा सजिलै अर्डर गर्नुहोस्, हामी तपाईंको ढोकासम्म तुरुन्त
            डेलिभर गर्छौं।"
      />
      <Content />
      <Footer />
    </>
  );
}

export default About;
