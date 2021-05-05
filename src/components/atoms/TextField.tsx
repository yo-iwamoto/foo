import React from 'react';

type Props = {
  type: string;
  value: string;
  placeholder: string;
  onChange: Function;
}

export const TextField: React.VFC<Props> = props => {
  return (
    <input
      className="w-full p-2 border border-gray-400 outline-none rounded-md focus:border-main"
      {...props}
    />
  );
}