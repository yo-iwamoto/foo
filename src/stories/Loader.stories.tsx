import { Loader } from '../components/atoms';

export default {
  title: 'Loader',
};

export const showLoader = () => {
  return (
    <div className="pt-20">
      <Loader isLoading />
    </div>
  );
};
