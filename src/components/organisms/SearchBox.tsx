import React, { useState } from 'react';
import { SearchIcon } from '../atoms/SearchIcon';

export const SearchBox: React.VFC = () => {
  const [searchText, updateSearchText] = useState('');

  const changeHandler = (e: Event) => {
    const el: HTMLInputElement = e.target;
    updateSearchText(el.value);
  };

  const submitHandler = e => {
    
  };
  
  return (
    <div className="flex flex-col p-2 py-6 m-h-screen w-3/4 md:w-2/4 mx-auto">
    <form
      className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky"
      onSubmit={submitHandler}
    >
      <input
        value={searchText}
        className="font-bold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
        type="text"
        placeholder="焼き鳥、吉祥寺、カフェ ..."
        onChange={changeHandler}
      />
      <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
      <SearchIcon />
      </div>
    </form>
    <h1>{searchText}</h1>
  </div>
  );
}