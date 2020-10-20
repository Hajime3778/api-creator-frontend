import 'ress';
import 'antd/dist/antd.css';
import 'src/styles/global.scss';

import Axios from 'axios';
import type { AppProps } from 'next/app';

Axios.defaults.baseURL = 'http://localhost:4000/';

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
