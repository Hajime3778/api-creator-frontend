import 'ress';
import 'antd/dist/antd.css';
import 'src/styles/global.scss';

import Axios from 'axios';
import NextApp from 'next/app';
import { Layout } from 'src/components/layout';
import { Api } from 'src/types/api';

const apiAdminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const apiVersion = 'v1';
Axios.defaults.baseURL = `${apiAdminUrl}/api/${apiVersion}/`;
Axios.defaults.validateStatus = (status) => (status >= 200 && status < 300) || status == 400 || status == 404;

interface Props {
  apis: Api[];
}

class App extends NextApp<Props> {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default App;
