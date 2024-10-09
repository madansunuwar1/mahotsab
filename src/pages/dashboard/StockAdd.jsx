import React, { useEffect } from "react";
import { Button, Form, Input, Select, Card, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchVarieties } from "../../redux/varietySlice"; // Thunk for fetching varieties
import { fetchProperties } from "../../redux/propertySlice"; // Thunk for fetching properties
import { addStock } from "../../redux/stockSlice";

const StockAdd = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();

  const { varieties, loading: varietyLoading } = useSelector(
    (state) => state.variety
  );
  const { properties, loading: propertyLoading } = useSelector(
    (state) => state.property
  );
  const userId = useSelector((state) => state.auth.userId); // Access the user ID
  console.log(userId);
  useEffect(() => {
    dispatch(fetchVarieties());
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("variety", values.variety);
    formData.append(
      "wholesale_price_per_unit",
      values.wholesale_price_per_unit
    );
    formData.append("retail_price_per_unit", values.retail_price_per_unit);
    formData.append("stock_quantity", values.stock_quantity);
    formData.append("available_retail", values.available_retail);
    formData.append("available_wholesale", values.available_wholesale);
    formData.append("wholesale_min_quantity", values.wholesale_min_quantity);
    formData.append("user", userId);
    formData.append("certification", "");
    formData.append("freshness", "");
    formData.append("origin", "");
    formData.append("packaging", "");

    if (values.properties && values.properties.length > 0) {
      values.properties.forEach((propertyId) => {
        formData.append("properties", parseInt(propertyId, 10));
      });
    }

    if (values.media && values.media.fileList) {
      values.media.fileList.forEach((file) => {
        formData.append("media", file.originFileObj);
      });
    }

    dispatch(addStock(formData))
      .unwrap() // If you're using Redux Toolkit with createAsyncThunk, you can use unwrap for error handling
      .then(() => {
        notification.success({
          message: "स्टक सफलतापूर्वक थपियो",
          description: "तपाईंको स्टक सफलतापूर्वक थपिएको छ।",
        });
        form.resetFields(); // Reset the form after submission
      })
      .catch((error) => {
        console.log("Error object:", error); // Log the entire error object for debugging

        // Assuming error is structured like { wholesale_price_per_unit: ['A valid number is required.'] }
        const errorFields = Object.keys(error).map((field) => ({
          name: field,
          errors: error[field], // Access the error messages directly
        }));
        // Set the error fields on the form
        form.setFields(errorFields);

        notification.error({
          message: "स्टक थप्नमा समस्या",
          description: "कृपया पछि पुनः प्रयास गर्नुहोस्।",
        });
      });
  };

  const handleChange = (info) => {
    if (info.file.size > 5000000) {
      // Limit file size to 5MB
      notification.error({
        message: "फाइल ठुलो छ",
        description: "कृपया ५ एमबी भन्दा कम फाइल अपलोड गर्नुहोस्।",
      });
      return;
    }

    const isValidType = ["image/jpeg", "image/png"].includes(info.file.type);
    if (!isValidType) {
      notification.error({
        message: "अवैध फाइल प्रकार",
        description: "कृपया JPG वा PNG फाइल मात्र अपलोड गर्नुहोस्।",
      });
      return;
    }

    if (info.file.status === "done") {
      console.log("File uploaded successfully:", info.file);
    } else if (info.file.status === "error") {
      console.error("File upload error:", info.file.error);
    }
  };

  return (
    <Card title="स्टक थप्नुहोस्">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="variety"
          label="उत्पादन चयन गर्नुहोस्"
          rules={[
            { required: true, message: "तपाईंले उत्पादन चयन गर्न आवश्यक छ" },
          ]}
        >
          <Select
            placeholder="कृपया आफ्नो उत्पादन चयन गर्नुहोस्"
            loading={varietyLoading}
            allowClear
          >
            {varieties?.map((variety) => (
              <Option key={variety.id} value={variety.id}>
                <div className="flex">
                  <img
                    src={variety.image_url}
                    className="h-8 w-8"
                    alt={variety.name}
                    style={{ marginRight: 8 }}
                  />
                  <span>{variety.name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="properties"
          label="गुणहरू चयन गर्नुहोस्"
          rules={[{ required: true, message: "गुणहरू चयन गर्नुहोस्" }]}
        >
          <Select
            mode="multiple"
            placeholder="कृपया गुणहरू चयन गर्नुहोस्"
            loading={propertyLoading}
            allowClear
          >
            {properties?.map((property) => (
              <Option key={property.id} value={property.id.toString()}>
                {property.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="media" label="फोटो अपलोड गर्नुहोस्">
          <Upload
            name="file"
            listType="picture"
            multiple
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>तस्वीर अपलोड गर्नुहोस्</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="wholesale_price_per_unit"
          label="थोक मूल्य"
          rules={[{ required: true, message: "थोक मूल्य प्रविष्ट गर्नुहोस्" }]}
        >
          <Input placeholder="थोक मूल्य प्रविष्ट गर्नुहोस्" />
        </Form.Item>
        <Form.Item
          name="retail_price_per_unit"
          label="खुद्रा मूल्य"
          rules={[
            { required: true, message: "खुद्रा मूल्य प्रविष्ट गर्नुहोस्" },
          ]}
        >
          <Input placeholder="खुद्रा मूल्य प्रविष्ट गर्नुहोस्" />
        </Form.Item>
        <Form.Item
          name="stock_quantity"
          label="मात्रा"
          rules={[{ required: true, message: "मात्रा प्रविष्ट गर्नुहोस्" }]}
        >
          <Input placeholder="मात्रा प्रविष्ट गर्नुहोस्" />
        </Form.Item>
        <Form.Item name="available_retail" label="खुद्रा मा उपलब्ध">
          <Select>
            <Option value="1">हो</Option>
            <Option value="0">होइन</Option>
          </Select>
        </Form.Item>
        <Form.Item name="available_wholesale" label="थोक मा उपलब्ध">
          <Select>
            <Option value="1">हो</Option>
            <Option value="0">होइन</Option>
          </Select>
        </Form.Item>
        <Form.Item name="wholesale_min_quantity" label="थोक न्यूनतम मात्रा">
          <Input placeholder="थोक न्यूनतम मात्रा प्रविष्ट गर्नुहोस्" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            पेश गर्नुहोस्
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default StockAdd;
