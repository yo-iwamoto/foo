import { useState, useEffect } from 'react';

export const useFadeIn = (): [fadeInStyle: () => string] => {
  const [entering, setEntering] = useState<boolean>(false);
  const fadeInStyle = (): string => {
    const defaultStyle = 'text-center transform transition-all duration-1000 ';
    if (entering) {
      return defaultStyle;
    } else {
      return defaultStyle + 'opacity-0 translate-y-2';
    }
  };
  useEffect(() => {
    setEntering(true);
  });
  return [fadeInStyle];
};
