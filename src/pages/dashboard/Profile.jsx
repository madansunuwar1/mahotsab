import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Modal, Form, Input, Upload, message } from "antd";
import { fetchUser, editUserProfile } from "../../redux/userSlice";
import { UploadOutlined } from "@ant-design/icons";
import nameIcon from "../../assets/images/id-card.png";
import loc from "../../assets/images/house.png";
import pho from "../../assets/images/contact.png";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Open modal with current user data
  const showEditModal = () => {
    form.setFieldsValue(currentUser); // Pre-fill form with user data
    // Set the file list to include the current user's photo
    if (currentUser?.photo) {
      setFileList([
        {
          uid: "-1", // Unique identifier
          name: "current_photo.png", // You can name it as you want
          status: "done", // Indicate that it's done
          url: convertImage(currentUser.photo), // URL of the current user's photo
        },
      ]);
    } else {
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  // Handle profile form submit
  const handleEditProfile = (values) => {
    const formData = new FormData();
    // Append form values and image file if present
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    if (fileList.length > 0) {
      formData.append("photo", fileList[0].originFileObj);
    }

    dispatch(editUserProfile(formData)); // Dispatch action with FormData
    setIsModalVisible(false); // Close modal after submitting
  };

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  if (loading) {
    return <div>लोड भइरहेको छ...</div>;
  }

  function convertImage(url) {
    if (url) {
      // Use regex to add "haat" before "/media"
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  return (
    <Card
      title={
        <div className="bg-[url('https://www.thefrozengarden.com/cdn/shop/articles/img-1706903567765.png?v=1706904048')] bg-cover w-full h-40"></div>
      }
      className="relative"
    >
      <img
        src={
          convertImage(currentUser?.photo) ||
          "https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg"
        }
        alt="profile-image"
        className="rounded-full h-32 w-32 absolute top-24 px-2 py-2 bg-white"
      />
      <div className="flex mt-16">
        <div className="flex flex-col text-start gap-8">
          <div className="my-auto flex">
            <img
              src={nameIcon}
              alt=""
              className="w-10 h-10 object-cover my-auto"
            />
            <div className="ml-8 my-auto">
              <h2 className="text-bold text-xl">नाम</h2>
              <p className="text-gray-800 text-sm">
                {currentUser?.name || "नाम"}
              </p>
            </div>
          </div>
          <div className="my-auto flex">
            <img src={pho} alt="" className="w-10 h-10 object-cover my-auto" />
            <div className="ml-8 my-auto">
              <h2 className="text-bold text-xl">फोन नम्बर</h2>
              <p className="text-gray-800 text-sm">
                {currentUser?.phone || "फोन नम्बर"}
              </p>
            </div>
          </div>
          <div className="my-auto flex">
            <img src={loc} alt="" className="w-10 h-10 object-cover my-auto" />
            <div className="ml-8 my-auto">
              <h2 className="text-bold text-xl">ठेगाना</h2>
              <p className="text-gray-800 text-sm">
                {currentUser?.permanent_address || "ठेगाना"}
              </p>
            </div>
          </div>
          <Button type="primary" onClick={showEditModal}>
            प्रोफाइल सम्पादन गर्नुहोस्
          </Button>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal
        title="प्रोफाइल सम्पादन गर्नुहोस्"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()} // Submit form on OK click
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditProfile}
          initialValues={currentUser}
        >
          <Form.Item label="नाम" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="फोन नम्बर" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="स्थायी ठेगाना" name="permanent_address">
            <Input />
          </Form.Item>
          <Form.Item label="हालको ठेगाना" name="current_address">
            <Input />
          </Form.Item>
          <Form.Item label="पहिचान नम्बर" name="id_no">
            <Input />
          </Form.Item>
          <Form.Item label="प्रोफाइल तस्वीर" name="photo">
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent automatic upload
              fileList={fileList}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>तस्वीर अपलोड गर्नुहोस्</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile;
