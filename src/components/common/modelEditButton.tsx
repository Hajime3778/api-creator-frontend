import { EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Model } from 'src/types/model';

import styles from './modelEditButton.module.scss';

interface Props {
  model: Model | null;
  onClick: () => void;
}

export const ModelEditButton: React.FC<Props> = ({ model, onClick }) => {
  if (model != null) {
    return (
      <div className={styles.modelEdit}>
        <div className={styles.modelName}>{model.name}</div>
        <Tooltip title="Edit model">
          <Button className="ml-10" type="primary" shape="circle" icon={<EditFilled />} onClick={onClick} />
        </Tooltip>
      </div>
    );
  } else {
    return (
      <Button className="mb-20" type="primary" onClick={onClick}>
        Create Model
      </Button>
    );
  }
};
