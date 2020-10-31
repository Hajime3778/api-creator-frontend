import { Select } from 'antd';
const { Option } = Select;

interface Props {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
}

export const MethodTypeSelect: React.FC<Props> = ({ value, className = undefined, onChange = undefined }) => {
  return (
    <Select className={className} defaultValue={value} style={{ width: 150 }} onChange={onChange}>
      <Option value="GET">GET</Option>
      <Option value="POST">POST</Option>
      <Option value="PUT">PUT</Option>
      <Option value="DELETE">DELETE</Option>
    </Select>
  );
};
