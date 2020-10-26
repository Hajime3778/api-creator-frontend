import 'ress';
import 'antd/dist/antd.css';
import 'src/styles/global.scss';

import Axios from 'axios';
import NextApp, { AppContext } from 'next/app';
import { Layout } from 'src/components/layout';
import { apisRepository } from 'src/repository/apisRepository';
import { Api } from 'src/types/api';
Axios.defaults.baseURL = 'http://localhost:4000/';

interface Props {
  apis: Api[];
}

class App extends NextApp<Props> {
  render(): JSX.Element {
    const { Component, pageProps, apis } = this.props;
    return (
      <Layout apis={apis}>
        <Component {...pageProps} />
      </Layout>
    );
  }

  static async getInitialProps({ Component, ctx }: AppContext): Promise<any> {
    const componentGetInitialProps = Component.getInitialProps || (() => Promise.resolve());
    const [apis, pageProps] = await Promise.all([apisRepository.getAll(), componentGetInitialProps(ctx)]);
    return {
      apis,
      pageProps,
    };
  }
}

export default App;
