import React from 'react';

type Props = {
  text: string;
}

export const SubmitButton: React.VFC<Props> = ({ text }) => {
  return (
    <input
      type="submit"
      value={text}
      className="p-3 border bg-main text-white rounded-lg cursor-pointer hover:bg-white hover:text-main hover:border-main focus:bg-white focus:text-main focus:border-main transition-colors focus:outline-none"
    />
  );
}