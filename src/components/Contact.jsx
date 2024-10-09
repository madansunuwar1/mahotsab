import React from "react";
import image from "../assets/images/haat.jpg";

function Contact({ title, text }) {
  return (
    <section className="bg-gray-200">
      <div className="container">
        <div className="py-8 md:py-12 text-left">
          <img src={image} className="block rounded-lg" alt={title} />
          <div className="bg-white mt-8 px-8 md:px-10 py-8 rounded-lg">
            <p className="text-md md:text-xl mb-4 tracking-wide font-suse">
              हाटबजार एप एक आधुनिक अनलाइन बजार हो, जहाँ तपाईंले ताजा स्थानिय
              तरकारी, फलफूल, अन्न, मसलाहरू सहजै अर्डर गर्न सक्नुहुन्छ। बजारमा
              भिडभाड नगरीकन, तपाईंको मोबाइलबाटै आवश्यक पर्ने सम्पूर्ण खाद्य
              सामग्रीहरू केही क्लिकमै घरमै मगाउन सकिन्छ।
            </p>
            <p className="text-md md:text-xl mt-4 mb-6 tracking-wide font-suse">
              हामीले हाटबजार एपको माध्यमबाट स्थानिय किसानहरूसँग सिधा सहकार्य
              गर्दै गुणस्तरीय उत्पादनहरू सस्तो मूल्यमा उपभोक्ताहरूसम्म
              पुर्‍याउने लक्ष्य राखेका छौं। ताजा र स्वस्थ उत्पादनहरू उपभोग गर्नु
              तपाईंको परिवारको स्वास्थ्यका लागि मात्र होइन, स्थानीय किसानहरूको
              जीवनस्तर सुधारमा पनि ठुलो टेवा पुर्‍याउँछ। हामी तपाईंलाई गुणस्तरीय
              सेवा प्रदान गर्दै, तपाईंको खानपानलाई थप स्वास्थ्यप्रद बनाउन
              समर्पित छौं।
            </p>

            <h3 className="text-xl md:text-2xl font-semibold tracking-wider font-primary w-2/3">
              हाटबजारको विशेषता:
            </h3>
            <ul className="text-md md:text-xl mt-4 ms-8 tracking-wide font-suse list-disc">
              <li>ताजा र स्वस्थ: प्रत्येक सामग्री किसानको खेतबाट सिधा।</li>
              <li>सस्तो र गुणस्तरीय: बजारभन्दा सस्तोमा।</li>
              <li>तुरुन्त डेलिभरी: तपाईंको घरमै समयमै डेलिभर।</li>
              <li>सजिलो प्रयोग: मोबाइलबाटै केही क्लिकमा अर्डर।</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
