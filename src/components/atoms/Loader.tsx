import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';

type Props = {
  isLoading: boolean;
};

export const Loader: React.VFC<Props> = ({ isLoading }) => {
  const color = '#ffa382',
    override = css`
      text-align: center;
      display: block;
    `;

  return <SyncLoader color={color} css={override} loading={isLoading} size={16} />;
};
