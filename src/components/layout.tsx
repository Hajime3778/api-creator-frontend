// import { Sidebar } from "src/components/sidebar";
import { Layout as AntLayout } from 'antd';
import React from 'react';
import { Footer } from 'src/components/footer';
import { Sidebar } from 'src/components/sidebar';
import { Api } from 'src/types/api';

const { Content } = AntLayout;

interface Props {
  apis: Api[];
}

export const Layout: React.FC<Props> = ({ children, apis }) => (
  <>
    <AntLayout>
      <Sidebar apis={apis} />
      <AntLayout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 300 }}>
            {children}
          </div>
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  </>
);
