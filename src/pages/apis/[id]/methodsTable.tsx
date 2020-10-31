import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Tag, Tooltip } from 'antd';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';
import { ActionMessage } from 'src/utils/messages';

import { methodsRepository } from '../../../repository/methodsRepository';

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

interface Props {
  api: Api;
  methods: Method[];
}

export const MethodsTable: React.FC<Props> = ({ api, methods }) => {
  const router = useRouter();

  const showConfirm = (methodId: string) => {
    confirm({
      title: 'Do you want to delete method?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        return methodsRepository
          .delete(methodId)
          .then((response: AxiosResponse<any>) => {
            if (response.status !== 204) {
              message.error(ActionMessage.FailedDelete);
            }
            message.success(ActionMessage.SuccessDelete);
            router.push('/apis/[id]', `/apis/${api.id}`);
          })
          .catch(() => message.error(ActionMessage.FailedDelete));
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    });
  };

  // #region 行の定義
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
  // #endregion

  return <Table<Method> rowKey={(method) => method.id} columns={columns} dataSource={methods} />;
};
