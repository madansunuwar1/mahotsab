import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Spin, Popconfirm, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/orderSlice"; // Adjust the import based on your file structure
import { fetchStocks } from "../../redux/stockSlice"; // Add this import

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order); // Select orders from the state
  const { stocks } = useSelector((state) => state.stock); // Select stocks from the state
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // State to control modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  // Fetch orders and stocks
  const fetchData = async () => {
    try {
      await dispatch(fetchOrders()).unwrap();
      await dispatch(fetchStocks()).unwrap();
    } catch (err) {
      setErrorMessage(err.message || "Unknown error"); // Set error message
      setIsErrorModalVisible(true); // Show error modal
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, [dispatch]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      message.success("Order status updated successfully!");
    } catch (err) {
      setErrorMessage(err.message || "Unknown error"); // Set error message
      setIsErrorModalVisible(true); // Show error modal
    }
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false); // Close the error modal
  };

  if (loading) {
    return <Spin tip="Loading orders..." />;
  }

  const columns = [
    {
      title: "अर्डर आईडी",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "खरिद गर्नेको नाम",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "सम्पर्क",
      dataIndex: "buyerContact",
      key: "buyerContact",
    },
    {
      title: "ठेगाना",
      dataIndex: "buyerAddress",
      key: "buyerAddress",
    },
    {
      title: "कुल मूल्य",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "अवस्था",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="green">{status}</Tag>,
    },
    {
      title: "क्रिया",
      key: "action",
      render: (_, record) => (
        <div>
          <Popconfirm
            title="Are you sure you want to mark this order as completed?"
            onConfirm={() => handleUpdateStatus(record.id, "complete")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" className="mr-2">
              Complete Order
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to cancel this order?"
            onConfirm={() => handleUpdateStatus(record.id, "canceled")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Cancel Order</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Prepare data for the table
  const dataSource = orders.map((order) => ({
    id: order.id,
    buyerName: order.person.name,
    buyerContact: order.person.phone,
    buyerAddress: order.person.current_address,
    totalPrice: `${order.total_price} रुपैयाँ`,
    status: order.status,
  }));

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      {/* Error Modal */}
      <Modal
        title="Error"
        visible={isErrorModalVisible}
        onOk={handleCloseErrorModal}
        onCancel={handleCloseErrorModal}
      >
        <p>{errorMessage}</p>
      </Modal>
    </>
  );
};

export default Order;
