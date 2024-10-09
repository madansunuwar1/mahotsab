import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnitTypes,
  submitUnit,
  updateUnit,
  deleteUnit,
} from "../../redux/unitSlice";
import { Space, Table, Form, Input, Button, Card, Modal } from "antd";
import {
  PlusOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const Unit = () => {
  const dispatch = useDispatch();
  const [addForm] = Form.useForm(); // Form for adding units
  const [editForm] = Form.useForm(); // Form for editing units
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUnitId, setCurrentUnitId] = useState(null);
  const units = useSelector((state) => state.unit.units);
  const loading = useSelector((state) => state.unit.loading);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or fetch from Redux
    dispatch(fetchUnitTypes());
  }, [dispatch]);

  const handleSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        dispatch(submitUnit(values));
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
        dispatch(updateUnit({ id: currentUnitId, unitData: values }));
        setIsModalVisible(false);
        editForm.resetFields();
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  const handleDelete = (unitId) => {
    confirm({
      title: "के तपाईँ यो एकाइ मेटाउन निश्चित हुनुहुन्छ?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteUnit(unitId));
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const openEditModal = (record) => {
    setCurrentUnitId(record.id);
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
      title: "कारवाही",
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
            मेटाउनुहोस्
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
        <Card title="एकाइ">
          <Form.Item
            label="नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया एकाइको नाम प्रविष्ट गर्नुहोस्",
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
                message: "कृपया एकाइको विवरण प्रविष्ट गर्नुहोस्",
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
            एकाइ थप्नुहोस्
          </Button>
        </Card>
      </Form>
      <Table
        className="mt-4"
        dataSource={units}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="एकाइ सम्पादन गर्नुहोस्"
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
                message: "कृपया एकाइको नाम प्रविष्ट गर्नुहोस्",
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
                message: "कृपया एकाइको विवरण प्रविष्ट गर्नुहोस्",
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

export default Unit;
