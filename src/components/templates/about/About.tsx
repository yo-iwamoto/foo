import React, { useState, useEffect } from 'react';
import { Heading, SubHeading, Image } from '@/components/atoms';
import { Spacer } from '@/components/utilities';

export const About: React.VFC = () => {
  const waiterImageUrl = '/images/waiter.png';
  const shareImageUrl = '/images/share.png';
  const initialStyle =
    'opacity-0 translate-y-2 transition-all duration-1000 transform';
  const [animationStyle, setAnimationStyle] = useState<string>(initialStyle);
  useEffect(() => {
    setAnimationStyle(animationStyle.replace('opacity-0 translate-y-2', ''));
  }, [animationStyle]);

  return (
    <div className={animationStyle}>
      <Spacer h={6} />
      <Heading>
        <span className="text-main">Foo</span>
        とは？
      </Heading>
      <Spacer h={12} />
      <section className="w-4/5 sm:w-3/4 md:w-3/5 mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="w-full sm:w-3/4">
          <SubHeading>ひとりで楽しめるお店を、すぐに見つける。</SubHeading>
          <Spacer h={6} />
          <p>
            行ったことがないお店は雰囲気が分からず、「ひとり客は自分だけかも…？」と、少し入りにくく感じてしまうもの。
            <br />
            Fooでは、ユーザーが、ひとりで食べに行ったお店に「フー」することができます。
            他のユーザーの声を参考に、お店を選んでみましょう。
          </p>
        </div>
        <Spacer w={6} />
        <div className="w-full sm:w-1/4">
          <Image src={waiterImageUrl} width={400} height={400} />
        </div>
      </section>
      <Spacer h={12} />
      <section className="w-4/5 sm:w-3/4 md:w-3/5 mx-auto flex flex-col-reverse sm:flex-row justify-between items-center">
        <div className="w-full sm:w-1/4">
          <Image src={shareImageUrl} width={400} height={400} />
        </div>
        <Spacer w={6} />
        <div className="w-full sm:w-3/4">
          <SubHeading>気に入ったお店を、みんなに教える。</SubHeading>
          <Spacer h={6} />
          <p>
            もし、行ったお店をとても気に入って、みんなに教えたいのなら、Fooではあなたが行ったお店やそのリストを
            <br />
            簡単にシェアすることができます。
          </p>
        </div>
      </section>
      <Spacer h={12} />
    </div>
  );
};
