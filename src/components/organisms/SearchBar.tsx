import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchCircle } from '../atoms';

export const SearchBar: React.VFC = () => {
  const router = useRouter();

  const [searchText, updateSearchText] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchText(e.target.value)
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search/?word=${searchText}`)
    }
  };
  
  return (
    <div className="flex flex-col p-2 py-6 m-h-screen w-3/4 md:w-2/4 mx-auto">
      <form
        className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky border border-gray focus-within:border-accent transition-colors"
        onSubmit={submitHandler}
      >
        <input
          value={searchText}
          className="font-bold rounded-full w-full py-4 pl-4 leading-tight focus:outline-none focus:shadow-outline text-xs sm:text-sm md:text-md"
          type="text"
          placeholder="焼き鳥、吉祥寺、カフェ ..."
          onChange={changeHandler}
        />
      <SearchCircle onClick={submitHandler} />
      </form>
    </div>
  );
}