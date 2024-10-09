import React from "react";
import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";

// Dummy data for the table
const dataSource = [
  {
    key: "1",
    name: "राम बहादुर श्रेष्ठ",
    image:
      "https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg",
  },
  {
    key: "2",
    name: "राम बहादुर श्रेष्ठ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
  },
  {
    key: "3",
    name: "राम बहादुर श्रेष्ठ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOIiEXB1uOFlAQAp2JSlv7zCR4R29QFIg3w&s",
  },
  {
    key: "4",
    name: "राम बहादुर श्रेष्ठ",
    image:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
  },
  {
    key: "5",
    name: "राम बहादुर श्रेष्ठ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&s",
  },
  // Add more items here if needed
];

// Define columns for the table
const columns = [
  {
    title: "प्रोफाइल फोटो",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <img
        src={text}
        alt="profile"
        className="rounded-full h-10 w-10 object-cover"
      />
    ),
  },
  {
    title: "नाम",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "कार्यहरू",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to="/farmerdetail">
          <Button type="primary" size="medium" icon={<AntDesignOutlined />}>
            विवरण
          </Button>
        </Link>
      </Space>
    ),
  },
];

const Farmerlist = () => {
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default Farmerlist;
