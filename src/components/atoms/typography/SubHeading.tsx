import React from 'react';

type Props = {
  bold?: boolean;
  children: React.ReactNode;
}

export const SubHeading: React.VFC<Props> = ({ bold, children }) => {
  let className = 'text-xl md:text-2xl';
  if (bold) {
    className += ' font-bold';
  }

  return(
    <h2 className={className}>
      {children}
    </h2>
  );
}