import { NextPage } from 'next';
import { Api } from 'src/types/api';

import { apiRepository } from '../../repository/apis';

interface Props {
  api: Api;
}

const ApiPage: NextPage<Props> = ({ api }) => {
  return <div>{`${api?.id} ${api?.name} ${api?.url} ${api?.description}`}</div>;
};

ApiPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const api = await apiRepository.getById(id);
  return { api };
};

export default ApiPage;
