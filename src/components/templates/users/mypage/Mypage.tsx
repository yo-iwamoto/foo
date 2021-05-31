import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ShopState, State, UserState } from '@/redux/types';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';
import { modalTemplates } from '@/lib/modals';
import { endNewUserAction, updateUserAction } from '@/redux/users/actions';
import { Shop, TableRow } from '@/types';
import { providerName } from '@/lib/providerName';

import { Heading, TextField } from '@/components/atoms';
import { SectionTitle, Table } from '@/components/molecules';
import { Card, EditControl } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { UpdateNameResource } from '@/types';
import { toastTemplates } from '@/lib/toasts';
import { addShopsAction, clearShopsAction, getShopsAction } from '@/redux/shops/actions';
import { apiController } from '@/api';
import { useLikes } from '@/hooks/useLikes';

export const Mypage: React.VFC = () => {
  const dispatch = useDispatch();

  const user = useSelector<State, UserState>((state) => state.users, shallowEqual);
  const { shops } = useSelector<State, ShopState>((state) => state.shops, shallowEqual);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [nickName, setNickname] = useState<string>(user.name);

  const likeAll = (shops: Shop[]): Shop[] => {
    shops.map((shop) => {
      shop.like = true;
    });
    return shops;
  };

  const getShops = async (): Promise<void> => {
    if (user.uid) {
      const likedShops = await apiController.users.likes.index(user.uid);
      let ids: string[] = [];
      likedShops.map((shop) => {
        ids.push(shop.hotpepper_id);
      });

      if (ids.length !== 0) {
        if (ids.length <= 10) {
          const { shop } = await apiController.hotpepper.index({ ids });
          likeAll(shop);
          dispatch(getShopsAction(shop));
        } else {
          // hotpepper API から上限の10件ずつ取得
          let i: number = 0;
          while (true) {
            if (i + 10 < ids.length) {
              const { shop } = await apiController.hotpepper.index({
                ids: ids.slice(i, i + 10),
              });
              likeAll(shop);
              dispatch(addShopsAction(shop));
              i += 10;
            } else {
              const { shop } = await apiController.hotpepper.index({
                ids: ids.slice(i),
              });
              likeAll(shop);
              dispatch(addShopsAction(shop));
              break;
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    dispatch(clearShopsAction());
    if (user.isNewUser) {
      dispatch(raiseModalAction(modalTemplates.firstVisit));
      dispatch(endNewUserAction());
    }
    if (shops.length !== 1) {
      getShops();
    } else {
      clearShopsAction();
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
    const resource: UpdateNameResource = { uid: user.uid, name: nickName };
    if (resource.name) {
      const res = await apiController.users.updateName(resource);
      dispatch(updateUserAction({ name: res.user.name }));
      dispatch(raiseToastAction(toastTemplates.successEditing));
      setEditMode(false);
    }
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const likesControll = useLikes();

  const like = async (id: string): Promise<void> => {
    await likesControll.like(id);
  };

  const remove = async (id: string): Promise<void> => {
    await likesControll.remove(id);
  };

  return (
    <>
      {user.isLoggedIn ? (
        <div className="mx-auto py-8 w-11/12 sm:w-3/4 lg:w-3/5 xl:w-1/2">
          <Heading>マイページ</Heading>
          <Spacer h={12} />
          <section>
            <SectionTitle title="アカウント">
              <EditControl editMode={editMode} edit={onClickEditIcon} cancel={cancelEdit} save={applyEdit} />
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
              <p>{shops.length} 件</p>
            </SectionTitle>
            <div>
              {shops.map((shop, index) => (
                <div key={index}>
                  <Card shop={shop} like={like} remove={remove} />
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
