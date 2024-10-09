import React, { useEffect } from "react";
import { Button, Form, Input, Select, Card, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateStock, fetchStocks } from "../../redux/stockSlice"; // Thunk for updating stock

const Restock = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();

  const { stocks, loading: stockLoading } = useSelector(
    (state) => state.stock // Accessing stock results
  );
  // Fetch varieties and properties on mount
  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleSubmit = (values) => {
    const stockData = {
      vegetable_price_variation: values.variety,
      transaction_type: "restock",
      quantity: values.stock_quantity,
      date: values.date || new Date().toISOString().split("T")[0], // Default to current date if not provided
      user: "1", // Assuming user ID is fixed; adjust if necessary
      checkout: values.checkout || "",
      remark: values.remark || "",
    };

    dispatch(updateStock({ stockData }))
      .unwrap()
      .then(() => {
        notification.success({
          message: "स्टक सफलतापूर्वक अपडेट गरियो",
          description: "तपाईंको स्टक सफलतापूर्वक अपडेट गरिएको छ।",
        });
        form.resetFields(); // Reset the form after submission
      })
      .catch((error) => {
        notification.error({
          message: "स्टक अपडेट गर्नमा समस्या",
          description: error.message || "कृपया पछि पुनः प्रयास गर्नुहोस्।",
        });
      });
  };

  return (
    <Card title="स्टक अपडेट गर्नुहोस्">
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
            loading={stockLoading} // Loading state for stocks
            allowClear
          >
            {stocks?.map((stock) => (
              <Option key={stock.id} value={stock.id}>
                {stock.id}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="stock_quantity"
          label="मात्रा"
          rules={[{ required: true, message: "मात्रा प्रविष्ट गर्नुहोस्" }]}
        >
          <Input placeholder="मात्रा प्रविष्ट गर्नुहोस्" />
        </Form.Item>

        <Form.Item
          name="date"
          label="मिति"
          rules={[{ required: true, message: "मिति प्रविष्ट गर्नुहोस्" }]}
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="checkout" label="Checkout">
          <Input placeholder="Checkout जानकारी" />
        </Form.Item>

        <Form.Item name="remark" label="टिप्पणी">
          <Input.TextArea placeholder="टिप्पणी प्रविष्ट गर्नुहोस्" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            अपडेट गर्नुहोस्
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Restock;
