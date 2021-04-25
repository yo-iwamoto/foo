import React from 'react';

export const About: React.VFC = () => {
  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-4xl text-center mt-8 whitespace-pre-wrap font-bold">
        Fooとは？
      </h1>
      <div className="h-8" />
      <section className="w-3/4 md:w-2/4 mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl">
          ひとりで入りやすいお店を見つける
        </h2>
        <div className="h-4" />
        <p>
          行ったことがないお店は雰囲気が分からず、「ひとりで入ったら迷惑かも…？」と、少し入りにくく感じてしまうもの。
          <br/>これからはFooで、あなたのお気に入りのお店を見つけましょう。
        </p>
      </section>
    </>
  );
}