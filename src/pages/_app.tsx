import 'ress';
import 'antd/dist/antd.css';
import 'src/styles/global.scss';

import Axios from 'axios';
import NextApp from 'next/app';
import { Layout } from 'src/components/layout';
import { Api } from 'src/types/api';

const apiVersion = 'v1';
Axios.defaults.baseURL = `http://localhost:4000/api/${apiVersion}/`;

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
