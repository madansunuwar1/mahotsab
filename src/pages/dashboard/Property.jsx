import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProperties,
  submitProperty,
  updateProperty,
  deleteProperty,
} from "../../redux/propertySlice"; // Update the import to property slice
import { Space, Table, Form, Input, Button, Card, Modal } from "antd";
import {
  PlusOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const Property = () => {
  const dispatch = useDispatch();
  const [addForm] = Form.useForm(); // Form for adding properties
  const [editForm] = Form.useForm(); // Form for editing properties
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const properties = useSelector((state) => state.property.properties); // Reference to the state properties
  const loading = useSelector((state) => state.property.loading);

  useEffect(() => {
    dispatch(fetchProperties()); // Fetch properties on component load
  }, [dispatch]);

  const handleSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        dispatch(submitProperty(values));
        addForm.resetFields();
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  const handleUpdateSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        dispatch(
          updateProperty({ id: currentPropertyId, propertyData: values })
        );
        setIsModalVisible(false);
        editForm.resetFields();
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  const handleDelete = (propertyId) => {
    confirm({
      title: "के तपाईं निश्चित रूपमा यो सम्पत्ति हटाउन चाहनुहुन्छ?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteProperty(propertyId));
      },
      onCancel() {
        console.log("हटाउने कार्य रद्द भयो");
      },
    });
  };

  const openEditModal = (record) => {
    setCurrentPropertyId(record.id);
    editForm.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "विवरण",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "कार्य",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            सम्पादन गर्नुहोस्
          </Button>
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            हटाउनुहोस्
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form
        form={addForm}
        layout="vertical"
        className="flex flex-col gap-8"
        style={{ maxWidth: 1700 }}
      >
        <Card title="सम्पत्ति थप्नुहोस्">
          <Form.Item
            label="नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया सम्पत्ति नाम प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input className="py-1" />
          </Form.Item>
          <Form.Item
            label="विवरण"
            name="description"
            rules={[
              {
                required: true,
                message: "कृपया सम्पत्ति विवरण प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input className="py-1" />
          </Form.Item>
          <Button
            type="primary"
            className="py-3 text-sm"
            onClick={handleSubmit}
            icon={<PlusOutlined />}
          >
            सम्पत्ति थप्नुहोस्
          </Button>
        </Card>
      </Form>
      <Table
        className="mt-4"
        dataSource={properties}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="सम्पत्ति सम्पादन गर्नुहोस्"
        visible={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          editForm.resetFields(); // Reset form on modal close
        }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया सम्पत्ति नाम प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="विवरण"
            name="description"
            rules={[
              {
                required: true,
                message: "कृपया सम्पत्ति विवरण प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Property;
