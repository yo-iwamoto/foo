import { FadeLoader } from "react-spinners"
import { css } from '@emotion/core';

export const CircleLoader: React.VFC = () => {
  const color = '#ffa382';
  const override = css`
    height: 0px;
    transform: scale(.5) translateY(-44px) translateX(-24px);
  `
  return <FadeLoader color={color} css={override} />;
};
