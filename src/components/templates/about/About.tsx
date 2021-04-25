import React from 'react';
import { Heading } from '../../atoms/typography/Heading';
import { SubHeading } from '../../atoms/typography/SubHeading';
import Image from 'next/image';

export const About: React.VFC = () => {
  const imageUrl = '/images/distance.png';
  
  return (
    <>
      <div className="h-8" />
      <Heading>
        <span className="text-main">
          Foo
        </span>
        とは？
      </Heading>
      <div className="h-12" />
      <section className="w-4/5 sm:w-3/4 md:w-2/4 mx-auto">
        <SubHeading>
          ひとりで楽しめるお店を見つける
        </SubHeading>
        <div className="h-4" />
        <p>
          行ったことがないお店は雰囲気が分からず、「ひとりで入ったら迷惑かも…？」と、少し入りにくく感じてしまうもの。
          <br/>これからはFooで、あなたのお気に入りのお店を見つけましょう。
        </p>
      </section>
      <div className="h-12" />
      <section className="w-4/5 sm:w-3/4 md:w-2/4 mx-auto flex justify-between items-center">
        <div className="w-3/5 sm:w-3/4">
          <SubHeading>
            ひとりで楽しめるお店を見つける
          </SubHeading>
          <div className="h-4" />
          <p>
            行ったことがないお店は雰囲気が分からず、「ひとりで入ったら迷惑かも…？」と、少し入りにくく感じてしまうもの。
            <br/>これからはFooで、あなたのお気に入りのお店を見つけましょう。
          </p>
        </div>
        <div className="w-4" />
        <div className="w-2/5 sm:w-1/4">
          <Image src={imageUrl} width={400} height={400}/>
        </div>
      </section>
    </>
  );
}