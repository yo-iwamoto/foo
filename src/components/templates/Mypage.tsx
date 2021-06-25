import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';
import { modalTemplates } from '@/lib/modals';
import { endNewUserAction, updateUserAction } from '@/redux/users/actions';
import { Shop, TableRow } from '@/types';
import { providerName } from '@/lib/providerName';

import { Heading, TextField, Image } from '@/components/atoms';
import { SectionTitle, Table } from '@/components/molecules';
import { ShopCard, EditControl } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { UpdateNameResource } from '@/types';
import { toastTemplates } from '@/lib/toasts';
import { ShopsLikesController, UsersController, UsersLikesController } from '@/api';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useUsersState, useUtilitiesState } from '@/hooks/useSelectors';

export const Mypage: React.VFC = () => {
  const dispatch = useDispatch();
  const noShopImageUrl = '/images/no-shop.png';

  const user = useUsersState();
  const { isLoading } = useUtilitiesState();

  const [shops, setShops] = useState<Shop[]>([]);
  const [noShops, setNoShops] = useState(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [nickName, setNickname] = useState<string>(user.name);

  const [startLoading, endLoading] = useLoadingControll();

  useEffect(() => {
    if (user.isNewUser) {
      dispatch(raiseModalAction(modalTemplates.firstVisit));
      dispatch(endNewUserAction());
    }
    if (user.isLoggedIn) {
      UsersLikesController.index(user.uid).then((res) => {
        if (res?.shops) {
          setShops(res.shops);
        } else {
          setNoShops(true);
        }
      });
    }
  }, [user.isNewUser, user.uid]);

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
    startLoading();
    const resource: UpdateNameResource = { uid: user.uid, name: nickName };
    if (resource.name) {
      const res = await UsersController.updateName(resource);
      dispatch(updateUserAction({ name: res.user.name }));
      dispatch(raiseToastAction(toastTemplates.successEditing));
      setEditMode(false);
    }
    endLoading();
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const addLike = async (id: string): Promise<void> => {
    if (user.isLoggedIn) {
      try {
        await ShopsLikesController.create(id);
      } catch (err) {
        throw err;
      }
    } else {
      dispatch(raiseModalAction(modalTemplates.like));
    }
  };
  const removeLike = async (id: string): Promise<void> => {
    try {
      await ShopsLikesController.destroy(id);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {user.isLoggedIn ? (
        <div className="mx-auto py-8 w-11/12 sm:w-3/4 lg:w-3/5 xl:w-1/2">
          <Heading>マイページ</Heading>
          <Spacer h={12} />
          <section>
            <SectionTitle title="アカウント">
              <EditControl
                editMode={editMode}
                edit={onClickEditIcon}
                cancel={cancelEdit}
                save={applyEdit}
                isLoading={isLoading}
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
            <SectionTitle title="お気に入りリスト">{!isLoading && <p>{shops.length} 件</p>}</SectionTitle>
            {!noShops ? (
              <div>
                {shops.map((shop, index) => (
                  <div key={index}>
                    <ShopCard
                      isLoggedIn={user.isLoggedIn}
                      isLoading={isLoading}
                      shop={shop}
                      like={addLike}
                      remove={removeLike}
                    />
                    <Spacer h={3} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <Image src={noShopImageUrl} width={288} height={288} />
                <p>まだお気に入りのお店がないようです...</p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
