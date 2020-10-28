import { EditFilled } from '@ant-design/icons';
import { Button, Input, Table, Tag, Tooltip } from 'antd';
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

function methodColor(methodType: string): string {
  switch (methodType) {
    case 'GET':
      return '#87d068';
    case 'POST':
      return '#ffa500';
    case 'PUT':
      return '#1e90ff';
    case 'DELETE':
      return '#ff6347';
    default:
      return '#5d5d5d';
  }
}

const ApiPage: NextPage<Props> = ({ api, model, methods }) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (type: string) => (
        <Tag style={{ width: 50, textAlign: 'center' }} color={methodColor(type)}>
          {type === 'DELETE' ? 'DEL' : type}
        </Tag>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => <a>{api.url + text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      <h1>{api.name}</h1>
      <h2>URL</h2>
      <Input placeholder="url" value={api.url} className="mb-20" />
      <h2>Description</h2>
      <TextArea placeholder="description" rows={4} value={api.description} className="mb-20" />
      <h2>Model</h2>
      {/* コンポーネント化する */}
      <div className="model-edit">
        <div className="model-name">{model.name}</div>
        <Tooltip title="Edit model">
          <Button className="ml-10" type="primary" shape="circle" icon={<EditFilled />} />
        </Tooltip>
      </div>
      <h2>
        Methods
        <Tooltip title="Create new method">
          <Button className="ml-10" type="primary">
            +New
          </Button>
        </Tooltip>
      </h2>
      <div className="methods-table-area">
        {/* {methods.map((method) => {
          return <p key={method.id}>{`${method.type},${api.url}${method.url},${method.description}`}</p>;
        })} */}
        <Table<Method> columns={columns} dataSource={methods} />
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
  return { api, model, methods };
};

export default ApiPage;
