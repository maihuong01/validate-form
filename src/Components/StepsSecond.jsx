import { Input } from 'antd';
import React from 'react';

const StepsSecond = ({ form, name }) => {
  return (
    <div>
      <Input name={name} defaultValue={form.values[name]} onChange={form.handleChange} />
    </div>
  );
};

export default StepsSecond;
