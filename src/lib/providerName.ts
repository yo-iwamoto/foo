import { AuthProvider } from '@/redux/types';

export const providerName = (provider: AuthProvider): string => {
  switch (provider) {
    case 'firebase':
      return 'メールアドレス';
      break;
    case 'google.com':
      return 'Google';
      break;
    case 'twitter.com':
      return 'Twitter';
      break;
    default:
      return '';
  }
};
