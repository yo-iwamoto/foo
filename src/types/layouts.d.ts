import React from 'react';

export type NavMenu = {
  text: string;
  href: string;
};

export type DrawerMenu = {
  text: string;
  href: string;
  icon: React.ReactNode;
};

export type TableRow = {
  key: string;
  value: string;
};
