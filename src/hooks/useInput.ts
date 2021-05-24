import React, { useState } from 'react';

export const useInput = <T extends string | number>(
  initialValue: T,
): [value: T, onChange: React.ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value as T;
    setValue(newValue);
  };
  return [value, onChange];
};
