import React from 'react';

type Props = {
  bold?: boolean;
  children: React.ReactNode;
}

export const SubHeading = ({ bold, children }: Props) => {
  let className = 'text-lg sm:text-xl md:text-2xl';
  if (bold) {
    className += ' font-bold';
  }

  return(
    <h2 className={className}>
      {children}
    </h2>
  );
}