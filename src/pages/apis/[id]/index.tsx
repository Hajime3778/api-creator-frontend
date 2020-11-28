import { Button, Form, Input, message, Tooltip } from 'antd';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ModelEditButton } from 'src/components/common/modelEditButton';
import { Api } from 'src/types/api';
import { CreatedResponse } from 'src/types/createdResponse';
import { Error } from 'src/types/error';
import { Method } from 'src/types/method';
import { Model } from 'src/types/model';
import { ActionMessage } from 'src/utils/messages';

import { apisRepository } from '../../../repository/apisRepository';
import { methodsRepository } from '../../../repository/methodsRepository';
import { modelsRepository } from '../../../repository/modelsRepository';
import { MethodsTable } from './methodsTable';

const { TextArea } = Input;

interface Props {
  api: Api | null;
  model: Model | null;
  methods: Method[];
}

const ApiPage: NextPage<Props> = ({ api, model, methods }) => {
  const router = useRouter();
  const apiId = router?.query.id as string;
  const isCreate = apiId === 'create-api';

  const [apiState, setApiState] = useState(api as Api);

  /* 
    nextのダイナミックルーティング時には、ページがリロードされないので
    apiが更新された場合、再レンダリングする。
  */
  useEffect(() => {
    console.log(api?.name);
    setApiState(Object.assign({}, api));
  }, [api, setApiState]);

  // #region State

  const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const api = Object.assign({}, apiState);
    api.name = event.target.value;
    setApiState(api);
  };

  const urlChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const api = Object.assign({}, apiState);
    api.url = event.target.value;
    setApiState(api);
  };

  const descriptionChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const api = Object.assign({}, apiState);
    api.description = event.target.value;
    setApiState(api);
  };

  // #endregion

  // #region Actions

  const requireInputValidate = () => {
    let ret = true;
    let errMsg = '';
    if (apiState.name === '') {
      errMsg += '名前が入力されていません\n';
      ret = false;
    }
    if (apiState.url === '') {
      errMsg += 'URLが入力されていません\n';
      ret = false;
    }

    if (errMsg !== '') {
      message.error(errMsg);
    }
    return ret;
  };

  const createApi = async () => {
    if (!requireInputValidate()) return;

    const response = await apisRepository.create(apiState);

    if (response.status !== 201) {
      const error: Error = response.data as Error;
      message.error(error.error);
      return;
    }
    const api = Object.assign({}, apiState);
    response.data = response.data as CreatedResponse;
    api.id = response.data.id;
    setApiState(api);
    message.success(ActionMessage.SuccessCreate);
    router.push('/apis/[id]', `/apis/${api?.id}`);
  };

  const updateApi = async () => {
    if (!requireInputValidate()) return;
    const response = await apisRepository.update(apiState);

    if (response.status !== 200) {
      const error: Error = response.data as Error;
      message.error(error.error);
      return;
    }

    message.success(ActionMessage.SuccessUpdate);
    router.push('/apis/[id]', `/apis/${api?.id}`);
  };

  const deleteApi = async () => {
    const response = await apisRepository.delete(apiState.id);

    if (response.status !== 204) {
      message.error(ActionMessage.FailedDelete);
      return;
    }
    message.success(ActionMessage.SuccessDelete);
    router.push('/');
  };
  // #endregion

  if (!api) return <DefaultErrorPage statusCode={404} />;

  return (
    <div>
      {(() => {
        if (isCreate) {
          return (
            <React.Fragment>
              <h2>Name</h2>
              <div className="mb-20">
                <Input placeholder="name" value={apiState.name} onChange={nameChanged} />
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <div className="mb-20">
              <input placeholder="name" type="text" value={apiState.name} onChange={nameChanged} />
            </div>
          );
        }
      })()}
      <h2>URL</h2>
      <Input placeholder="my-project/api/sample" value={apiState.url} className="mb-20" onChange={urlChanged} />
      <h2>Description</h2>
      <TextArea
        placeholder="description"
        rows={4}
        value={apiState.description}
        className="mb-20"
        onChange={descriptionChanged}
      />
      {(() => {
        if (!isCreate) {
          return (
            <React.Fragment>
              <h2>Model</h2>
              <ModelEditButton
                model={model}
                onClick={() => router.push('/apis/[id]/model', `/apis/${apiState.id}/model`)}
              />
              <h2>
                Methods
                <Tooltip title="Create new method">
                  <Button
                    className="ml-10"
                    type="primary"
                    onClick={() => router.push('/apis/[id]/[method]', `/apis/${apiState.id}/create-method`)}
                  >
                    +New
                  </Button>
                </Tooltip>
              </h2>
              <div className="methods-table-area mb-20">
                <MethodsTable api={apiState} methods={methods} />
              </div>
            </React.Fragment>
          );
        }
      })()}
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary" onClick={() => createApi()}>
                Create API
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary" onClick={() => updateApi()}>
                  Save API
                </Button>
                <Button className="action-button ml-20" size="large" onClick={() => deleteApi()} danger>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  // API作成画面時
  const isCreated = id === 'create-api';

  const api = isCreated
    ? {
        id: 'create-api',
        name: '',
        url: '',
        description: '',
      }
    : await apisRepository.getById(id);

  if (api == null) return { props: { api: null, model: null, methods: [] } };

  const [model, methods] = await Promise.all([
    modelsRepository.getByApiId(api.id),
    methodsRepository.getByApiId(api.id),
  ]);

  return { props: { api, model, methods } };
};

export default ApiPage;
