import React from 'react';

type Props = {
  children: React.ReactNode;
}

export const SubHeading = ({ children }: Props) => {
  return(
    <h2 className="text-lg sm:text-xl md:text-2xl">
      {children}
    </h2>
  );
}