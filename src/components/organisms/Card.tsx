import React, { useEffect, useState } from 'react';
import { Shop } from '@/types';

import { Like } from '../atoms';
import { Flex, Spacer } from '@/components/utilities';
import cn from 'classnames';
import { ClockIcon, ExternalLinkIcon, PinIcon, UpChevronIcon, UtensilsIcon } from '../atoms/Icons';
import { shallowEqual, useSelector } from 'react-redux';
import { State, UtilityState } from '@/redux/types';

type Props = {
  shop: Shop | undefined;
  like: ((id: string) => Promise<void>) | (() => void);
  remove: (id: string) => Promise<void>;
  selected?: boolean;
};

export const Card: React.VFC<Props> = ({ shop, like, remove, selected }) => {
  const { isLoading } = useSelector<State, UtilityState>((state) => state.utilities, shallowEqual);

  if (shop) {
    const onClickLike = async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
      e.stopPropagation();
      if (likeState) {
        await remove(shop.id);
        setLikeState(false);
      } else {
        await like(shop.id);
        setLikeState(true);
      }
    };

    const [likeState, setLikeState] = useState<boolean>(false);

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
      if (!isLoading && shop.like !== undefined) {
        setLikeState(shop.like);
      }
    }, [shop.like]);

    return (
      <Flex
        col
        className={cn({
          ['w-full shadow-md hover:shadow-lg rounded-3xl text-left leading-loose transition-all']: true,
          ['overflow-hidden cursor-pointer']: !open,
          ['overflow-visible']: open,
          ['animate-bounce-rapid']: selected,
        })}
        onClick={onClick}
      >
        <Flex aStart className="w-full">
          <a
            className="w-1/4 sm:w-1/6 md:w-1/7 overflow-hidden hover:opacity-80 h-24 sm:h-26 block"
            target="_blank"
            href={shop.urls.pc}
          >
            <img
              src={shop.photo.pc.l}
              className={cn({
                ['h-full w-full overflow-hidden block transition-all']: true,
                ['rounded-l-3xl']: !open,
                ['rounded-tl-3xl rounded-br-3xl']: open,
              })}
              alt={shop.name_kana}
            />
          </a>
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
                <th>
                  <UtensilsIcon />
                </th>
                <td className="pl-2">{shop.genre.name}</td>
              </tr>
              <Spacer h={2} />
              <tr>
                <th>
                  <PinIcon />
                </th>
                <td className="pl-2">{shop.address}</td>
              </tr>
              <Spacer h={2} />
              <tr>
                <th>
                  <ClockIcon />
                </th>
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
  } else {
    return <div />;
  }
};
