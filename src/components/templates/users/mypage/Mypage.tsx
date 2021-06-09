import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';
import { modalTemplates } from '@/lib/modals';
import { endNewUserAction, updateUserAction } from '@/redux/users/actions';
import { TableRow } from '@/types';
import { providerName } from '@/lib/providerName';

import { Heading, TextField } from '@/components/atoms';
import { SectionTitle, Table } from '@/components/molecules';
import { ShopCard, EditControl } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { UpdateNameResource } from '@/types';
import { toastTemplates } from '@/lib/toasts';
import { clearShopsAction } from '@/redux/shops/actions';
import { apiController } from '@/api';
import { useLikes } from '@/hooks/useLikes';
import { useLikedShops } from '@/hooks/useLikedShops';
import { useSelectors } from '@/hooks/useSelectors';
import { useLoadingControll } from '@/hooks/useLoadingControll';

export const Mypage: React.VFC = () => {
  const dispatch = useDispatch();

  const {
    shops: { shops },
    users,
    utilities: { isLoading },
  } = useSelectors();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [nickName, setNickname] = useState<string>(users.name);

  const [startLoading, endLoading] = useLoadingControll();

  const getLikedShops = useLikedShops();

  useEffect(() => {
    dispatch(clearShopsAction());
    if (users.isNewUser) {
      dispatch(raiseModalAction(modalTemplates.firstVisit));
      dispatch(endNewUserAction());
    }
    if (users.isLoggedIn) {
      getLikedShops();
    }
  }, [users.isNewUser, users.uid]);

  const accountTable: TableRow[] = [
    { key: 'ニックネーム', value: users.name },
    { key: 'ログイン方法', value: providerName(users.authProvider) },
  ];

  const onClickEditIcon = (): void => {
    setEditMode(true);
  };
  const cancelEdit = (): void => {
    setEditMode(false);
    setNickname(users.name);
  };
  const applyEdit = async (): Promise<void> => {
    startLoading();
    const resource: UpdateNameResource = { uid: users.uid, name: nickName };
    if (resource.name) {
      const res = await apiController.users.updateName(resource);
      dispatch(updateUserAction({ name: res.user.name }));
      dispatch(raiseToastAction(toastTemplates.successEditing));
      setEditMode(false);
    }
    endLoading();
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const likesControll = useLikes();

  return (
    <>
      {users.isLoggedIn ? (
        <div className="mx-auto py-8 w-11/12 sm:w-3/4 lg:w-3/5 xl:w-1/2">
          <Heading>マイページ</Heading>
          <Spacer h={12} />
          <section>
            <SectionTitle title="アカウント">
              <EditControl editMode={editMode} edit={onClickEditIcon} cancel={cancelEdit} save={applyEdit} isLoading={isLoading} />
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
                    disabled={isLoading}
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
              <p>{shops.length} 件</p>
            </SectionTitle>
            <div>
              {shops.map((shop, index) => (
                <div key={index}>
                  <ShopCard
                    isLoggedIn={users.isLoggedIn}
                    isLoading={isLoading}
                    shop={shop}
                    like={likesControll.like}
                    remove={likesControll.remove}
                  />
                  <Spacer h={3} />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
