import React, { useState } from "react";
import { Card, Progress } from "antd";
import dash1 from "../../assets/images/dash1.png";
import dash2 from "../../assets/images/dash2.png";
import cauli from "../../assets/images/cauliflower.png";
import pot from "../../assets/images/potatoes.png";
import tot from "../../assets/images/tomatos.webp";
import cot from "../../assets/images/carrot.png";
import { Line } from "@ant-design/charts";

const Dashboard = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
  };
  return (
    <>
      <Line {...config} />
      <section className="flex flex-col lg:flex-row justify-evenly gap-2 mb-2">
        <Card>
          <div className="flex justify-center">
            <h1 className="my-auto text-2xl md:text-5xl font-bold">
              हाट बजारमा  स्वागत छ
            </h1>
            <img src={dash2} className="md:w-64 md:h-64 w-32 h-32" />
          </div>
        </Card>
        <Card>
          <div className="flex justify-center">
            <h1 className="my-auto text-2xl md:text-5xl font-bold">
              स्थानीय उत्पादनहरूलाई समर्थन गर्नुहोस्
            </h1>
            <img src={dash1} className="md:w-64 md:h-64 w-32 h-32" />
          </div>
        </Card>
      </section>
      <Card title={<h1 className="text-2xl font-bold">बिक्री तथ्याङ्क</h1>}>
        <section className="mt-2 grid grid-cols-1 md:grid-cols-5 gap-2">
          <Card>
            <div className="flex">
              <img src={cauli} className="h-16 w-16" />
              <div className="my-auto ml-4 text-start">
                <h1 className="font-bold">फूलगोभी</h1>
                <p className="">200 प्रति किलो</p>
              </div>
            </div>
            <Progress
              type="circle"
              percent={75}
              className="mt-4"
              strokeColor="#45730a"
            />
          </Card>
          <Card>
            <div className="flex">
              <img src={pot} className="h-16 w-16" />
              <div className="my-auto ml-4 text-start">
                <h1 className="font-bold">आलु</h1>
                <p className="">80 प्रति किलो</p>
              </div>
            </div>
            <Progress
              type="circle"
              percent={56}
              className="mt-4"
              strokeColor="#45730a"
            />
          </Card>
          <Card>
            <div className="flex">
              <img src={tot} className="h-16 w-16" />
              <div className="my-auto ml-4 text-start">
                <h1 className="font-bold">टमाटर</h1>
                <p className="">150 प्रति किलो</p>
              </div>
            </div>
            <Progress
              type="circle"
              percent={25}
              className="mt-4"
              strokeColor="#45730a"
            />
          </Card>
          <Card>
            <div className="flex">
              <img src={cot} className="h-16 w-16" />
              <div className="my-auto ml-4 text-start">
                <h1 className="font-bold">गाजर</h1>
                <p className="">300 प्रति किलो</p>
              </div>
            </div>
            <Progress
              type="circle"
              percent={36}
              className="mt-4"
              strokeColor="#45730a"
            />
          </Card>
          <Card>
            <div className="flex">
              <img src={cot} className="h-16 w-16" />
              <div className="my-auto ml-4 text-start">
                <h1 className="font-bold">गाजर</h1>
                <p className="">300 प्रति किलो</p>
              </div>
            </div>
            <Progress
              type="circle"
              percent={36}
              className="mt-4"
              strokeColor="#45730a"
            />
          </Card>
        </section>
      </Card>
      <section></section>
    </>
  );
};

export default Dashboard;
