import React from 'react';
import { Heading } from '../../atoms';
import { Spacer } from '../../utilities';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export const Manager: React.VFC = () => {
  return (
    <>
      <Spacer h={6} />
      <Heading>管理者について</Heading>
      <Spacer h={6} />
      <p className="text-center">
        当サイトは
        <span className="font-bold underline">
          現在開発中
        </span>
        です
      </p>
      <Spacer h={6} />
      <div className="flex justify-between items-center w-64 mx-auto">

        <div className="flex flex-col items-center">
          <a href="https://github.com/you-5805" target="_blank">
            <FaGithub size="64" />
          </a>
          <p className="text-lg">@you-5805</p>
        </div>

        <div className="flex flex-col items-center">
          <a href="https://twitter.com/you_5805" target="_blank">
            <FaTwitter size="64" color="skyblue"/>
          </a>
          <p className="text-lg">@you_5805</p>
        </div>

      </div>
    </>
  );
}