import React, { useState } from 'react';
import { SearchCircle } from '../atoms';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler;
};

export const SearchBar: React.VFC<Props> = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex flex-col p-2 w-3/4 md:w-2/4 mx-auto">
      <form
        className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 sticky border border-gray focus-within:border-main transition-colors"
        onSubmit={onSubmit}
      >
        <input
          value={value}
          className="font-bold rounded-full w-full py-4 pl-4 leading-tight focus:outline-none focus:shadow-outline text-xs sm:text-sm md:text-md"
          type="text"
          placeholder="焼き鳥、吉祥寺、カフェ ..."
          onChange={onChange}
        />
      <SearchCircle onClick={onSubmit} />
      </form>
    </div>
  );
}