import React, { useEffect, useState } from 'react';
import { useFadeIn } from '@/hooks/useFadeIn';
import { useRouter } from 'next/router';
import { SearchBar, ShopCard } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { Button, Image, Link } from '@/components/atoms';
import { useInput } from '@/hooks/useInput';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useUsersState, useUtilitiesState } from '@/hooks/useSelectors';
import { Shop } from '@/types';
import { UsersLikesController } from '@/api';

export const Top: React.VFC = () => {
  const router = useRouter();
  const mainCopy = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう';
  const imageUrl = '/images/meal.png';

  const [startLoading, _] = useLoadingControll();
  const { isLoading } = useUtilitiesState();
  const { uid, isLoggedIn } = useUsersState();

  const [text, onChangeText] = useInput<string>('');

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    startLoading();
    if (text) {
      router.push(`/search/?word=${text}`);
    }
  };

  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    if (uid) {
      UsersLikesController.index(uid).then((res) => {
        if (res?.shops) {
          setShops(res.shops);
        }
      });
    }
  }, [uid]);

  const fadeInStyle = useFadeIn();

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
      {shops.length !== 0 && (
        <section className="p-2 w-full lg:w-1/2 mx-auto">
          <h2 className="text-left font-bold pb-2 px-4">お気に入りのお店</h2>
          <hr />
          <Spacer h={6} />
          <div className="flex overflow-x-scroll scroll-hidden">
            {shops.map((shop, index) => (
              <Flex key={index}>
                <Spacer w={2} />
                <ShopCard isLoading={isLoading} shop={shop} square />
                <Spacer w={2} />
              </Flex>
            ))}
          </div>
        </section>
      )}

      <Spacer h={6} />
      <Spacer h={12} />
      <Link href="/about">
        <a>
          <Button primary text="Fooについて" className="w-64 h-12" />
        </a>
      </Link>
      <Spacer h={12} />
    </div>
  );
};
