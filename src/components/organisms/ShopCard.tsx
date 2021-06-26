import React, { useEffect, useRef, useState } from 'react';
import { Shop } from '@/types';
import { Foo, Like } from '@/components/atoms';
import { ClockIcon, ExternalLinkIcon, PinIcon, UpChevronIcon, UtensilsIcon } from '@/components/atoms/Icons';
import { Flex, Spacer } from '@/components/utilities';
import cn from 'classnames';
import smoothscroll from 'smoothscroll-polyfill';
import { useShopStatus } from '@/hooks/useShopStatus';

type Props = {
  shop: Shop | undefined;
  select?: (id: string) => void;
  selected?: string;
  square?: boolean;
  isLoading: boolean;
};

export const ShopCard: React.VFC<Props> = ({ shop, select, selected, square }) => {
  smoothscroll.polyfill();

  if (shop) {
    const [likeState, fooState, toggleLike, toggleFoo] = useShopStatus(shop.liked, shop.foo, shop.id);
    const [likesCount, setLikesCount] = useState(shop.likes_count);
    const [fooCount, setFooCount] = useState(shop.foo_count);

    const [open, setOpen] = useState<boolean>(false);
    const onClick = (): void => {
      if (!open) {
        setOpen(true);
      }
    };
    const onClickArrow = (): void => {
      setOpen(false);
    };

    const onClickLike = async (e: React.MouseEvent<SVGElement>): Promise<void> => {
      e.stopPropagation();
      setLikesCount((prev) => (likeState ? prev - 1 : prev + 1));
      const count = await toggleLike();
      if (count !== undefined && count !== likesCount) {
        setLikesCount(count);
      }
    };

    const onClickFoo = async (e: React.MouseEvent<SVGElement>): Promise<void> => {
      e.stopPropagation();
      setFooCount((prev) => (fooState ? prev - 1 : prev + 1));
      const count = await toggleFoo();
      if (count !== undefined && count !== fooCount) {
        setFooCount(count);
      }
    };

    const ShopCardTable: React.VFC = () => {
      return (
        <table className="text-sm border-separate">
          <tbody>
            <tr>
              <td valign="top">
                <UtensilsIcon className="text-main" />
              </td>
              <td className="pl-2">{shop.genre ?? 'その他'}</td>
            </tr>
            <tr>
              <td valign="top">
                <PinIcon className="text-main" />
              </td>
              <td className="pl-2">{shop.address}</td>
            </tr>
            <tr>
              <td valign="top">
                <ClockIcon className="text-main" />
              </td>
              <td className="pl-2">{shop.open}</td>
            </tr>
          </tbody>
        </table>
      );
    };

    if (square) {
      const ref = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (selected === shop.id) {
          setTimeout(() => {
            if (ref!.current) {
              ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'center',
              });
            }
          }, 800);
        }
      }, [selected]);

      return (
        <div
          ref={ref}
          onClick={() => {
            if (select) {
              select(shop.id);
            }
          }}
        >
          <Flex
            col
            className={cn({
              ['w-60 shadow-md hover:shadow-lg rounded-3xl text-left transition-all mb-4 relative']: true,
              ['border-2 border-green-200']: selected === shop.id,
            })}
            onClick={onClick}
          >
            <img src={shop.photo} alt={shop.name_kana} className="h-48 rounded-t-3xl min-w-full" />
            <div className="absolute bg-white rounded-full h-10 w-20 top-2 right-2 shadow-2xl">
              <Spacer h={2} />
              <Flex jBetween className="w-14 mx-auto">
                <Like likeState={likeState} onClick={onClickLike} />
                <span>{likesCount}</span>
              </Flex>
            </div>
            <div className="absolute bg-white rounded-full h-10 w-20 top-14 right-2 shadow-2xl">
              <Spacer h={2} />
              <Flex jBetween className="w-14 mx-auto">
                <Foo fooState={fooState} onClick={onClickFoo} />
                <span>{fooCount}</span>
              </Flex>
            </div>
            <Flex col aStart jBetween className="h-full w-full p-3">
              <div>
                <h3 className="font-bold text-md sm:text-lg md:text-xl whitespace-wrap">{shop.name}</h3>
                <Spacer h={3} />
                <ShopCardTable />
              </div>
              <a href={shop.url} target="_blank">
                <Flex aCenter className="hover:underline text-gray-500 text-xs">
                  <p className="flex">ホットペッパーグルメでもっと詳しく</p>
                  <ExternalLinkIcon />
                </Flex>
              </a>
            </Flex>
          </Flex>
        </div>
      );
    } else {
      return (
        <Flex
          col
          className={cn({
            ['w-full shadow-md hover:shadow-lg rounded-3xl text-left leading-loose transition-all']: true,
            ['overflow-hidden cursor-pointer']: !open,
            ['overflow-visible']: open,
          })}
          onClick={onClick}
        >
          <Flex aStart className="w-full">
            <div className="w-1/4 sm:w-1/6 md:w-1/7 overflow-hidden h-24 sm:h-26">
              <img
                src={shop.photo}
                className={cn({
                  ['h-full w-full overflow-hidden block transition-all hover:opacity-80']: true,
                  ['rounded-l-3xl']: !open,
                  ['rounded-tl-3xl rounded-br-3xl']: open,
                })}
                alt={shop.name_kana}
              />
            </div>
            <Flex col aStart className="w-3/4 sm:w-5/6 md:w-6/7 px-4 py-2 overflow-hidden h-24 sm:h-26">
              <div className="w-full">
                <h3 className="font-bold text-sm sm:text-lg md:text-xl whitespace-wrap">{shop.name}</h3>
                <p className="hidden sm:block text-sm">{shop.catch_copy}</p>
              </div>
              <Spacer h={2} />
              <Flex jEnd className="w-full">
                <div className="text-md sm:text-lg block w-1/6 sm:w-1/20 cursor-pointer">
                  <Like likeState={likeState} onClick={onClickLike} />
                </div>
              </Flex>
            </Flex>
          </Flex>
          <div
            className={cn({
              ['text-xs sm:text-sm md:text-base transition-all ease-in-out pr-8 sm:pr-12']: true,
              ['h-0']: !open,
              ['h-auto p-4']: open,
            })}
          >
            <ShopCardTable />
            <Spacer h={3} />
            <Flex jBetween aCenter>
              <a href={shop.url} target="_blank">
                <Flex aCenter className="hover:underline text-gray-500 text-xs">
                  <p className="inline">ホットペッパーグルメでもっと詳しく</p>
                  <ExternalLinkIcon />
                </Flex>
              </a>
              <UpChevronIcon size={20} onClick={onClickArrow} className="cursor-pointer" />
            </Flex>
          </div>
        </Flex>
      );
    }
  } else {
    return <div />;
  }
};
