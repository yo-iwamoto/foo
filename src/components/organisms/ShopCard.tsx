import React, { useEffect, useRef, useState } from 'react';
import { Shop } from '@/types';
import { Like } from '../atoms';
import { Flex, Spacer } from '@/components/utilities';
import cn from 'classnames';
import { ClockIcon, ExternalLinkIcon, PinIcon, UpChevronIcon, UtensilsIcon } from '../atoms/Icons';

type Props = {
  shop: Shop | undefined;
  like: ((id: string) => Promise<void>) | (() => void);
  remove: (id: string) => Promise<void>;
  select?: (id: string) => void;
  selected?: string;
  square?: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const ShopCard: React.VFC<Props> = ({ shop, like, remove, selected, square, isLoading, isLoggedIn }) => {
  const [likeState, setLikeState] = useState<boolean>(false);

  if (shop) {
    const onClickLike = async (e: React.MouseEvent<SVGElement>): Promise<void> => {
      e.stopPropagation();
      if (likeState) {
        await remove(shop.id);
        setLikeState(false);
      } else {
        await like(shop.id);
        if (isLoggedIn) {
          setLikeState(true);
        }
      }
    };

    const [open, setOpen] = useState<boolean>(false);
    const onClick = (): void => {
      if (!open) {
        setOpen(true);
      }
    };
    const onClickArrow = (): void => {
      setOpen(false);
    };

    useEffect(() => {
      if (shop.like !== undefined) {
        setLikeState(shop.like);
      }
    }, [shop.like]);

    if (square) {
      const ref = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (selected === shop.id) {
          setTimeout(() => {
            if (ref!.current) {
              ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              });
            }
          }, 1000);
        }
      }, [selected]);

      return (
        <div ref={ref}>
          <Flex
            col
            className={cn({
              ['w-60 shadow-md hover:shadow-lg rounded-3xl text-left transition-all mb-4 relative']: true,
              ['border-2 border-blue-400']: selected === shop.id,
            })}
            onClick={onClick}
          >
            <img src={shop.photo.pc.l} alt={shop.name_kana} className="h-48 rounded-t-3xl min-w-full" />
            <div className="absolute bg-white rounded-full h-10 w-10 top-2 right-2 shadow-2xl">
              <Spacer h={2} />
              <Like likeState={likeState} onClick={onClickLike} className="w-auto mx-auto" />
            </div>
            <Flex col aStart jBetween className="h-full w-full p-3">
              <div>
                <h3 className="font-bold text-md sm:text-lg md:text-xl whitespace-wrap">{shop.name}</h3>
                <Spacer h={3} />
                <table className="text-sm border-separate">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <UtensilsIcon className="text-blue-600" />
                      </td>
                      <td className="pl-2">{shop.genre.name}</td>
                    </tr>
                    <tr>
                      <td valign="top">
                        <PinIcon className="text-blue-600" />
                      </td>
                      <td className="pl-2">{shop.address}</td>
                    </tr>
                    <tr>
                      <td valign="top">
                        <ClockIcon className="text-blue-600" />
                      </td>
                      <td className="pl-2">{shop.open}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a href={shop.urls.pc} target="_blank">
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
                src={shop.photo.pc.l}
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
                <p className="hidden sm:block text-sm">{shop.catch}</p>
              </div>
              <Spacer h={2} />
              <Flex jEnd className="w-full">
                <div className="text-md sm:text-lg block w-1/6 sm:w-1/20 cursor-pointer hover:text-main">
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
            <table>
              <tbody>
                <tr>
                  <td valign="top">
                    <UtensilsIcon className="text-blue-600" />
                  </td>
                  <td className="pl-2">{shop.genre.name}</td>
                </tr>
                <tr>
                  <td valign="top">
                    <PinIcon className="text-blue-600" />
                  </td>
                  <td className="pl-2">{shop.address}</td>
                </tr>
                <tr>
                  <td valign="top">
                    <ClockIcon className="text-blue-600" />
                  </td>
                  <td className="pl-2">{shop.open}</td>
                </tr>
              </tbody>
            </table>
            <Spacer h={3} />
            <Flex jBetween aCenter>
              <a href={shop.urls.pc} target="_blank">
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
