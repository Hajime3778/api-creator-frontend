import { Button, Input, message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apisRepository } from 'src/repository/apisRepository';
import { modelsRepository } from 'src/repository/modelsRepository';
import { Api } from 'src/types/api';
import { Model } from 'src/types/model';
import { ActionMessage, JsonMessage } from 'src/utils/messages';
const { TextArea } = Input;

interface Props {
  api: Api;
  model: Model;
}

const ModelPage: NextPage<Props> = ({ api, model }) => {
  const router = useRouter();
  const isCreate = model.id === '';

  // #region State
  const [modelState, setModelState] = useState(model);

  const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = Object.assign({}, modelState);
    model.name = event.target.value;
    setModelState(model);
  };

  const descriptionChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const model = Object.assign({}, modelState);
    model.description = event.target.value;
    setModelState(model);
  };

  const schemeChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const model = Object.assign({}, modelState);
    model.schema = event.target.value;
    setModelState(model);
  };

  // #endregion

  // #region Actions

  const isValidJson = (value: string) => {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  };

  const createModel = async () => {
    if (!isValidJson(modelState.schema)) {
      message.error(JsonMessage.InValid);
      return;
    }

    const response = await modelsRepository.create(modelState);

    if (response.status !== 201) {
      message.error(ActionMessage.FailedCreate);
      return;
    }

    const model = Object.assign({}, modelState);
    model.id = response.data.id;
    setModelState(model);
    message.success(ActionMessage.SuccessCreate);
    router.push('/apis/[id]/model', `/apis/${api.id}/model`);
  };

  const updateModel = async () => {
    if (!isValidJson(modelState.schema)) {
      message.error(JsonMessage.InValid);
      return;
    }
    const response = await modelsRepository.update(modelState);

    if (response.status !== 200) {
      message.error(ActionMessage.FailedUpdate);
      return;
    }

    message.success(ActionMessage.SuccessUpdate);
    router.push('/apis/[id]/model', `/apis/${api.id}/model`);
  };

  const deleteModel = async () => {
    const response = await modelsRepository.delete(modelState.id);

    if (response.status !== 204) {
      message.error(ActionMessage.FailedDelete);
      return;
    }
    message.success(ActionMessage.SuccessDelete);
    router.push('/apis/[id]', `/apis/${api.id}`);
  };
  // #endregion

  return (
    <div>
      <h1>{api.url}</h1>
      <h2>Model Name</h2>
      <Input placeholder="model name" value={modelState.name} className="mb-20" onChange={nameChanged} />
      <h2>Description</h2>
      <TextArea
        placeholder="description"
        rows={4}
        value={modelState.description}
        className="mb-20"
        onChange={descriptionChanged}
      />
      <h2>Json Scheme</h2>
      <TextArea
        placeholder="json scheme"
        rows={15}
        value={modelState.schema}
        className="mb-20"
        onChange={schemeChanged}
      />
      <div className="button-area">
        {(() => {
          if (isCreate) {
            return (
              <Button className="action-button ml-20" size="large" type="primary" onClick={() => createModel()}>
                Create Model
              </Button>
            );
          } else {
            return (
              <React.Fragment>
                <Button className="action-button" size="large" type="primary" onClick={() => updateModel()}>
                  Save Model
                </Button>
                <Button className="action-button ml-20" size="large" danger onClick={() => deleteModel()}>
                  Delete Model
                </Button>
              </React.Fragment>
            );
          }
        })()}
      </div>
    </div>
  );
};

ModelPage.getInitialProps = async ({ query }) => {
  const apiId = query.id as string;
  const api = await apisRepository.getById(apiId);
  const model = await modelsRepository.getByApiId(apiId);

  if (model == null) {
    const model: Model = {
      id: '',
      apiId: apiId,
      name: '',
      description: '',
      schema: '',
    };
    return { api, model };
  }

  return { api, model };
};

export default ModelPage;
