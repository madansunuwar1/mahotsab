import React from "react";
import { Table, Button, Space, Divider } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Transaction = () => {
  const dataSource = [
    {
      key: "1",
      seller: "रविना",
      amount: "२००० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      seller: "सुमन",
      amount: "१५३० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "1",
      seller: "रविना",
      amount: "२००० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      seller: "सुमन",
      amount: "१५३० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "1",
      seller: "रविना",
      amount: "२००० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      seller: "सुमन",
      amount: "१५३० रुपैयाँ",
      date: "२०२४/११/०७",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "बिक्रेता",
      dataIndex: "seller",
      key: "seller",
    },
    {
      title: "खरिदकर्ता",
      dataIndex: "seller",
      key: "seller",
    },
    {
      title: "रकम",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "मिति",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "कार्यहरू",
      key: "age",
      render: () => (
        <Space size="middle">
          <Link to="/transactiondetail">
            <Button type="primary" size="medium" icon={<AntDesignOutlined />}>
              लेनदेन विवरण
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default Transaction;
