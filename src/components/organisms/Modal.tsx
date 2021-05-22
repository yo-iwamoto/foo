import React, { useEffect } from 'react';
import { ModalState } from '@/redux/types';
import { Button, LinkButton } from '@/components/atoms';
import {
  TimesIcon,
  PlaneIcon,
  CheckCircleIcon,
  UtensilsIcon,
} from '@/components/atoms/Icons';
import { Spacer } from '@/components/utilities';

type Props = {
  modal: ModalState;
  close: () => void;
};

export const Modal: React.VFC<Props> = ({ modal, close }) => {
  const ModalIcon: React.VFC = () => {
    switch (modal.type) {
      case 'mail':
        return <PlaneIcon className="text-main" size={90} />;
        break;
      case 'success':
        return <CheckCircleIcon className="text-main" size={90} />;
        break;
      case 'registration':
        return <UtensilsIcon className="text-main" size={90} />;
        break;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="absolute w-full h-full text-gray-700">
      <div className="fixed w-full h-full z-30 bg-black opacity-40" />
      <div className="fixed w-4/5 sm:w-1/2 lg:w-1/3 min-h-3/5 md:min-h-1/2 z-40 bg-white rounded-lg top-1/6 left-1/10 sm:left-1/4 lg:left-1/3 opacity-100 p-8">
        <div className="flex flex-col">
          <div className="flex justify-end">
            <TimesIcon className="cursor-pointer" onClick={close} size={30} />
          </div>
          <Spacer h={6} />
          <div className="flex justify-center">
            <ModalIcon />
          </div>
          <Spacer h={8} />
          <h1 className="text-lg sm:text-xl text-center font-bold whitespace-nowrap">
            {modal.title}
          </h1>
          <Spacer h={6} />
          <p className="text-sm whitespace-pre-wrap">{modal.message}</p>
          <Spacer h={6} />
          {modal.type === 'registration' ? (
            <div className="flex items-center justify-between">
              <Button text="しない" className="w-2/5 h-12" onClick={close} />
              <LinkButton
                primary
                text="ログイン"
                className="w-2/5 h-12"
                onClick={close}
                href={modal.link ? modal.link : undefined}
              />
            </div>
          ) : (
            <LinkButton
              primary
              text={modal.buttonText}
              onClick={close}
              href={modal.link ? modal.link : undefined}
              className="h-12"
            />
          )}
        </div>
      </div>
    </div>
  );
};
