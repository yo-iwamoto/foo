import React from 'react';
import { UtensilsIcon } from '@/components/atoms/Icons';
import cn from 'classnames';

type Props = {
  fooState: boolean;
  onClick: React.MouseEventHandler<SVGElement>;
  className?: string;
};

export const Foo: React.VFC<Props> = ({ fooState, onClick, className }) => {
  return (
    <UtensilsIcon
      className={cn({
        ['cursor-pointer text-2xl']: true,
        ['text-main']: fooState,
        [className!]: className,
      })}
      onClick={onClick}
    />
  );
};
