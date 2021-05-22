import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchBar } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { LinkButton, Image, Link } from '@/components/atoms';

export const Top: React.VFC = () => {
  const router = useRouter();
  const mainCopy =
    'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう';
  const imageUrl = '/images/meal.png';
  const initialStyle =
    'text-center opacity-0 translate-y-2 transition-all duration-1000 transform';

  const [animationStyle, setAnimationStyle] = useState<string>(initialStyle);

  // SearchBar setting

  const [text, setText] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (text) {
      router.push(`/search/?word=${text}`);
    }
  };

  useEffect(() => {
    setAnimationStyle(animationStyle.replace('opacity-0 translate-y-2', ''));
  }, [animationStyle]);

  return (
    <div className={animationStyle}>
      <Spacer h={6} />
      <h1 className="text-md opacity-100 sm:text-2xl md:text-3xl text-center mt-8 whitespace-pre-wrap">
        {mainCopy}
      </h1>
      <Spacer h={6} />
      <SearchBar value={text} onChange={onChange} onSubmit={onSubmit} />
      <Spacer h={6} />
      <div className="w-64 mx-auto">
        <Image src={imageUrl} width={300} height={300} />
      </div>
      <Spacer h={28} />
      <LinkButton
        primary
        text="Fooについて"
        className="w-64 h-12"
        href="/about"
      />
      <Spacer h={12} />
    </div>
  );
};
