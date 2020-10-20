import { ApiOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Api } from 'src/types/api';

const { Sider } = Layout;
const width = '260';

interface Props {
  apis: Api[];
}

export const Sidebar: React.FC<Props> = ({ apis }) => {
  const router = useRouter();
  const pathName = router?.pathname;
  const apiId = pathName === '/apis/[id]' ? (router?.query.id as string) : '';

  return (
    <Sider
      theme="light"
      width={width}
      style={{ color: '#2F2F2F' }}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo-area">
        <img src="/images/apig.png" className="logo" alt={'apig'} />
        <span className="logo-title">API CREATOR</span>
      </div>
      <Menu theme="light" mode="inline" style={{ color: '#2F2F2F' }} defaultSelectedKeys={[apiId]}>
        {apis?.map((api) => {
          return (
            <Menu.Item key={api.id} icon={<ApiOutlined />} onClick={() => router.push('/apis/[id]', `/apis/${api.id}`)}>
              {`${api.url}`}
            </Menu.Item>
          );
        })}
        <Menu.Item key="/" icon={<HomeOutlined />} onClick={() => router.push('/')}>
          Home
        </Menu.Item>
        <Menu.Item key="/about" icon={<UserOutlined />} onClick={() => router.push('/about')}>
          About
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
