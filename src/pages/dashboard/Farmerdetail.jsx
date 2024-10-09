import { Card, Divider, Tag } from "antd";
import React from "react";
import potato from "../../assets/images/potato-single.jpg";
import tomato from "../../assets/images/tomatos.webp";
import carrot from "../../assets/images/carrot.png";
import sale from "../../assets/images/sales-agent.png";
import dale from "../../assets/images/delivery.png";
import name from "../../assets/images/id-card.png";
import loc from "../../assets/images/house.png";
import pho from "../../assets/images/contact.png";
import cop from "../../assets/images/team.png";
import trd from "../../assets/images/trade.png";

const Farmerdetail = () => {
  return (
    <>
      <Card title="किसान को विवरण">
        <div className="flex justify-beteween flex-col md:flex-row">
          <div className="flex flex-col gap-8 ">
            <div className="p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s"
                className="w-72 h-72 object-cover rounded-md"
              />
            </div>
            <div className="my-auto flex">
              <img
                src={name}
                alt=""
                className="w-10 h-10 object-cover my-auto"
              />
              <div className="ml-8 my-auto">
                <h2 className="text-bold text-xl">नाम</h2>
                <p className="text-gray-800 text-sm">समुना श्रेष्ठ</p>
              </div>
            </div>
            <div className="my-auto flex">
              <img
                src={pho}
                alt=""
                className="w-10 h-10 object-cover my-auto"
              />
              <div className="ml-8 my-auto">
                <h2 className="text-bold text-xl">फोन नम्बर</h2>
                <p className="text-gray-800 text-sm">१२३४५६७८९</p>
              </div>
            </div>
            <div className="my-auto flex">
              <img
                src={loc}
                alt=""
                className="w-10 h-10 object-cover my-auto"
              />
              <div className="ml-8 my-auto">
                <h2 className="text-bold text-xl">ठेगाना</h2>
                <p className="text-gray-800 text-sm">दमौली ४, झ्यापले गाउ</p>
              </div>
            </div>
            <div className="my-auto flex">
              <img
                src={cop}
                alt=""
                className="w-10 h-10 object-cover my-auto"
              />
              <div className="ml-8 my-auto">
                <h2 className="text-bold text-xl">सम्बन्धित सहकारी</h2>
                <p className="text-gray-800 text-sm">
                  सूर्योदय निजी सहकारी लिमिटेड
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-10 md:mt-0">
            <Card>
              <h1 className="text-2xl font-bold">बिक्री तथ्याङ्क</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
                <div>
                  <div className="border-2 border-green-400 flex p-4 rounded-lg">
                    <img src={sale} alt="" className="h-20 w-20" />
                    <div className="my-auto ml-4">
                      <p>कुल बिक्री</p>
                      <p>२४,५०० रु</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="border-2 border-green-400 flex p-4 rounded-lg">
                    <img src={dale} alt="" className="h-20 w-20" />
                    <div className="my-auto ml-4">
                      <p>कुल उत्पादन</p>
                      <p>२०४ किलोग्राम</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <h1 className="text-2xl font-bold">किसानको स्टक</h1>
              <Divider />
              <div className="gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid xl:grid-cols-3">
                <Card>
                  <div className="flex flex-col md:flex-row mx-auto">
                    <img
                      src={potato}
                      alt="potato"
                      className="w-32 h-32 bg-black rounded-md object-cover items-center"
                    />
                    <div className="ml-4">
                      <div>
                        <h2 className="font-bold text-md">मूल्य प्रति किलो</h2>
                        <p className="text-sm">रु २०</p>
                      </div>
                      <div>
                        <h2 className="font-bold text-md">स्टक को मात्रा</h2>
                        <p className="text-sm">७५ किलो</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col md:flex-row mx-auto">
                    <img
                      src={tomato}
                      alt="potato"
                      className="w-32 h-32 bg-black rounded-md object-cover items-center"
                    />
                    <div className="ml-4">
                      <div>
                        <h2 className="font-bold text-md">मूल्य प्रति किलो</h2>
                        <p className="text-sm">रु २०</p>
                      </div>
                      <div>
                        <h2 className="font-bold text-md">स्टक को मात्रा</h2>
                        <p className="text-sm">७५ किलो</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={carrot}
                      alt="potato"
                      className="w-32 h-32 bg-black rounded-md object-cover items-center"
                    />
                    <div className="ml-4">
                      <div>
                        <h2 className="font-bold text-md">मूल्य प्रति किलो</h2>
                        <p className="text-sm">रु २०</p>
                      </div>
                      <div>
                        <h2 className="font-bold text-md">स्टक को मात्रा</h2>
                        <p className="text-sm">७५ किलो</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Farmerdetail;
