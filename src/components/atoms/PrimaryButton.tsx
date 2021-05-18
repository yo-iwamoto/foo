import React from 'react';

type Props = {
  text: string;
  width?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton: React.VFC<Props> = ({ text, width, onClick }) => {
  return (
    <button
      className={`w-${width} border border-white bg-gradient-to-tl from-main to-red-200 rounded-lg p-5 text-white hover:from-white hover:to-white hover:text-main hover:border-main transition-colors focus:outline-none`}
      onClick={onClick}
    >{text}</button>
  );
};