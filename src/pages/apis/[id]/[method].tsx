import { Button, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Api } from 'src/types/api';
import { Method } from 'src/types/method';

import { apisRepository } from '../../../repository/apisRepository';
import { methodsRepository } from '../../../repository/methodsRepository';
import { MethodTypeSelect } from './methodTypeSelect';

const { TextArea } = Input;

interface Props {
  api: Api;
  method: Method;
}

const MethodPage: NextPage<Props> = ({ api, method }) => {
  const router = useRouter();
  const methodId = router?.query.method as string;
  const isCreate = methodId === 'create-method';

  // #region State
  const [methodState, setMethodState] = useState(method);

  const typeChanged = (value: string) => {
    const method = Object.assign({}, methodState);
    method.type = value;
    setMethodState(method);
  };

  const urlChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = Object.assign({}, methodState);
    method.url = event.target.value;
    setMethodState(method);
  };

  const descriptionChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const method = Object.assign({}, methodState);
    method.description = event.target.value;
    setMethodState(method);
  };

  const isArrayChanged = (event: CheckboxChangeEvent) => {
    const method = Object.assign({}, methodState);
    method.isArray = event.target.checked;
    setMethodState(method);
  };
  // #endregion

  // #region Actions
  const create = async () => {
    console.log(methodState);
    const createdId = await methodsRepository.create(methodState);
    router.push('/apis/[id]/[method]', `/apis/${api.id}/${createdId}`);
  };
  // #end region

  return (
    <div>
      <h1>{api.url}</h1>
      <h2>Method Type</h2>
      <MethodTypeSelect value={methodState.type} className="mb-20" onChange={typeChanged} />
      <h2>Method URL Parameter</h2>
      <Input placeholder="url" value={methodState.url} className="mb-20" onChange={urlChanged} />
      <h2>Description</h2>
      <TextArea
        placeholder="description"
        rows={4}
        value={methodState.description}
        className="mb-20"
        onChange={descriptionChanged}
      />
      <Checkbox onChange={isArrayChanged}>Response is Array</Checkbox>
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary" onClick={() => create()}>
                Create Method
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary" onClick={() => console.log(methodState)}>
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
      apiId: apiId,
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
