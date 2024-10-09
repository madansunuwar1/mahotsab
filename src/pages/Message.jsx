import React from "react";
import "../App.css";
import { Header, Breadcrumb, Message, Footer } from "../components";

function MessagePage() {
  return (
    <>
      <Header />
      <Breadcrumb
        title="अध्यक्षको सन्देश"
        text="तपाईंको स्थानिय ताजा तरकारी, फलफूल, अन्न, र मसलाहरु अब एकै ठाउँमा।
            हाटबजारमा सजिलै अर्डर गर्नुहोस्, हामी तपाईंको ढोकासम्म तुरुन्त
            डेलिभर गर्छौं।"
      />
      <Message />
      <Footer />
    </>
  );
}

export default MessagePage;
