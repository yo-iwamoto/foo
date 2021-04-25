import React, { useState } from 'react';
import { SearchIcon } from '../atoms/SearchIcon';
import { useRouter } from 'next/router';

export const SearchBox: React.VFC = () => {
  const router = useRouter();

  const [searchText, updateSearchText] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchText(e.target.value)
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/restaurants/?word=${searchText}`)
    }
  };
  
  return (
    <div className="flex flex-col p-2 py-6 m-h-screen w-3/4 md:w-2/4 mx-auto">
    <form
      className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky border border-gray focus-within:border-green-400"
      onSubmit={submitHandler}
    >
      <input
        value={searchText}
        className="font-bold rounded-full w-full py-4 pl-4 leading-tight focus:outline-none focus:shadow-outline text-xs sm:text-sm md:text-md"
        type="text"
        placeholder="焼き鳥、吉祥寺、カフェ ..."
        onChange={changeHandler}
      />
      <div
        onClick={submitHandler}
        className="p-2 hover:bg-main hover:text-white cursor-pointer mx-2 rounded-full"
      >
        <SearchIcon />
      </div>
    </form>
  </div>
  );
}