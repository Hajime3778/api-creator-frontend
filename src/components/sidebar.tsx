import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
// import Router from "next/Router";
import React from "react";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathName = router?.pathname ?? "/";

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathName]}>
        <Menu.Item key="/" icon={<HomeOutlined />} onClick={() => router.push("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="/about" icon={<UserOutlined />} onClick={() => router.push("/about")}>
          About
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
