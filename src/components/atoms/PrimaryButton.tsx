import React from 'react';

type Props = {
  text: string;
}

export const PrimaryButton: React.VFC<Props> = ({ text }) => {
  return (
    <button
      className="border border-main rounded-lg p-2 bg-main text-white hover:bg-white hover:text-main"
    >{text}</button>
  );
}