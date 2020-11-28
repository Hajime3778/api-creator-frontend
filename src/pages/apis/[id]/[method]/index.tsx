import { Button, Checkbox, Input, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { GetServerSideProps, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apisRepository } from 'src/repository/apisRepository';
import { methodsRepository } from 'src/repository/methodsRepository';
import { Api } from 'src/types/api';
import { CreatedResponse } from 'src/types/createdResponse';
import { Error } from 'src/types/error';
import { Method } from 'src/types/method';
import { ActionMessage } from 'src/utils/messages';

import { MethodTypeSelect } from './methodTypeSelect';

const { TextArea } = Input;

interface Props {
  api: Api | null;
  method: Method | null;
}

const MethodPage: NextPage<Props> = ({ api, method }) => {
  const router = useRouter();
  const methodId = router?.query.method as string;
  const isCreate = methodId === 'create-method';

  const [methodState, setMethodState] = useState(method as Method);

  // #region State
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

  const requireInputValidate = () => {
    let ret = true;
    let errMsg = '';
    if (methodState.type === '') {
      errMsg += 'MethodTypeが入力されていません\n';
      ret = false;
    }

    if (errMsg !== '') {
      message.error(errMsg);
    }
    return ret;
  };

  const createMethod = async () => {
    if (!requireInputValidate()) return;
    const response = await methodsRepository.create(methodState);

    if (response.status !== 201) {
      const error: Error = response.data as Error;
      message.error(error.error);
      return;
    }

    const method = Object.assign({}, methodState);
    response.data = response.data as CreatedResponse;
    method.id = response.data.id;
    setMethodState(method);
    message.success(ActionMessage.SuccessCreate);
    router.push('/apis/[id]/[method]', `/apis/${api?.id}/${response.data.id}`);
  };

  const updateMethod = async () => {
    if (!requireInputValidate()) return;
    const response = await methodsRepository.update(methodState);

    if (response.status !== 200) {
      const error: Error = response.data as Error;
      message.error(error.error);
      return;
    }

    message.success(ActionMessage.SuccessUpdate);
    router.push('/apis/[id]/[method]', `/apis/${api?.id}/${methodState.id}`);
  };

  const deleteMethod = async () => {
    const response = await methodsRepository.delete(methodState.id);

    if (response.status !== 204) {
      const error: Error = response.data as Error;
      message.error(error.error);
      return;
    }
    message.success(ActionMessage.SuccessDelete);
    router.push('/apis/[id]', `/apis/${api?.id}`);
  };
  // #endregion

  if (!api || !method) return <DefaultErrorPage statusCode={404} />;
  return (
    <div>
      <h1>{api.url}</h1>
      <h2>Method Type</h2>
      <MethodTypeSelect defaultValue={methodState.type} className="mb-20" onChange={typeChanged} />
      <h2>Method URL Parameter</h2>
      <Input placeholder="/{param}" value={methodState.url} className="mb-20" onChange={urlChanged} />
      <h2>Description</h2>
      <TextArea
        placeholder="description"
        rows={4}
        value={methodState?.description}
        className="mb-20"
        onChange={descriptionChanged}
      />
      <Checkbox className="mb-20" checked={methodState.isArray} onChange={isArrayChanged}>
        Response is Array
      </Checkbox>
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary" onClick={() => createMethod()}>
                Create Method
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary" onClick={() => updateMethod()}>
                  Save Method
                </Button>
                <Button className="action-button ml-20" size="large" danger onClick={() => deleteMethod()}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiId = ctx.params?.id as string;
  const methodId = ctx.params?.method as string;

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
    return { props: { api, method } };
  }

  const [api, method] = await Promise.all([apisRepository.getById(apiId), methodsRepository.getById(methodId)]);
  return { props: { api, method } };
};

export default MethodPage;
