// import { Sidebar } from "src/components/sidebar";
import { Layout as AntLayout } from "antd";
import React from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";
import { Sidebar } from "src/components/sidebar";

const { Content } = AntLayout;

export const Layout: React.FC = ({ children }) => (
  <>
    <AntLayout>
      <Sidebar />
      <AntLayout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  </>
);
