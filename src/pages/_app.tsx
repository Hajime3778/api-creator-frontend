import 'ress';
import 'antd/dist/antd.css';
import 'src/styles/global.scss';

import Axios from 'axios';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Layout } from 'src/components/layout';
import { ApisContext } from 'src/context/ApisContext';
import { apisRepository } from 'src/repository/apisRepository';
import { Api } from 'src/types/api';

const apiAdminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const apiVersion = 'v1';
Axios.defaults.baseURL = `${apiAdminUrl}/api/${apiVersion}/`;
Axios.defaults.validateStatus = (status) => (status >= 200 && status < 300) || status == 400 || status == 404;

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const initApis: Api[] = [];
  const [apis, setApis] = useState(initApis);

  useEffect(() => {
    const getApis = async () => {
      // APIをすべて取得する
      const apis = await apisRepository.getAll();
      setApis(apis);
    };
    getApis();
  }, [setApis]);

  return (
    <ApisContext.Provider value={{ apis, setApis }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApisContext.Provider>
  );
};

export default App;
