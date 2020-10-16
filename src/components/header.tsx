import { Layout } from 'antd';

const AntHeader = Layout.Header;

export const Header: React.FC = () => (
  <AntHeader className="site-layout-sub-header-background" style={{ paddingLeft: 20 }}>
    PageName
  </AntHeader>
);
