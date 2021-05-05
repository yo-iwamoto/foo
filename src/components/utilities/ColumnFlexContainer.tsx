import React from 'react';

type Props = {
  children: React.ReactNode;
}

export const ColumnFlexContainer: React.VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-start items-center flex-nowrap w-full">
      {children}
    </div>
  );
}
