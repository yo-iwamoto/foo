import React from 'react';
import { Button } from '../atoms';
import { EditIcon } from '../atoms/Icons';
import { Spacer } from '../utilities';

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
        <div className="flex items-center">
          <p onClick={cancel} className="hover:underline cursor-pointer">
            キャンセル
          </p>
          <Spacer w={4} />
          <Button primary text="保存" onClick={save} className="px-2" />
        </div>
      ) : (
        <EditIcon className="cursor-pointer" size={32} onClick={edit} />
      )}
    </>
  );
};
