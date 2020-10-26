import { EditFilled } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { NextPage } from 'next';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';
import { Model } from 'src/types/model';

import { apisRepository } from '../../repository/apisRepository';
import { methodsRepository } from '../../repository/methodsRepository';
import { modelsRepository } from '../../repository/modelsRepository';

const { TextArea } = Input;

interface Props {
  api: Api;
  model: Model;
  methods: Method[];
}

const ApiPage: NextPage<Props> = ({ api, model, methods }) => {
  return (
    <div>
      <h1>{api?.name}</h1>
      <h2>URL</h2>
      <Input placeholder="url" value={api?.url} style={{ marginBottom: 20 }} />
      <h2>Description</h2>
      <TextArea placeholder="description" rows={4} value={api?.description} style={{ marginBottom: 20 }} />
      <h2>Model</h2>
      {/* コンポーネント化する */}
      <span style={{ fontSize: 16 }}>{model.name}</span>
      <Tooltip title="Edit model">
        <Button style={{ marginLeft: 10, marginBottom: 20 }} type="primary" shape="circle" icon={<EditFilled />} />
      </Tooltip>
      <h2>
        Methods
        <Button style={{ marginLeft: 10 }} type="primary">
          + New
        </Button>
      </h2>
      <div>
        {methods.map((method) => {
          return <p key={method.id}>{`${method.type},${method.description},${method.url}`}</p>;
        })}
      </div>
    </div>
  );
};

ApiPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const api = await apisRepository.getById(id);
  const [model, methods] = await Promise.all([
    modelsRepository.getById(api.model_id),
    methodsRepository.getByApiId(api.id),
  ]);
  console.log(methods);
  return { api, model, methods };
};

export default ApiPage;
