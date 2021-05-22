import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ShopState, State, UserState } from '@/redux/types';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';
import { modalTemplates } from '@/lib/modals';
import { endNewUserAction, updateUserAction } from '@/redux/users/actions';
import { TableRow } from '@/types';
import { providerName } from '@/lib/providerName';

import { Heading, TextField } from '@/components/atoms';
import { SectionTitle, Table } from '@/components/molecules';
import { CardList, EditControl } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { updateName } from '@/api/users';
import { UpdateNameResource } from '@/types';
import { toastTemplates } from '@/lib/toasts';

export const Mypage: React.VFC = () => {
  const dispatch = useDispatch();

  const user = useSelector<State, UserState>(
    (state) => state.users,
    shallowEqual,
  );
  const shops = useSelector<State, ShopState>(
    (state) => state.shops,
    shallowEqual,
  );

  const [editMode, setEditMode] = useState<boolean>(false);
  const [nickName, setNickname] = useState<string>(user.name);

  useEffect(() => {
    if (user.isNewUser) {
      dispatch(raiseModalAction(modalTemplates.firstVisit));
      dispatch(endNewUserAction());
    }
  }, [user.isNewUser]);

  const accountTable: TableRow[] = [
    { key: 'ニックネーム', value: user.name },
    { key: 'ログイン方法', value: providerName(user.authProvider) },
  ];

  const onClickEditIcon = (): void => {
    setEditMode(true);
  };
  const cancelEdit = (): void => {
    setEditMode(false);
    setNickname(user.name);
  };
  const applyEdit = async (): Promise<void> => {
    const resource: UpdateNameResource = { uid: user.uid, name: nickName };
    const res = await updateName(resource);
    dispatch(updateUserAction({ name: res.user.name }));
    dispatch(raiseToastAction(toastTemplates.successEditing));
    setEditMode(false);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  return (
    <>
      {user.isLoggedIn ? (
        <div className="mx-auto py-8 px-4 sm:px-10 md:px-12 max-w-6xl">
          <Heading>マイページ</Heading>
          <Spacer h={12} />
          <section>
            <SectionTitle title="アカウント">
              <EditControl
                editMode={editMode}
                edit={onClickEditIcon}
                cancel={cancelEdit}
                save={applyEdit}
              />
            </SectionTitle>
            {editMode ? (
              <>
                <Spacer h={4} />
                <Flex jStart aCenter className="px-4">
                  <p className="font-bold w-1/2 md:w-1/3">ニックネーム</p>
                  <TextField
                    value={nickName}
                    placeholder="ニックネーム"
                    onChange={onChangeNickname}
                    className="w-1/2 md:w-2/3"
                  />
                </Flex>
              </>
            ) : (
              <Table content={accountTable} />
            )}
          </section>
          <Spacer h={12} />
          <section>
            <SectionTitle title="お気に入りリスト">
              <p>{shops.shops.length} 件</p>
            </SectionTitle>
            <CardList shops={shops.shops} />
          </section>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
