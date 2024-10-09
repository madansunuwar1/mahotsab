import React from "react";
import chairman from "../assets/images/chairman.jpg";

function Message({ title }) {
  return (
    <section className="bg-gray-200">
      <div className="container">
        <div className="py-8 md:py-12 text-left">
          <div className="bg-white px-10 md:px-10 py-8 rounded-lg flex-center flex-col-reverse md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h3 className="font-semibold text-md text-xl md:text-2xl mb-4 tracking-wide font-suse">
                प्रिय उपभोक्ताहरू,
              </h3>
              <p className="text-md md:text-xl mt-6 mb-4 tracking-wide font-suse">
                हाटबजारमा तपाईंलाई स्वागत गर्न पाउँदा मलाई अत्यन्त गर्व र खुसी
                लागेको छ। हाम्रो उद्देश्य सरल छ: तपाईंको ढोकासम्म ताजा,
                गुणस्तरीय, र स्थानिय उत्पादनहरू पुर्‍याएर तपाईंको जीवनलाई सहज
                बनाउनु। हाटबजार केवल एउटा अनलाइन बजार होइन; यो हाम्रो स्थानिय
                किसानहरू, उत्पादकहरू, र उपभोक्ताहरूलाई सशक्त बनाउनका लागि
                उठाइएको एक कदम हो।
              </p>

              <p className="text-md md:text-xl mt-6 mb-4 tracking-wide font-suse">
                हामीले ताजा उत्पादनको महत्त्व बुझेका छौं। यो न केवल तपाईंको
                स्वास्थ्यको लागि आवश्यक छ, तर स्थानिय कृषिलाई जोगाउन र कृषकहरूको
                जीवनस्तर सुधार्न पनि अत्यन्त जरुरी छ। हामीले हाटबजार एपको
                माध्यमबाट किसानहरूलाई सिधै तपाईंहरूसम्म पुर्‍याउन सफल भएका छौं,
                जसले गर्दा तपाईंले सस्तो मूल्यमा गुणस्तरीय सामग्री पाउनुहुन्छ, र
                कृषकहरूलाई उचित आम्दानीको अवसर मिल्छ।
              </p>
              <p className="text-md md:text-xl mt-6 mb-4 tracking-wide font-suse">
                म विश्वस्त छु कि हाटबजारको माध्यमबाट हामीले तपाईंको खानपानलाई
                स्वस्थ बनाउनुका साथै स्थानिय उत्पादन र कृषकहरूको समर्थनमा
                महत्वपूर्ण भूमिका खेल्न सक्नेछौं।
              </p>
              <p className="text-md md:text-xl mt-6 tracking-wide font-suse">
                तपाईंले हाम्रो सेवा विश्वास गर्नु भएकोमा धन्यवाद दिन चाहन्छु।
                भविष्यमा हामी अझ उत्कृष्ट सेवा र उत्पादनहरू प्रदान गर्ने
                लक्ष्यमा निरन्तर लागिपर्नेछौं। तपाईंको साथ, समर्थन, र सुझावहरूको
                हामीले सदैव उच्च कदर गर्नेछौं।
              </p>
              <p className="text-md md:text-xl mt-6 tracking-wide font-suse">
                धन्यवाद!
              </p>
              <h3 className="font-semibold text-md md:text-xl mt-6 tracking-wide font-suse">
                दिपा बोहोरा (दाहाल)
              </h3>
              <p className="text-md md:text-xl tracking-wide mt-2 font-suse">
                अध्यक्ष, सुनकोशी गाउँपालिका
              </p>
            </div>
            <div className="w-full md:w-1/3 md:px-4 md:mb-14">
              <img className="rounded-lg" src={chairman} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Message;
