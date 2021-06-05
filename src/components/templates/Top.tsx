import React from 'react';
import { useFadeIn } from '@/hooks/useFadeIn';
import { useRouter } from 'next/router';
import { SearchBar } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { LinkButton, Image } from '@/components/atoms';
import { useInput } from '@/hooks/useInput';
import { useLikedShops } from '@/hooks/useLikedShops';
import { useLikes } from '@/hooks/useLikes';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useSelectors } from '@/hooks/useSelectors';

export const Top: React.VFC = () => {
  const router = useRouter();
  const mainCopy = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう';
  const imageUrl = '/images/meal.png';

  const [startLoading, _] = useLoadingControll();
  const {
    utilities: { isLoading,}
  } = useSelectors();

  const [text, onChangeText] = useInput<string>('');

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    startLoading();
    if (text) {
      router.push(`/search/?word=${text}`);
    }
  };

  const getLikedShops = useLikedShops();
  const likesControll = useLikes();

  const [fadeInStyle] = useFadeIn();

  return (
    <div className={fadeInStyle()}>
      <Spacer h={6} />
      <h1 className="text-md opacity-100 sm:text-2xl md:text-3xl text-center mt-8 whitespace-pre-wrap">{mainCopy}</h1>
      <Spacer h={6} />
      <SearchBar isLoading={isLoading} value={text} onChange={onChangeText} onSubmit={onSubmit} />
      <Spacer h={6} />
      <div className="w-64 mx-auto">
        <Image src={imageUrl} width={300} height={300} />
      </div>
      <Spacer h={28} />
      <LinkButton primary text="Fooについて" className="w-64 h-12" href="/about" />
      <Spacer h={12} />
    </div>
  );
};
