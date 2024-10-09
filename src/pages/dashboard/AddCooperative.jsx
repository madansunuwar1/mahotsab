import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerCooperative } from "../../redux/authSlice"; // Adjust import as necessary

const AddCooperative = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = {
      organization: {
        name: values.organization_name,
        address: values.organization_address,
        other_field: values.organization_other_field,
      },
      user: {
        username: values.username,
        password: values.password,
        confirm_password: values.confirm_password,
        email: values.email,
      },
      person: {
        name: values.person_name,
        organization: 1, // Adjust as necessary
        phone: values.phone,
        permanent_place: 1,
        permanent_address: values.permanent_address,
        current_place: 1,
        current_address: values.current_address,
        id_no: values.id_no,
      },
    };
    dispatch(registerCooperative(formData));
  };

  return (
    <div>
      <h1>सहकारी दर्ता गर्नुहोस्</h1>
      <Form
        form={form}
        name="register-cooperative"
        onFinish={onFinish}
        layout="vertical"
      >
        <h2>संस्थाको जानकारी</h2>
        <Form.Item
          name="organization_name"
          label="संस्थाको नाम"
          rules={[
            {
              required: true,
              message: "कृपया संस्थाको नाम प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="संस्थाको नाम" />
        </Form.Item>

        <Form.Item
          name="organization_address"
          label="संस्थाको ठेगाना"
          rules={[
            {
              required: true,
              message: "कृपया संस्थाको ठेगाना प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="संस्थाको ठेगाना" />
        </Form.Item>

        <Form.Item name="organization_other_field" label="अन्य विवरण">
          <Input placeholder="अन्य विवरण" />
        </Form.Item>

        <h2>प्रयोगकर्ताको जानकारी</h2>
        <Form.Item
          name="username"
          label="प्रयोगकर्ता नाम"
          rules={[
            {
              required: true,
              message: "कृपया प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="प्रयोगकर्ता नाम" />
        </Form.Item>

        <Form.Item
          name="password"
          label="पासवर्ड"
          rules={[
            { required: true, message: "कृपया पासवर्ड प्रविष्ट गर्नुहोस्!" },
          ]}
        >
          <Input.Password placeholder="पासवर्ड" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="पासवर्ड पुन: पुष्टि गर्नुहोस्"
          dependencies={["password"]}
          rules={[
            { required: true, message: "कृपया पासवर्ड पुन: पुष्टि गर्नुहोस्!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("दुई पासवर्ड मेल खाँदैनन्!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="पासवर्ड पुन: पुष्टि गर्नुहोस्" />
        </Form.Item>

        <Form.Item
          name="email"
          label="इमेल"
          rules={[
            {
              required: true,
              message: "कृपया इमेल प्रविष्ट गर्नुहोस्!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="इमेल" />
        </Form.Item>

        <h2>व्यक्तिको जानकारी</h2>
        <Form.Item
          name="person_name"
          label="पुरा नाम"
          rules={[
            {
              required: true,
              message: "कृपया व्यक्तिको नाम प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="पुरा नाम" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="फोन"
          rules={[
            { required: true, message: "कृपया फोन नम्बर प्रविष्ट गर्नुहोस्!" },
          ]}
        >
          <Input placeholder="फोन नम्बर" />
        </Form.Item>

        <Form.Item
          name="permanent_address"
          label="स्थायी ठेगाना"
          rules={[
            {
              required: true,
              message: "कृपया स्थायी ठेगाना प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="स्थायी ठेगाना" />
        </Form.Item>

        <Form.Item
          name="current_address"
          label="हालको ठेगाना"
          rules={[
            {
              required: true,
              message: "कृपया हालको ठेगाना प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="हालको ठेगाना" />
        </Form.Item>

        <Form.Item
          name="id_no"
          label="पहिचान नम्बर"
          rules={[
            {
              required: true,
              message: "कृपया पहिचान नम्बर प्रविष्ट गर्नुहोस्!",
            },
          ]}
        >
          <Input placeholder="पहिचान नम्बर" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "दर्ता गर्दै..." : "सहकारी दर्ता गर्नुहोस्"}
          </Button>
        </Form.Item>
      </Form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddCooperative;
