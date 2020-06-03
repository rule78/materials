import React from 'react';

export interface TextareaProps {
  value?: string;
  style?: React.CSSProperties;
}

const Textarea: React.FC<TextareaProps> = ({ value, ...restProps }) => (
  <div {...restProps}>
    <textarea value={value} />
  </div>
);

export default Textarea;
