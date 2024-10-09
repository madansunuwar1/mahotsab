import React from "react";
import { Table, Button, Space, Input, Divider } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Coperativelist = () => {
  const dataSource = [
    {
      key: "1",
      name: "हाटबजार सहकारी प्राइभेट लि",
      img: "https://sahakariakhabar.com/uploads/news/medium/1636532951_sahakari0112.jpg",
    },
    {
      key: "2",
      name: "गंगाजमुना कृषि सहकारी संस्था लि",
      img: "https://hamronepalcoop.com.np/wp-content/uploads/2022/01/New-Project-48.jpg",
    },
    {
      key: "3",
      name: "बुर्तिबाङ बचत तथा रिन सहकारी संस्था लि",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17pUQBot4OJdF4mDznKfSI-iPd9emGi6Nsw&s",
    },
    {
      key: "4",
      name: "कुवाकोट साना किसान कृषि सहकारी संस्था लि",
      img: "https://www.bakhansahakari.org.np/pic/article/2981432226905.jpg",
    },
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => (
        <img
          src={text}
          alt="profile"
          className="rounded-full h-10 w-10 object-cover"
        />
      ),
    },
    {
      title: "सहकारी नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "कार्यहरू",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link to="/farmerdetail">
            <Button type="primary">विवरण हेर्नुहोस्</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="आफ्नो खोज पाठ इनपुट गर्नुहोस्"
        allowClear
        enterButton="खोज"
        size="large"
        onSearch={onSearch}
      />
      <Divider />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  );
};

export default Coperativelist;
