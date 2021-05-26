import React from 'react';
import { Heading } from '@/components/atoms';
import { GitHubIcon, TwitterIcon } from '@/components/atoms/Icons';
import { Flex, Spacer } from '@/components/utilities';
import { useFadeIn } from '@/hooks/useFadeIn';

export const Manager: React.VFC = () => {
  const [fadeInStyle] = useFadeIn();
  return (
    <div className={fadeInStyle()}>
      <Spacer h={6} />
      <Heading>管理者について</Heading>
      <Spacer h={6} />
      <p className="text-center">
        当サイトは
        <span className="font-bold underline">現在開発中</span>
        です
      </p>
      <Spacer h={6} />
      <Flex jBetween aCenter className="w-64 mx-auto">
        <Flex col aCenter>
          <a href="https://github.com/you-5805" target="_blank">
            <GitHubIcon size="64" />
          </a>
          <p className="text-lg">@you-5805</p>
        </Flex>
        <Flex col aCenter>
          <a href="https://twitter.com/you_5805" target="_blank">
            <TwitterIcon size="64" color="skyblue" />
          </a>
          <p className="text-lg">@you_5805</p>
        </Flex>
      </Flex>
    </div>
  );
};
