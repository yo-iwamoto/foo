import React from 'react';

type ButtonAttributes = JSX.IntrinsicElements['button'];

type OriginalAttributes = {
  text: string;
  width?: number;
};

type Props = OriginalAttributes & Omit<ButtonAttributes, 'value'>

export const PrimaryButton: React.VFC<Props> = ({ text, width, onClick }) => {
  return (
    <button
      // className={`w-${width} border border-white bg-gradient-to-tl from-main to-red-200 rounded-lg p-5 text-white hover:from-white hover:to-white hover:text-main hover:border-main transition-colors focus:outline-none`}
      className={`w-${width} h-12 border border-main bg-main text-white rounded-lg hover:text-main hover:bg-white hover:border-main transition-colors focus:outline-none`}
      onClick={onClick}
    >{text}</button>
  );
};