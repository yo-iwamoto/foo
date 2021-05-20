import React from 'react';
import { AuthProvider } from '../../redux/types';
import { EnvelopeIcon } from '../atoms/Icons';

type Props = {
  provider: AuthProvider | null;
};

export const Provider: React.VFC<Props> = ({ provider }) => {
  return (
    <EnvelopeIcon />
  );
};