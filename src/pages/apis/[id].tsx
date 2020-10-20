import { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from 'src/components/layout';
import { Api } from 'src/types/api';

import { ApiRepository } from '../../repository/apis';

interface Props {
  apis?: Api[];
  api?: Api;
}

const ApiPage: NextPage<Props> = ({ apis, api }) => {
  return (
    <Layout apis={apis}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{`${api?.id} ${api?.name} ${api?.url} ${api?.description}`}</div>
    </Layout>
  );
};

ApiPage.getInitialProps = async ({ query }) => {
  const repository = new ApiRepository();
  const id = query.id as string;
  const apis = await repository.getAll();
  const api = await repository.getById(id);
  return { apis, api };
};

export default ApiPage;
