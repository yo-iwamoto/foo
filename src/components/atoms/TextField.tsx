import React from 'react';

type Props = {
  type: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextField: React.VFC<Props> = props => {
  return (
    <input
      className="w-full sm:text-lg p-2 border border-gray-400 outline-none appearance-none rounded-md focus:border-main"
      {...props}
    />
  );
};