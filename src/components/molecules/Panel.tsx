import React from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
};

export const Panel: React.VFC<Props> = ({ title, description }) => {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 h-48">
      <div className="border border-main mx-1 h-5/6">
        <div className="w-1/2">
          <Image
            src="/images/cafe.jpg"
            width={640}
            height={427}
          />
        </div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
}
