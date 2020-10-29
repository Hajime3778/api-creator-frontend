import { EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Model } from 'src/types/model';

import styles from './modelEditButton.module.scss';

interface Props {
  apiId: string;
  model: Model;
}

export const ModelEditButton: React.FC<Props> = ({ apiId, model }) => {
  return (
    <div className={styles.modelEdit}>
      <div className={styles.modelName}>{model.name}</div>
      <Tooltip title="Edit model">
        <Button className="ml-10" type="primary" shape="circle" icon={<EditFilled />} />
      </Tooltip>
    </div>
  );
};
