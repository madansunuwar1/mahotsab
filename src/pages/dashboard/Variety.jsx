import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVarieties,
  submitVariety,
  updateVariety,
  deleteVariety,
} from "../../redux/varietySlice"; // Adjust the import path as necessary
import { fetchVegetables } from "../../redux/vegetableSlice"; // Adjust the import path
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
  Tag,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
const { Option } = Select;

const Variety = () => {
  const dispatch = useDispatch();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVarietyId, setCurrentVarietyId] = useState(null);
  const varieties = useSelector((state) => state.variety.varieties);
  const vegetables = useSelector((state) => state.vegetable.vegetables);
  const loading = useSelector((state) => state.variety.loading);

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(fetchVarieties());
    dispatch(fetchVegetables());
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
        const { vegetable_id, name, description, photo } = values;
        const varietyData = new FormData();
        varietyData.append("vegetable", vegetable_id); // Change to "vegetable"
        varietyData.append("name", name);
        varietyData.append("description", description);
        if (photo && photo.fileList && photo.fileList.length > 0) {
          varietyData.append("photo", photo.fileList[0].originFileObj);
        }

        dispatch(submitVariety(varietyData));
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
        const { vegetable_id, name, description, photo } = values;
        const varietyData = new FormData();
        varietyData.append("vegetable", vegetable_id); // Change to "vegetable"
        varietyData.append("name", name);
        varietyData.append("description", description);
        if (photo && photo.fileList && photo.fileList.length > 0) {
          varietyData.append("photo", photo.fileList[0].originFileObj);
        }

        dispatch(updateVariety({ id: currentVarietyId, varietyData }));
        setIsModalVisible(false);
        editForm.resetFields();
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  const handleDelete = (id) => {
    confirm({
      title: "के तपाईँ यो भिन्नता मेटाउन निश्चित हुनुहुन्छ?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteVariety(id));
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const openEditModal = (record) => {
    setCurrentVarietyId(record.id);
    editForm.setFieldsValue({
      vegetable_id: record.vegetable_id,
      name: record.name,
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

  const handleTagInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputValue("");
  };

  const handleTagClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
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
          alt="Variety"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "भिन्नता नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "तरकारी",
      dataIndex: "vegetable",
      key: "vegetable",
      render: (vegetables) => vegetables.name,
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
        <Card title="भिन्नता">
          <Form.Item
            label="सागसब्जी चयन गर्नुहोस्"
            name="vegetable_id"
            rules={[
              { required: true, message: "कृपया सागसब्जी चयन गर्नुहोस्" },
            ]}
          >
            <Select placeholder="सागसब्जी चयन गर्नुहोस्">
              {vegetables.map((vegetable) => (
                <Option key={vegetable.id} value={vegetable.id}>
                  {vegetable.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="भिन्नता नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया भिन्नता नाम प्रविष्ट गर्नुहोस्",
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
                message: "कृपया भिन्नता विवरण प्रविष्ट गर्नुहोस्",
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
          <Form.Item label="ट्यागहरू">
            <Input
              type="text"
              value={inputValue}
              onChange={handleTagInputChange}
              onPressEnter={handleTagInputConfirm}
              placeholder="ट्यागहरू प्रविष्ट गर्नुहोस्"
            />
            <div style={{ marginTop: 8 }}>
              {tags.map((tag) => (
                <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Button
            type="primary"
            className="py-3 text-sm"
            onClick={handleSubmit}
            icon={<PlusOutlined />}
          >
            भिन्नता थप्नुहोस्
          </Button>
        </Card>
      </Form>
      <Table
        className="mt-4"
        dataSource={varieties}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="भिन्नता सम्पादन गर्नुहोस्"
        visible={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          editForm.resetFields();
        }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="सागसब्जी चयन गर्नुहोस्"
            name="vegetable_id"
            rules={[
              { required: true, message: "कृपया सागसब्जी चयन गर्नुहोस्" },
            ]}
          >
            <Select placeholder="सागसब्जी चयन गर्नुहोस्">
              {vegetables.map((vegetable) => (
                <Option key={vegetable.id} value={vegetable.id}>
                  {vegetable.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="भिन्नता नाम"
            name="name"
            rules={[
              {
                required: true,
                message: "कृपया भिन्नता नाम प्रविष्ट गर्नुहोस्",
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
                message: "कृपया भिन्नता विवरण प्रविष्ट गर्नुहोस्",
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

export default Variety;
