import React, { useState } from 'react';
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
      <div
        onClick={submitHandler}
        className="p-2 hover:bg-main hover:text-white cursor-pointer mx-2 rounded-full"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd"
          />
        </svg>
      </div>
    </form>
  </div>
  );
}