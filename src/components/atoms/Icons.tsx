import React from 'react';
import { IconBaseProps } from 'react-icons'
import { FaGithub, FaHeart, FaExternalLinkAlt, FaHome, FaSignInAlt, FaUserPlus, FaTimes, FaSignOutAlt, FaUser, FaTwitter, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

type Props = IconBaseProps;

export const GitHubIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaGithub {...props} />
  );
};

export const HeartIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaHeart {...props} />
  );
};

export const ExternalLinkIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaExternalLinkAlt {...props} />
  );
};


export const HomeIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaHome {...props} />
  );
};


export const SignInIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaSignInAlt {...props} />
  );
};


export const UserPlusIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaUserPlus {...props} />
  );
};


export const TimesIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaTimes {...props} />
  );
};


export const SignOutIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaSignOutAlt {...props} />
  );
};

export const UserIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaUser {...props} />
  );
};

export const TwitterIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaTwitter {...props} />
  );
};

export const PlaneIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaPaperPlane {...props} />
  );
};

export const CheckCircleIcon: React.VFC<IconBaseProps> = props => {
  return (
    <FaCheckCircle {...props} />
  );
};

export const HamburgerIcon: React.VFC<IconBaseProps> = props => {
  return (
    <GiHamburgerMenu {...props} />
  );
};