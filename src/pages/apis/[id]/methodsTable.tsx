import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table, Tag, Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';
//import { methodsRepository } from '../../repository/methodsRepository';

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

const { confirm } = Modal;

function showConfirm(methodId: string) {
  confirm({
    title: 'Do you want to delete method?',
    icon: <ExclamationCircleOutlined />,
    content: methodId,
    okType: 'danger',
    onOk() {
      // TODO: ここでDelete処理をする
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
}

interface Props {
  api: Api;
  methods: Method[];
}

export const MethodsTable: React.FC<Props> = ({ api, methods }) => {
  // 行の定義
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
      width: '40%',
      render: (url: string, method: Method) => (
        <Link href="/apis/[id]/[method]" as={`/apis/${api.id}/${method.id}`}>
          <a>{api.url + url}</a>
        </Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (text: string, method: Method) => (
        <Tooltip title="Delete method">
          <Button size="small" shape="circle" icon={<DeleteFilled />} onClick={() => showConfirm(method.id)} />
        </Tooltip>
      ),
    },
  ];

  return <Table<Method> rowKey={(method) => method.id} columns={columns} dataSource={methods} />;
};
