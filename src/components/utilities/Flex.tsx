import React from 'react';
import cn from 'classnames';

type Props = {
  row?: boolean;
  col?: boolean;
  wrap?: boolean;
  jStart?: boolean;
  jBetween?: boolean;
  jEnd?: boolean;
  jCenter?: boolean;
  aStart?: boolean;
  aCenter?: boolean;
  aEnd?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Flex: React.VFC<Props> = ({
  row,
  col,
  wrap,
  jStart,
  jBetween,
  jEnd,
  jCenter,
  aStart,
  aCenter,
  aEnd,
  className,
  onClick,
  children,
}) => {
  return (
    <div
      className={cn({
        ['flex']: true,
        ['flex-row']: row,
        ['flex-col']: col,
        ['flex-wrap']: wrap,
        ['flex-nowrap']: !wrap,
        ['justify-start']: jStart,
        ['justify-between']: jBetween,
        ['justify-end']: jEnd,
        ['justify-center']: jCenter,
        ['items-start']: aStart,
        ['items-center']: aCenter,
        ['items-end']: aEnd,
        [className!]: className,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
