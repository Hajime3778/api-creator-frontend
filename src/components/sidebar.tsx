import { ApiOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Menu, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Api } from 'src/types/api';

import { apisRepository } from '../repository/apisRepository';
import styles from './sidebar.module.scss';

const { Sider } = Layout;
const width = '300';

interface Props {
  onCollapse: (collapsed: boolean) => void;
}

// 取得したAPI一覧を保持する(あまり良くないやり方)
let allApis: Api[] = [];

export const Sidebar: React.FC<Props> = ({ onCollapse }) => {
  const apiState: Api[] = [];
  const [apis, setApis] = useState(apiState);
  const [searchText, setSearchText] = useState('');
  const [selectedApiId, setSelectedApiId] = useState('');
  const router = useRouter();
  const apiId = router?.query.id as string;

  useEffect(() => {
    const getApis = async () => {
      // APIをすべて取得する
      const apis = await apisRepository.getAll();
      allApis = apis;
      setApis(apis);
    };
    getApis();
  }, [router, setApis]);

  useEffect(() => {
    setSelectedApiId(apiId);
  }, [apiId, setSelectedApiId]);

  // 検索テキストボックスが変更されたとき
  const textChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 入力値からAPIを絞り込みStateにセットする
    const filteredApis = allApis.filter((api) => {
      return api.url.indexOf(event.target.value) !== -1;
    });
    setSearchText(event.target.value);
    setApis(filteredApis);
  };

  return (
    <Sider
      theme="light"
      width={width}
      style={{
        color: '#2F2F2F',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={onCollapse}
      onCollapse={onCollapse}
    >
      <Link href="/">
        <div className={styles.logoArea}>
          <img src="/images/apig.png" className={styles.logo} alt={'apig'} />
          <span className={styles.logoTitle}>API CREATOR</span>
        </div>
      </Link>
      <div className={styles.searchArea}>
        <Input value={searchText} onChange={textChanged} className={styles.searchText} placeholder="search API" />
        <Tooltip title="Create new API">
          <Button className="ml-10" type="primary" onClick={() => router.push('/apis/[id]', '/apis/create-api')}>
            +New
          </Button>
        </Tooltip>
      </div>
      <Menu theme="light" mode="inline" selectedKeys={[selectedApiId]}>
        {apis.map((api) => {
          return (
            <Menu.Item key={api.id} icon={<ApiOutlined />} onClick={() => router.push('/apis/[id]', `/apis/${api.id}`)}>
              {`${api.url}`}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
