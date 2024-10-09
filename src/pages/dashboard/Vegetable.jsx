import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVegetables,
  submitVegetable,
  updateVegetable,
  deleteVegetable,
} from "../../redux/vegetableSlice"; // Adjust the import path as necessary
import { fetchUnitTypes } from "../../redux/unitSlice"; // Adjust the import path
import {
  Space,
  Table,
  Form,
  Input,
  Button,
  Card,
  Modal,
  Upload,
  Select,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
const { Option } = Select;

const Vegetable = () => {
  const dispatch = useDispatch();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVegetableId, setCurrentVegetableId] = useState(null);
  const vegetables = useSelector((state) => state.vegetable.vegetables);
  const units = useSelector((state) => state.unit.units);
  const loading = useSelector((state) => state.vegetable.loading);

  useEffect(() => {
    dispatch(fetchVegetables());
    dispatch(fetchUnitTypes());
  }, [dispatch]);
  function convertImage(url) {
    if (url) {
      // Use regex to add "haat" before "/media"
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }
  const handleSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        const { name, unit_type, description, photo } = values;
        const vegetableData = new FormData();
        vegetableData.append("name", name);
        vegetableData.append("unit_type", unit_type);
        vegetableData.append("description", description);
        if (photo && photo.fileList && photo.fileList.length > 0) {
          vegetableData.append("photo", photo.fileList[0].originFileObj);
        }

        dispatch(submitVegetable(vegetableData));
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
        const { name, unit_type, description, photo } = values;
        const vegetableData = new FormData();
        vegetableData.append("name", name);
        vegetableData.append("unit_type", unit_type);
        vegetableData.append("description", description);
        if (photo && photo.fileList && photo.fileList.length > 0) {
          vegetableData.append("photo", photo.fileList[0].originFileObj);
        }

        dispatch(updateVegetable({ id: currentVegetableId, vegetableData }));
        setIsModalVisible(false);
        editForm.resetFields();
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  const handleDelete = (id) => {
    confirm({
      title: "के तपाईँ यो सागसब्जी मेटाउन निश्चित हुनुहुन्छ?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteVegetable(id));
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const openEditModal = (record) => {
    setCurrentVegetableId(record.id);
    editForm.setFieldsValue({
      name: record.name,
      unit_type: record.unit_type.id,
      description: record.description,
      photo: record.photo
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: record.photo,
            },
          ]
        : [],
    });
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "आईडी",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "फोटो",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img
          src={convertImage(text)}
          alt="Vegetable"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "एकाइ प्रकार",
      dataIndex: "unit_type",
      key: "unit_type",
      render: (unit) => unit.name,
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
        <Card title="सागसब्जी">
          <Form.Item
            label="नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया सागसब्जीको नाम प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input className="py-1" />
          </Form.Item>
          <Form.Item
            label="एकाइ प्रकार"
            name="unit_type"
            rules={[
              { required: true, message: "कृपया एकाइ प्रकार चयन गर्नुहोस्" },
            ]}
          >
            <Select placeholder="एकाइ प्रकार चयन गर्नुहोस्">
              {units.map((unit) => (
                <Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="विवरण"
            name="description"
            rules={[
              {
                required: true,
                message: "कृपया सागसब्जीको विवरण प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input className="py-1" />
          </Form.Item>
          <Form.Item
            label="फोटो"
            name="photo"
            rules={[
              { required: true, message: "कृपया एक फोटो अपलोड गर्नुहोस्" },
            ]}
          >
            <Upload accept="image/*" beforeUpload={() => false}>
              <Button icon={<PlusOutlined />}>फोटो अपलोड गर्नुहोस्</Button>
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            className="py-3 text-sm"
            onClick={handleSubmit}
            icon={<PlusOutlined />}
          >
            सागसब्जी थप्नुहोस्
          </Button>
        </Card>
      </Form>
      <Table
        className="mt-4"
        dataSource={vegetables}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="सागसब्जी सम्पादन गर्नुहोस्"
        visible={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          editForm.resetFields();
        }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया सागसब्जीको नाम प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="एकाइ प्रकार"
            name="unit_type"
            rules={[
              { required: true, message: "कृपया एकाइ प्रकार चयन गर्नुहोस्" },
            ]}
          >
            <Select placeholder="एकाइ प्रकार चयन गर्नुहोस्">
              {units.map((unit) => (
                <Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="विवरण"
            name="description"
            rules={[
              {
                required: true,
                message: "कृपया सागसब्जीको विवरण प्रविष्ट गर्नुहोस्",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="फोटो" name="photo">
            <Upload accept="image/*" beforeUpload={() => false}>
              <Button icon={<PlusOutlined />}>फोटो अपलोड गर्नुहोस्</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Vegetable;
