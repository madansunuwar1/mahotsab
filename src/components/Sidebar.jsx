import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme, Grid, notification, SubMenu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux"; // Import useDispatch
import { logout } from "../redux/authSlice"; // Import the logout action
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import StockAdd from "../pages/dashboard/StockAdd";
import ViewStock from "../pages/dashboard/ViewStock";
import logo from "../assets/images/mun.png";
import dashicon from "../assets/images/dashboard.png";
import veg from "../assets/images/vegetables.png";
import ver from "../assets/images/housekeeper.png";
import vet from "../assets/images/vegetable.png";
import order from "../assets/images/tracking.png";
import lili from "../assets/images/contact-list.png";
import pd from "../assets/images/product-development.png";
import Order from "../pages/dashboard/Order";
import Orderdetail from "../pages/dashboard/Orderdetail";
import Invoice from "../pages/dashboard/Invoice";
import Farmerlist from "../pages/dashboard/Farmerlist";
import Farmerdetail from "../pages/dashboard/Farmerdetail";
import trd from "../assets/images/transaction.png";
import uni from "../assets/images/weight.png";
import ve from "../assets/images/vegetablee.png";
import di from "../assets/images/distribution.png";
import Transaction from "../pages/dashboard/Transaction";
import Transactiondetail from "../pages/dashboard/Transactiondetail";
import cop from "../assets/images/agreement.png";
import cons from "../assets/images/consumer.png";
import mp from "../assets/images/municipal-house.png";
import Coperativelist from "../pages/dashboard/Coperativelist";
import flag from "../assets/images/WavingFlag.gif";
import Unit from "../pages/dashboard/Unit";
import Vegetable from "../pages/dashboard/Vegetable";
import Variety from "../pages/dashboard/Variety";
import Property from "../pages/dashboard/Property";
import Restock from "../pages/dashboard/Restock";
import PriceHistory from "../pages/dashboard/PriceHistory";
import AddOrder from "../pages/dashboard/AddOrder";
import ee from "../assets/images/add.png";
import settings from "../assets/images/settings.png";
import AddCooperative from "../pages/dashboard/AddCooperative";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Item } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = JSON.parse(localStorage.getItem("user"));
  const group = userData ? userData.groups : [];

  const {
    token: { colorBgLayout, borderRadiusLG },
  } = theme.useToken();
  const screens = useBreakpoint();

  useEffect(() => {
    const isSmallScreen = !screens.md;
    setCollapsed(isSmallScreen);
  }, [screens.md]);

  const handleToggle = () => {
    if (!screens.md) return;
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Show success notification
    notification.success({
      message: "Logged Out",
      description: "You have been successfully logged out.",
      placement: "topRight",
    });

    // Redirect to login or home page
    setTimeout(() => {
      navigate("/"); // Assuming the login page is the home page
    }, 2000); // Delay to allow notification to be seen
  };

  const getMenuItems = () => {
    return (
      <Menu mode="inline">
        {group.includes("Cooperative") && (
          <>
            <Item
              key="11"
              icon={<img src={dashicon} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashboard">ड्यासबोर्ड</Link>
            </Item>
            <Item
              key="23"
              icon={<img src={ver} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashprofile">प्रोफाइल</Link>
            </Item>
            <Item
              key="24"
              icon={<img src={vet} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/viewstock">स्टक हेर्नुहोस्</Link>
            </Item>
            <Item
              key="25"
              icon={<img src={order} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashorder">अर्डर हेर्नुहोस्</Link>
            </Item>
            <Item
              key="26"
              icon={<img src={lili} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/farmerlist">किसानहरूको सूची</Link>
            </Item>
            <Item
              key="42"
              icon={<img src={lili} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/priceupdate">मूल्य अद्यावधिक</Link>
            </Item>
            <Item
              key="27"
              icon={<img src={trd} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/transaction">लेनदेन इतिहास</Link>
            </Item>
            <Item
              key="51"
              icon={<img src={order} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/minusstock">स्टक कटौती</Link>
            </Item>
          </>
        )}
        {group.includes("Farmer") && (
          <>
            <Item
              key="11"
              icon={<img src={dashicon} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashboard">ड्यासबोर्ड</Link>
            </Item>
            <Item
              key="23"
              icon={<img src={ver} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashprofile">प्रोफाइल</Link>
            </Item>
            {/* <Item
              key="22"
              icon={<img src={veg} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/stockadd">स्टक थप्नुहोस्</Link>
            </Item>
            <Item
              key="41"
              icon={<img src={veg} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/restock">पुन: भण्डारण</Link>
            </Item> */}
            <Item
              key="24"
              icon={<img src={vet} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/viewstock">स्टक हेर्नुहोस्</Link>
            </Item>
            <Item
              key="25"
              icon={<img src={order} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashorder">अर्डर हेर्नुहोस्</Link>
            </Item>
            <Item
              key="51"
              icon={<img src={order} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/minusstock">स्टक कटौती</Link>
            </Item>
          </>
        )}
        {group.includes("Municipality") && (
          <>
            <Item
              key="11"
              icon={<img src={dashicon} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashboard">ड्यासबोर्ड</Link>
            </Item>
            <Item
              key="23"
              icon={<img src={ver} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/dashprofile">प्रोफाइल</Link>
            </Item>
            <Item
              key="26"
              icon={<img src={lili} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/farmerlist">किसानहरूको सूची</Link>
            </Item>
            <Item
              key="30"
              icon={<img src={cop} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/Coperativelist">सहकारीको सूची</Link>
            </Item>
            <Item
              key="55"
              icon={<img src={ee} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/addcooperative">सहकारी थप्नुहोस्</Link>
            </Item>
            <Item
              key="27"
              icon={<img src={trd} alt="ड्यासबोर्ड" className="w-8 h-8" />}
            >
              <Link to="/transaction">लेनदेन इतिहास</Link>
            </Item>
            <Menu.SubMenu
              key="settings"
              title="सेटिङ"
              icon={<img src={settings} alt="सेटिङ" className="w-8 h-8" />}
            >
              <Item
                key="36"
                icon={<img src={uni} alt="ड्यासबोर्ड" className="w-8 h-8" />}
              >
                <Link to="/unit">मापन एकाइहरू थप्नुहोस्</Link>
              </Item>
              <Item
                key="37"
                icon={<img src={ve} alt="ड्यासबोर्ड" className="w-8 h-8" />}
              >
                <Link to="/vegetable">तरकारी विविधता</Link>
              </Item>
              <Item
                key="38"
                icon={<img src={di} alt="ड्यासबोर्ड" className="w-8 h-8" />}
              >
                <Link to="/variety">तरकारी थप्नुहोस्</Link>
              </Item>
              <Item
                key="39"
                icon={<img src={pd} alt="ड्यासबोर्ड" className="w-8 h-8" />}
              >
                <Link to="/property">ट्यागहरू</Link>
              </Item>
            </Menu.SubMenu>
            {/* <Item
              key="40"
              icon={<img src={settings} alt="सेटिङ" className="w-8 h-8" />}
            >
              <Link>सेटिङ</Link>
            </Item> */}
          </>
        )}
      </Menu>
    );
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={` ${collapsed ? "mt-8" : "text-center mt-4"}`}>
          <img
            src={logo}
            alt="logo"
            className={`mx-auto ${collapsed ? "w-14 h-14 mb-8" : "w-24 h-24"}`}
          />
          <p
            className={`text-white font-bold md:text-lg py-2 md:py-4 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            सुनकोशी गाउँपालिका
            <br /> हाट - बजार
          </p>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {getMenuItems()}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="flex justify-between items-center"
          style={{ padding: 0, background: "#eeeeee" }}
        >
          <div className="flex">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleToggle}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="my-auto mx-auto hidden md:block">
              <img
                src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg"
                alt="profile"
                className="rounded-full h-10 w-10"
              />
            </div>
            <div className="ml-8 text-xl my-auto">
              स्वागत छ {userData.person.user.username}
            </div>
          </div>
          <div className="flex">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button type="primary" className="mr-2 md:mr-6 hidden md:block">
                <span>साइटमा जानुहोस्</span>
              </Button>
            </a>
            <a>
              <Button
                type="primary"
                className="mr-2 md:mr-6 hidden md:block"
                onClick={handleLogout}
              >
                <span>लग आउट</span>
              </Button>
            </a>
            <div className="my-auto">
              <img src={flag} alt="profile" className=" h-10 w-10" />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 820,
            background: colorBgLayout,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashprofile" element={<Profile />} />
            <Route path="/stockadd" element={<StockAdd />} />
            <Route path="/viewstock" element={<ViewStock />} />
            <Route path="/dashorder" element={<Order />} />
            <Route path="/orderdetail" element={<Orderdetail />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/farmerlist" element={<Farmerlist />} />
            <Route path="/farmerdetail" element={<Farmerdetail />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/transactiondetail" element={<Transactiondetail />} />
            <Route path="/coperativelist" element={<Coperativelist />} />
            <Route path="/unit" element={<Unit />} />
            <Route path="/vegetable" element={<Vegetable />} />
            <Route path="/variety" element={<Variety />} />
            <Route path="/property" element={<Property />} />
            <Route path="/restock" element={<Restock />} />
            <Route path="/priceupdate" element={<PriceHistory />} />
            <Route path="/minusstock" element={<AddOrder />} />
            <Route path="/addcooperative" element={<AddCooperative />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
