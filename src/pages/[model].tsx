import { Button, Input, message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Api } from 'src/types/api';
import { Model } from 'src/types/model';
import { ActionMessage } from 'src/utils/messages';

import { apisRepository } from '../repository/apisRepository';
import { modelsRepository } from '../repository/modelsRepository';

const { TextArea } = Input;

interface Props {
  //api: Api;
  model: Model;
}

const ModelPage: NextPage<Props> = ({ model }) => {
  const router = useRouter();
  const modelId = router?.query.model as string;
  const isCreate = modelId === 'create-model';

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
    model.scheme = event.target.value;
    setModelState(model);
  };

  // #endregion

  // #region Actions
  const createModel = async () => {
    console.log('TODO create Model!');
    // const response = await modelsRepository.create(modelState);

    // if (response.status !== 201) {
    //   message.error(ActionMessage.FailedCreate);
    //   return;
    // }

    // const model = Object.assign({}, modelState);
    // model.id = response.data.id;
    // setModelState(model);
    // message.success(ActionMessage.SuccessCreate);
    // router.push('/apis/[id]/[model]', `/apis/${api.id}/${response.data.id}`);
  };

  const updateModel = async () => {
    console.log('TODO update Model!');
    // const response = await modelsRepository.update(modelState);

    // if (response.status !== 200) {
    //   message.error(ActionMessage.FailedUpdate);
    //   return;
    // }

    // message.success(ActionMessage.SuccessUpdate);
    // router.push('/apis/[id]/[model]', `/apis/${api.id}/${modelState.id}`);
  };

  const deleteModel = async () => {
    console.log('TODO delete Model!');
    // const response = await modelsRepository.delete(modelState.id);

    // if (response.status !== 204) {
    //   message.error(ActionMessage.FailedDelete);
    //   return;
    // }
    // message.success(ActionMessage.SuccessDelete);
    // router.push('/apis/[id]', `/apis/${api.id}`);
  };
  // #endregion

  return (
    <div>
      <h1>{'api.url'}</h1>
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
        rows={4}
        value={modelState.scheme}
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
  const modelId = query.model as string;

  if (modelId === 'create-model') {
    const model: Model = {
      id: '',
      name: '',
      description: '',
      scheme: '',
    };
    return { model };
  }

  const model = await modelsRepository.getById(modelId);
  return { model };
};

export default ModelPage;
