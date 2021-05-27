import { AuthProvider } from '@/types';

export const providerName = (provider: AuthProvider): string => {
  switch (provider) {
    case 'firebase':
      return 'メールアドレス';
    case 'google.com':
      return 'Google';
    case 'twitter.com':
      return 'Twitter';
    default:
      return '';
  }
};
