import { Button } from "../components/atoms";

export default {
  title: 'Button'
};

export const showButton = () => {
  return (
    <>
      <Button text="BASE" />
      <div className="w-4 inline-block" />
      <Button primary text="PRIMARY" />
    </>
  );
};
