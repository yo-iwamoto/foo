import NextImage, { ImageProps } from 'next/image';

type Props = ImageProps;

export const Image: React.VFC<Props> = (props) => {
  return <NextImage {...props} />;
};
