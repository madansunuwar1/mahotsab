import React from "react";
import { Card, Divider, Tag, Form, Button, Input, Select } from "antd";
import pro from "../../assets/images/housekeeper.png";
import loc from "../../assets/images/map.png";

const Orderdetail = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  return (
    <>
      <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card
          title={
            <>
              <div className="flex justify-between p-2">
                <img src={pro} className="w-14 h-14 hidden md:flex" />
                <div className="my-auto ml-4">
                  <p>
                    अर्डर आईडी:<span className="ml-4"> #२३४२३४ </span>
                  </p>
                  <p>
                    २०२४/२/१ बुधबार<span className="ml-4">१२:४५</span>
                  </p>
                </div>
                <div>
                  <Tag color="purple">नयाँ अर्डर</Tag>
                </div>
              </div>
            </>
          }
          className="col-span-1"
        >
          <div>
            <p className="flex justify-between">
              आलु: <span>२ किलो</span>
            </p>
            <p className="flex justify-between">
              टमाटर: <span>५ किलो</span>
            </p>
            <p className="flex justify-between">
              फूलगोभी: <span>३ किलो </span>
            </p>
            <Divider />
            <p className="flex justify-between">
              कुल<span>३५२ रुपैयाँ</span>
            </p>
          </div>
        </Card>
        <Card title="स्थान">
          <div className="flex">
            <img src={loc} alt="location" className="h-16 w-16 my-auto" />
            <p className="my-auto ml-8">धोबीघाट, घर नम्बर 3424</p>
          </div>
        </Card>
        <Card title="स्थिति परिवर्तन गर्नुहोस्">
          <Form form={form} layout="vertical">
            <Form.Item
              label="स्थिति"
              required
              tooltip="तपाईंले उत्पादन चयन गर्न आवश्यक छ"
            >
              <Select
                placeholder="कृपया आफ्नो उत्पादन चयन गर्नुहोस्"
                allowClear
              >
                <Option value="1" style={{ color: "#508E39" }}>
                  स्वीकार गरियो
                </Option>
                <Option value="2" style={{ color: "#3BA598" }}>
                  होल्डमा
                </Option>
                <Option value="3" style={{ color: "#B5A929" }}>
                  प्रगतिमा छ
                </Option>
                <Option value="4" style={{ color: "#508E39" }}>
                  पूरा गरियो
                </Option>
                <Option value="5" style={{ color: "#E01212" }}>
                  रद्द गरियो
                </Option>
              </Select>
            </Form.Item>
            {/* <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item> */}
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Orderdetail;
