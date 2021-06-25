import { Loader } from '../components/atoms';

export default {
  title: 'Loader',
};

export const showLoader = (): JSX.Element => {
  return (
    <div className="pt-20">
      <Loader />
    </div>
  );
};
