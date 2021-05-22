import { ModalState } from '../redux/types';

const like: ModalState = {
  type: 'registration',
  title: 'ログインして、もっと便利に',
  message:
    'Fooにログインすると、気に入ったお店をお気に入り登録してリスト化することができるようになります。\nご利用は完全に無料で、料金は一切発生いたしません。',
  link: '/users/login',
  buttonText: '',
};

const finishVerified: ModalState = {
  type: 'success',
  title: '登録が完了しました！',
  message:
    '本人確認が完了し、アカウントが有効化されました。\nこれ以降、ご登録いただいたメールアドレスとパスワードでログインできます。\n続けてログインを行ってください。',
  link: null,
  buttonText: '確認',
};

const alreadyVerified: ModalState = {
  type: 'success',
  title: 'アカウントは既に有効です！',
  message: '既に本人確認が完了しています。ログインしてください。',
  link: null,
  buttonText: '確認',
};

const checkEmail: ModalState = {
  type: 'mail',
  title: 'メールを確認してください',
  message:
    '本人確認のため、登録したメールアドレスにメールを送信しました。\nメール本文中のリンクをクリックして、アカウントを有効化してください。',
  link: null,
  buttonText: '確認',
};

const firstVisit: ModalState = {
  type: 'success',
  title: 'はじめまして！',
  message:
    'ご登録いただきありがとうございます！\nマイページではお気に入りしたお店の確認などができます。\nまずは近くの飲食店を探してみましょう。',
  link: '/',
  buttonText: 'お店を探す',
};

export const modalTemplates = {
  like,
  finishVerified,
  alreadyVerified,
  checkEmail,
  firstVisit,
};
