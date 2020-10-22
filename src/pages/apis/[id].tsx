import { Input } from 'antd';
import { NextPage } from 'next';
import { Api } from 'src/types/api';

import { apiRepository } from '../../repository/apis';

interface Props {
  api: Api;
}

const ApiPage: NextPage<Props> = ({ api }) => {
  return (
    <div>
      <h1>{api?.name}</h1>
      <h2>{api?.url}</h2>
      <Input placeholder="url" value={api?.url} />
      <h2>Description</h2>
      <Input placeholder="description" value={api?.description} />
    </div>
  );
};

ApiPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const api = await apiRepository.getById(id);
  return { api };
};

export default ApiPage;
