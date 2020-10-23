import { EditFilled } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { NextPage } from 'next';
import { Api } from 'src/types/api';

import { apiRepository } from '../../repository/apis';

const { TextArea } = Input;

interface Props {
  api: Api;
}

const ApiPage: NextPage<Props> = ({ api }) => {
  return (
    <div>
      <h1>{api?.name}</h1>
      <h2>URL</h2>
      <Input placeholder="url" value={api?.url} style={{ marginBottom: 20 }} />
      <h2>Description</h2>
      <TextArea placeholder="description" rows={4} value={api?.description} style={{ marginBottom: 20 }} />
      <h2>Model</h2>
      {/* コンポーネント化する */}
      <span style={{ fontSize: 16 }}>model name</span>
      <Tooltip title="Edit model">
        <Button style={{ marginLeft: 10, marginBottom: 20 }} type="primary" shape="circle" icon={<EditFilled />} />
      </Tooltip>
      <h2>
        Methods
        <Button style={{ marginLeft: 10 }} type="primary">
          + New
        </Button>
      </h2>
      <div>メソッド一覧が入る予定。</div>
    </div>
  );
};

ApiPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const api = await apiRepository.getById(id);
  return { api };
};

export default ApiPage;
