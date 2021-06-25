import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';

export const Loader: React.VFC = () => {
  const color = '#ffa382';
  const override = css`
    text-align: center;
    display: block;
  `;

  return <SyncLoader color={color} css={override} size={16} />;
};
