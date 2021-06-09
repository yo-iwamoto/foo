import React from 'react';
import { Button, CircleLoader } from '@/components/atoms';
import { EditIcon } from '@/components/atoms/Icons';
import { Flex, Spacer } from '@/components/utilities';

type Props = {
  editMode: boolean;
  edit: () => void;
  cancel: () => void;
  save: () => Promise<void>;
  isLoading: boolean;
};

export const EditControl: React.VFC<Props> = ({ editMode, edit, cancel, save, isLoading }) => {
  return (
    <>
      {editMode ? (
        <Flex aCenter>
          <p onClick={cancel} className="hover:underline cursor-pointer">
            キャンセル
          </p>
          <Spacer w={4} />
          {isLoading ? <CircleLoader /> : <Button primary text="保存" onClick={save} className="px-2" />}
        </Flex>
      ) : (
        <Flex aStart className="cursor-pointer text-gray-700 hover:text-gray-600" onClick={edit}>
          <EditIcon size={24} />
          <Spacer w={1} />
          <span>編集する</span>
        </Flex>
      )}
    </>
  );
};
