import NextImage from 'next/image';

type Props = {
  src: string;
  height: number;
  width: number;
};

export const Image: React.VFC<Props> = props => {
  return (
    <NextImage {...props} />
  );
};