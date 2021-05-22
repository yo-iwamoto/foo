import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';
import { shallowEqual, useSelector } from 'react-redux';
import { DefaultRootState } from 'react-redux';
import { State, UtilityState } from '../../redux/types';

export const Loader: React.VFC = () => {
  const color = '#ffa382',
    override = css`
      text-align: center;
      display: block;
    `;
  const { isLoading } = useSelector<State, UtilityState>(
    (state) => state.utilities,
    shallowEqual,
  );

  return (
    <>
      <SyncLoader color={color} css={override} loading={isLoading} size={16} />
    </>
  );
};
