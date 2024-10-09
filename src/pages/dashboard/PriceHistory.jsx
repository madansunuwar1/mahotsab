import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../redux/stockSlice"; // Thunk for fetching price variations
import { addPriceHistory } from "../../redux/priceHistorySlice"; // Thunk for adding price history
import moment from "moment";

const PriceHistory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;

  const { stocks, loading: stockLoading } = useSelector(
    (state) => state.stock // Accessing stock results
  );

  useEffect(() => {
    dispatch(fetchStocks()); // Fetch available varieties (price variations)
  }, [dispatch]);

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"), // Format the date to 'YYYY-MM-DD'
    };

    dispatch(addPriceHistory(formattedValues))
      .unwrap()
      .then(() => {
        notification.success({
          message: "मूल्य सफलतापूर्वक सेट गरियो",
          description: "तपाईंको मूल्य इतिहास सफलतापूर्वक थपिएको छ।",
        });
        form.resetFields(); // Reset form after submission
      })
      .catch((error) => {
        notification.error({
          message: "मूल्य सेट गर्न समस्या",
          description: error.message || "कृपया पछि पुनः प्रयास गर्नुहोस्।",
        });
      });
  };

  return (
    <Card title="मूल्य इतिहास सेट गर्नुहोस्">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="price_variation"
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
          name="date"
          label="मिति चयन गर्नुहोस्"
          rules={[{ required: true, message: "मिति चयन गर्नुहोस्" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={(current) =>
              current && current > moment().endOf("day")
            }
          />
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

export default PriceHistory;
