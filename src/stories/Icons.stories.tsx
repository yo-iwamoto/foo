import { IconBaseProps } from 'react-icons';
import {
  CheckCircleIcon,
  EditIcon,
  EnvelopeIcon,
  ExternalLinkIcon,
  GitHubIcon,
  HamburgerIcon,
  HeartIcon,
  HeartOutlineIcon,
  HomeIcon,
  PlaneIcon,
  SignInIcon,
  SignOutIcon,
  TimesCircleIcon,
  TimesIcon,
  TrashIcon,
  TwitterIcon,
  UserIcon,
  UserPlusIcon,
  UtensilsIcon,
} from '../components/atoms/Icons';
import '@/styles.css';

export default {
  title: 'Icons',
};

export const showIcons = (): JSX.Element => {
  const iconProps: IconBaseProps = {
    size: 30,
    cursor: 'pointer',
  };
  const blockClassName = 'flex flex-col items-center w-36 h-24';

  return (
    <div className="flex flex-wrap">
      <div className={blockClassName}>
        <p className="pb-2">GitHub</p>
        <GitHubIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Heart</p>
        <HeartIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">HeartOutline</p>
        <HeartOutlineIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">ExternalLink</p>
        <ExternalLinkIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Home</p>
        <HomeIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">SignIn</p>
        <SignInIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">UserPllus</p>
        <UserPlusIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Times</p>
        <TimesIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">SignOut</p>
        <SignOutIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">User</p>
        <UserIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Twitter</p>
        <TwitterIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Plane</p>
        <PlaneIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">CheckCircle</p>
        <CheckCircleIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Utensils</p>
        <UtensilsIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Envelope</p>
        <EnvelopeIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Edit</p>
        <EditIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">TimesCircle</p>
        <TimesCircleIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Trash</p>
        <TrashIcon {...iconProps} />
      </div>
      <div className={blockClassName}>
        <p className="pb-2">Hamburger</p>
        <HamburgerIcon {...iconProps} />
      </div>
    </div>
  );
};
