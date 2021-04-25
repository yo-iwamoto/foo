import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Logo: React.VFC = () => {
  const imageUrl = '/images/LogoWhite.png';

  return (
    <Link href="/">
      <a>
      <Image
        src={imageUrl}
        alt="foo"
        width={240}
        height={184}
        className="cursor-pointer"
      />
      </a>
    </Link>
  );
}
