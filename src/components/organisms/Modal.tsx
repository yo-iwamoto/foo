import React from 'react';
import { ModalState } from '@/redux/types';
import { Button, LinkButton } from '@/components/atoms';
import {
  TimesIcon,
  PlaneIcon,
  CheckCircleIcon,
  UtensilsIcon,
} from '@/components/atoms/Icons';
import { Flex, Spacer } from '@/components/utilities';

type Props = {
  modal: ModalState;
  close: () => void;
};

export const Modal: React.VFC<Props> = ({ modal, close }) => {
  const ModalIcon: React.VFC = () => {
    switch (modal.type) {
      case 'mail':
        return <PlaneIcon className="text-main text-7xl sm:text-8xl" />;
      case 'success':
        return <CheckCircleIcon className="text-main text-7xl sm:text-8xl" />;
      case 'registration':
        return <UtensilsIcon className="text-main text-7xl sm:text-8xl" />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="absolute w-full h-full text-gray-700">
      <div className="fixed w-full h-full z-30 bg-black opacity-40" />
      <div className="fixed w-4/5 sm:w-2/3 lg:w-1/3 min-h-1/2 sm:min-w-1/2 z-40 bg-white rounded-lg top-10 sm:top-1/6 left-1/10 sm:left-1/6 lg:left-1/3 opacity-100 p-4 sm:p-6 md:p-8">
        <Flex col>
          <Flex jEnd>
            <TimesIcon className="cursor-pointer" onClick={close} size={30} />
          </Flex>
          <Spacer h={6} />
          <Flex jCenter>
            <ModalIcon />
          </Flex>
          <Spacer h={8} />
          <h1 className="text-xl sm:text-2xl text-center font-bold whitespace-nowrap">
            {modal.title}
          </h1>
          <Spacer h={6} />
          <p className="text-md whitespace-pre-wrap">{modal.message}</p>
          <Spacer h={6} />
          {modal.type === 'registration' ? (
            <Flex jBetween aCenter>
              <Button text="しない" className="w-2/5 h-12" onClick={close} />
              <LinkButton
                primary
                text="ログイン"
                className="w-2/5 h-12"
                onClick={close}
                href={modal.link ? modal.link : undefined}
              />
            </Flex>
          ) : (
            <LinkButton
              primary
              text={modal.buttonText}
              onClick={close}
              href={modal.link ? modal.link : undefined}
              className="h-12"
            />
          )}
        </Flex>
      </div>
    </div>
  );
};
