import { useState, useEffect } from 'react';

export const useFadeIn = (): [fadeInStyle: () => string] => {
  const [entering, setEntering] = useState<boolean>(false);
  const fadeInStyle = (): string => {
    let result = 'text-center transform transition-all duration-1000 ';
    if (!entering) {
      result += 'opacity-0 translate-y-2';
    }
    return result;
  };
  useEffect(() => {
    setEntering(true);
  });
  return [fadeInStyle];
};
