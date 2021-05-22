import React from 'react';

type Props = {
  message: string;
};

export const ErrorToast: React.VFC<Props> = ({ message }) => {
  return (
    <div className="w-4/5 mx-auto bg-red-500">
      <p className="text-white">{message}</p>
    </div>
  );
};
