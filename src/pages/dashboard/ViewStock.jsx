import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Spin,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  notification,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, updateStock, addStock } from "../../redux/stockSlice"; // Ensure addStock is imported
import { fetchVarieties } from "../../redux/varietySlice"; // Ensure addStock is imported
import { addPriceHistory } from "../../redux/priceHistorySlice";
import { fetchProperties } from "../../redux/propertySlice";
import moment from "moment";

const ViewStock = () => {
  const [isStockModalVisible, setStockModalVisible] = useState(false);
  const [isAddStockVisible, setAddStockVisible] = useState(false); // State for Add Stock form
  const [currentStock, setCurrentStock] = useState(null);
  const [formStock] = Form.useForm();
  const [formAddStock] = Form.useForm(); // Form for adding stock

  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stock);
  const { varieties } = useSelector((state) => state.variety);
  const { properties } = useSelector((state) => state.property);
  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  // Check if userData exists and has the necessary properties
  const userId = userData?.person?.user?.id;

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchVarieties());
    dispatch(fetchProperties());
  }, [dispatch]);

  // Handle stock modal
  const showStockModal = (stock) => {
    setCurrentStock(stock);
    setStockModalVisible(true);
  };

  const handleStockSubmit = (values) => {
    const stockData = {
      id: currentStock.id,
      variety: currentStock.variety.id,
      wholesale_price_per_unit: currentStock.wholesale_price_per_unit,
      retail_price_per_unit: currentStock.retail_price_per_unit,
      stock_quantity: values.stock_quantity,
      user: currentStock.user.id,
      available_retail: currentStock.available_retail,
      available_wholesale: currentStock.available_wholesale,
    };
    if (values.media && values.media.length > 0) {
      stockData.media = values.media.map((file) => file.originFileObj);
    }

    dispatch(updateStock({ stockData }))
      .unwrap()
      .then(() => {
        notification.success({
          message: "स्टक सफलतापूर्वक अपडेट गरियो",
          description: "तपाईंको स्टक सफलतापूर्वक अपडेट गरिएको छ।",
        });
        setStockModalVisible(false);
        formStock.resetFields();
      })
      .catch((error) => {
        notification.error({
          message: "स्टक अपडेट गर्नमा समस्या",
          description: error.message || "कृपया पछि पुनः प्रयास गर्नुहोस्।",
        });
      });
  };

  // Handle add stock submit
  const handleAddStockSubmit = (values) => {
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
    if (values.properties) {
      formData.append("properties", JSON.stringify(values.properties));
    }
    if (values.media && values.media.fileList) {
      values.media.fileList.forEach((file) => {
        formData.append("media", file.originFileObj);
      });
    }

    dispatch(addStock(formData))
      .unwrap()
      .then(() => {
        notification.success({
          message: "स्टक सफलतापूर्वक थपियो",
          description: "तपाईंको स्टक सफलतापूर्वक थपिएको छ।",
        });
        setAddStockVisible(false);
        formAddStock.resetFields();
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          const errorFields = Object.keys(error).map((field) => ({
            name: field,
            errors: error[field],
          }));

          formAddStock.setFields(errorFields);
        }

        notification.error({
          message: "स्टक थप्नमा समस्या",
          description: error.message || "कृपया पछि पुनः प्रयास गर्नुहोस्।",
        });
      });
  };

  if (loading) return <Spin size="large" />;
  if (error) return <div>Error fetching data: {error.message || error}</div>;
  function convertImage(url) {
    if (url) {
      // Use regex to add "haat" before "/media"
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  const handleWholesalePriceChange = (e) => {
    const value = e.target.value;
    formAddStock.setFieldsValue({ available_wholesale: !!value });
  };

  const handleRetailPriceChange = (e) => {
    const value = e.target.value;
    formAddStock.setFieldsValue({ available_retail: !!value });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setAddStockVisible(true)}
        className="my-8"
      >
        Add Stock
      </Button>
      <div className="gap-4 grid-cols-1 md:grid-cols-2 grid xl:grid-cols-2">
        {stocks && stocks.length > 0 ? (
          stocks.map((stock) => (
            <Card key={stock.id} title={stock.variety.name}>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-8 items-center">
                  <img
                    src={convertImage(stock.variety.photo)}
                    alt={stock.variety.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="w-fit">
                    <h2 className="font-bold text-md">थोक मूल्य</h2>
                    <p className="text-sm">
                      रु {stock.wholesale_price_per_unit}
                    </p>
                  </div>
                  <div className="w-fit">
                    <h2 className="font-bold text-md">खुद्रा मूल्य</h2>
                    <p className="text-sm">रु {stock.retail_price_per_unit}</p>
                  </div>
                  <div className="w-fit">
                    <h2 className="font-bold text-md">स्टक को मात्रा</h2>
                    <p className="text-sm">{stock.stock_quantity} किलो</p>
                  </div>
                </div>
                <Space>
                  <Button onClick={() => showStockModal(stock)} type="primary">
                    Edit Stock
                  </Button>
                  {/* <Button onClick={() => showPriceModal(stock)}>
                    Edit Price
                  </Button> */}
                </Space>
              </div>
            </Card>
          ))
        ) : (
          <div>No stock data available</div>
        )}

        {/* Add Stock Modal */}
        <Modal
          title="Add Stock"
          visible={isAddStockVisible}
          onCancel={() => setAddStockVisible(false)}
          footer={null}
        >
          <Form
            form={formAddStock}
            layout="vertical"
            onFinish={handleAddStockSubmit}
          >
            <Form.Item
              name="variety"
              label="उत्पादन चयन गर्नुहोस्"
              rules={[
                {
                  required: true,
                  message: "तपाईंले उत्पादन चयन गर्न आवश्यक छ",
                },
              ]}
            >
              <Select placeholder="कृपया आफ्नो उत्पादन चयन गर्नुहोस्">
                {varieties?.map((variety) => (
                  <Select.Option key={variety.id} value={variety.id}>
                    {variety.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="wholesale_price_per_unit"
              label="थोक मूल्य"
              rules={[
                { required: true, message: "थोक मूल्य प्रविष्ट गर्नुहोस्" },
              ]}
            >
              <Input
                placeholder="थोक मूल्य प्रविष्ट गर्नुहोस्"
                onChange={handleWholesalePriceChange} // Attach change handler here
              />
            </Form.Item>
            <Form.Item
              name="available_wholesale"
              label="थोक उपलब्धता"
              valuePropName="checked"
            >
              <Checkbox>उपलब्ध</Checkbox>
            </Form.Item>

            <Form.Item
              name="retail_price_per_unit"
              label="खुद्रा मूल्य"
              rules={[
                { required: true, message: "खुद्रा मूल्य प्रविष्ट गर्नुहोस्" },
              ]}
            >
              <Input
                placeholder="खुद्रा मूल्य प्रविष्ट गर्नुहोस्"
                onChange={handleRetailPriceChange} // Attach change handler here
              />
            </Form.Item>
            <Form.Item
              name="available_retail"
              label="खुद्रा उपलब्धता"
              valuePropName="checked"
            >
              <Checkbox>उपलब्ध</Checkbox>
            </Form.Item>

            <Form.Item
              name="stock_quantity"
              label="मात्रा"
              rules={[{ required: true, message: "मात्रा प्रविष्ट गर्नुहोस्" }]}
            >
              <Input placeholder="मात्रा प्रविष्ट गर्नुहोस्" />
            </Form.Item>
            <Form.Item
              name="wholesale_min_quantity"
              label="थोक मिनिमम मात्रा"
              rules={[
                {
                  required: true,
                  message: "थोक मिनिमम मात्रा प्रविष्ट गर्नुहोस्",
                },
              ]}
            >
              <Input placeholder="थोक मिनिमम मात्रा प्रविष्ट गर्नुहोस्" />
            </Form.Item>
            <Form.Item name="media" label="मिडिया अपलोड गर्नुहोस्">
              <Upload beforeUpload={() => false} multiple>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="properties"
              label="विशेषताहरू"
              rules={[
                { required: true, message: "कृपया विशेषताहरू चयन गर्नुहोस्" },
              ]}
            >
              <Select placeholder="विशेषताहरू चयन गर्नुहोस्">
                {properties.map((property) => (
                  <Select.Option key={property.id} value={property.id}>
                    {property.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Stock
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Stock Edit Modal */}
        <Modal
          title="Edit Stock"
          visible={isStockModalVisible}
          onCancel={() => setStockModalVisible(false)}
          footer={null}
        >
          <Form
            form={formStock}
            layout="vertical"
            onFinish={handleStockSubmit}
            initialValues={{
              stock_quantity: currentStock?.stock_quantity,
              wholesale_price_per_unit: currentStock?.wholesale_price_per_unit,
              retail_price_per_unit: currentStock?.retail_price_per_unit,
              media: currentStock?.media || [], // Include current images if any
            }}
          >
            <Form.Item
              name="wholesale_price_per_unit"
              label="थोक मूल्य"
              rules={[
                { required: true, message: "थोक मूल्य प्रविष्ट गर्नुहोस्" },
              ]}
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
              label="स्टक को मात्रा"
              rules={[
                {
                  required: true,
                  message: "स्टक को मात्रा प्रविष्ट गर्नुहोस्",
                },
              ]}
            >
              <Input placeholder="स्टक को मात्रा प्रविष्ट गर्नुहोस्" />
            </Form.Item>
            <Form.Item name="media" label="छवि अपलोड गर्नुहोस्">
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
                multiple
                fileList={(formStock.getFieldValue("media") || []).map(
                  (file) => ({
                    uid: file.id || file.name, // Unique identifier
                    name: file.name || "Image", // Name of the file
                    status: "done", // File upload status
                    url: file.url || file.imageUrl, // URL of the image to display
                  })
                )} // Show current images
                onChange={({ fileList }) =>
                  formStock.setFieldsValue({ media: fileList })
                }
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Stock
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Price Edit Modal */}
        {/* <Modal
          title="Edit Price"
          visible={isPriceModalVisible}
          onCancel={() => setPriceModalVisible(false)}
          footer={null}
        >
          <Form
            form={formPrice}
            layout="vertical"
            onFinish={handlePriceSubmit}
            initialValues={{
              wholesale_price_per_unit: currentStock?.wholesale_price_per_unit,
              retail_price_per_unit: currentStock?.retail_price_per_unit,
              date: moment(currentStock?.date || new Date()),
            }}
          >
            <Form.Item
              name="wholesale_price_per_unit"
              label="थोक मूल्य"
              rules={[
                { required: true, message: "थोक मूल्य प्रविष्ट गर्नुहोस्" },
              ]}
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
              label="मिति"
              rules={[{ required: true, message: "मिति प्रविष्ट गर्नुहोस्" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Price
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </>
  );
};

export default ViewStock;
