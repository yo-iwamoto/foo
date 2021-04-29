import React from 'react';
import { Restaurant } from '../../types';
import { Panel } from '../molecules/Panel';

type Props = {
  panels: Restaurant[];
}

export const PanelBox: React.VFC<Props> = ({ panels }) => {
  return (
    <div className="w-full sm-w-4/5 md:w-3/4 mx-auto flex justify-start items-center flex-wrap">
      {panels.map((panel, index) => (
        <Panel
          title={panel.name}
          description={panel.description}
          key={index}
        />
      ))}
    </div>
  );
}
