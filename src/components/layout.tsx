// import { Sidebar } from "src/components/sidebar";
import { Layout as AntLayout } from 'antd';
import React from 'react';
import { Footer } from 'src/components/footer';
import { Sidebar } from 'src/components/sidebar';

const { Content } = AntLayout;

export const Layout: React.FC = ({ children }) => (
  <>
    <AntLayout>
      <Sidebar />
      <AntLayout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 10 }}>{children}</div>
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  </>
);
