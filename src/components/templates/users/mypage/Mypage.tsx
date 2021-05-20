import React, { useEffect } from 'react';
import { Heading, Link, SubHeading } from '../../../atoms';
import { Spacer } from '../../../utilities';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalState, State, UserState } from '../../../../redux/types';
import { raiseModalAction } from '../../../../redux/utilities/actions';
import { modalTemplates } from '../../../../lib/modals';
import { endNewUserAction } from '../../../../redux/users/actions';

export const Mypage: React.VFC = () => {
  const user = useSelector<State, UserState>(state => state.users, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isNewUser) {
      dispatch(raiseModalAction(modalTemplates.firstVisit));
      dispatch(endNewUserAction());
    }
  }, [user.isNewUser])

  return (
    <>
      <Spacer h={12} />
      {user.isLoggedIn
        ? <>
            <Heading>マイページ</Heading>
            <Spacer h={6} />
            <div className="w-4/5 mx-auto">
              <SubHeading>{user.name}さん のマイページ</SubHeading>
            </div>
          </>
        : <div/>
      }
    </>
  );
}