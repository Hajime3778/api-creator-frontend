import { Button, Input, Tooltip } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ModelEditButton } from 'src/components/common/modelEditButton';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';
import { Model } from 'src/types/model';

import { apisRepository } from '../../../repository/apisRepository';
import { methodsRepository } from '../../../repository/methodsRepository';
import { modelsRepository } from '../../../repository/modelsRepository';
import { MethodsTable } from './methodsTable';

const { TextArea } = Input;

interface Props {
  api: Api;
  model: Model | null;
  methods: Method[];
}

const ApiPage: NextPage<Props> = ({ api, model, methods }) => {
  const isCreate = false;
  const router = useRouter();

  return (
    <div>
      <h1>
        <input type="text" defaultValue={api.name} />
      </h1>
      <h2>URL</h2>
      <Input placeholder="url" value={api.url} className="mb-20" />
      <h2>Description</h2>
      <TextArea placeholder="description" rows={4} value={api.description} className="mb-20" />
      <h2>Model</h2>
      <ModelEditButton model={model} onClick={() => router.push('/apis/[id]/model', `/apis/${api.id}/model`)} />
      <h2>
        Methods
        <Tooltip title="Create new method">
          <Button
            className="ml-10"
            type="primary"
            onClick={() => router.push('/apis/[id]/[method]', `/apis/${api.id}/create-method`)}
          >
            +New
          </Button>
        </Tooltip>
      </h2>
      <div className="methods-table-area">
        <MethodsTable api={api} methods={methods} />
      </div>
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary">
                Create API
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary">
                  Save API
                </Button>
                <Button className="action-button ml-20" size="large" danger>
                  Delete API
                </Button>
              </React.Fragment>
            );
          }
        })()}
      </div>
    </div>
  );
};

ApiPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const api = await apisRepository.getById(id);
  const [model, methods] = await Promise.all([
    modelsRepository.getByApiId(api.id),
    methodsRepository.getByApiId(api.id),
  ]);

  return { api, model, methods };
};

export default ApiPage;
