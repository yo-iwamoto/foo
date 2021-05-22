import React from 'react';
import { Button } from '@/components/atoms';
import { EditIcon } from '@/components/atoms/Icons';
import { Flex, Spacer } from '@/components/utilities';

type Props = {
  editMode: boolean;
  edit: () => void;
  cancel: () => void;
  save: () => Promise<void>;
};

export const EditControl: React.VFC<Props> = ({
  editMode,
  edit,
  cancel,
  save,
}) => {
  return (
    <>
      {editMode ? (
        <Flex aCenter>
          <p onClick={cancel} className="hover:underline cursor-pointer">
            キャンセル
          </p>
          <Spacer w={4} />
          <Button primary text="保存" onClick={save} className="px-2" />
        </Flex>
      ) : (
        <EditIcon className="cursor-pointer" size={32} onClick={edit} />
      )}
    </>
  );
};
