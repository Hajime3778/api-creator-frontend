import { Button, Input, Tooltip } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ModelEditButton } from 'src/components/common/modelEditButton';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';

import { apisRepository } from '../../../repository/apisRepository';
import { methodsRepository } from '../../../repository/methodsRepository';

const { TextArea } = Input;

interface Props {
  api: Api;
  method: Method;
}

const MethodPage: NextPage<Props> = ({ api, method }) => {
  const router = useRouter();
  const methodId = router?.query.method as string;
  const isCreate = methodId === 'create-method';

  return (
    <div>
      <h1>{api.url}</h1>
      <h2>Method Type</h2>
      <Input placeholder="type" value={method.type} className="mb-20" />
      <h2>Method URL Parameter</h2>
      <Input placeholder="url" value={method.url} className="mb-20" />
      <h2>Description</h2>
      <TextArea placeholder="description" rows={4} value={method.description} className="mb-20" />
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary">
                Create Method
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary">
                  Save Method
                </Button>
                <Button className="action-button ml-20" size="large" danger>
                  Delete Method
                </Button>
              </React.Fragment>
            );
          }
        })()}
      </div>
    </div>
  );
};

MethodPage.getInitialProps = async ({ query }) => {
  const apiId = query.id as string;
  const methodId = query.method as string;

  if (methodId === 'create-method') {
    const api = await apisRepository.getById(apiId);
    const method: Method = {
      id: '',
      apiId: '',
      type: '',
      url: '',
      description: '',
      requestParameter: '',
      requestModelId: '',
      responseModelId: '',
      isArray: false,
    };
    return { api, method };
  }

  const [api, method] = await Promise.all([apisRepository.getById(apiId), methodsRepository.getById(methodId)]);
  return { api, method };
};

export default MethodPage;
