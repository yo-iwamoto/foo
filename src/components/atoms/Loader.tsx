import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';
import { useGeneralState } from '../../ducks/general/selectors';

type Props = {
  loading: boolean;
}

export const Loader: React.VFC<Props> = ({ loading }) => {
  const state = useGeneralState().general,
        color = '#ffa382',
        override = css`
          text-align: center;
          display: block;
        `;

  return (
    <>
      <SyncLoader color={color} css={override} loading={state.isLoading} size={16} />
    </>
  );
}