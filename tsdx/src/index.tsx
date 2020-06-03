import React from 'react';
import Textarea from './Textarea';
import './index.less';

interface InputProps {
  value?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> & {
  Textarea: typeof Textarea;
} = ({ value, ...restProps }) => (
  <div {...restProps} >
    <input value={value} />
  </div>
);

Input.defaultProps = {
  value: ''
};

Input.Textarea = Textarea;

export default Input;

