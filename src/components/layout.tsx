// import { Sidebar } from "src/components/sidebar";
import { Layout as AntLayout } from 'antd';
import React, { useState } from 'react';
import { Footer } from 'src/components/footer';
import { Sidebar } from 'src/components/sidebar';

const { Content } = AntLayout;

export const Layout: React.FC = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapse(collapsed);
  };
  return (
    <>
      <AntLayout>
        <Sidebar onCollapse={onCollapse} />
        <AntLayout
          className="site-layout"
          style={{
            transitionDuration: '0.15s',
            marginLeft: collapse ? 0 : 300,
          }}
        >
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 10 }}>{children}</div>
          </Content>
          <Footer />
        </AntLayout>
      </AntLayout>
    </>
  );
};
