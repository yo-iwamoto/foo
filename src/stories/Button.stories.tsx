import { Button } from '../components/atoms';

export default {
  title: 'Button',
};

export const showButton = (): JSX.Element => {
  return (
    <>
      <Button text="BASE" />
      <div className="w-4 inline-block" />
      <Button primary text="PRIMARY" />
    </>
  );
};
