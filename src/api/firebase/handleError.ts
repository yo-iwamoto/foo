const firebaseError = {
  existEmail: 'auth/email-already-in-use',
  internalError: 'auth/internal-error',
  invalidEmail: 'auth/invalid-email',
  weakPassword: 'auth/weak-password',
  wrongPassword: 'auth/wrong-password',
  invalidPassword: 'auth/invalid-password',
  noUser: 'auth/user-not-found',
};

type FirebaseError = {
  code: string;
};

export const handleFirebaseError = (e: FirebaseError): void => {
  switch (e.code) {
    case firebaseError.existEmail:
      alert('既に登録済みのメールアドレスです\nログインしてください');
      break;
    case firebaseError.internalError:
      alert('予期しないエラーが発生しました');
      break;
    case firebaseError.invalidEmail:
      alert('無効なメールアドレスが入力されています');
      break;
    case firebaseError.weakPassword:
      alert('パスワードは6文字以上で入力してください');
      break;
    case firebaseError.wrongPassword:
      alert('パスワードが誤っています');
      break;
    case firebaseError.invalidPassword:
      alert('無効なパスワードが入力されています');
      break;
    case firebaseError.noUser:
      alert('登録されていないメールアドレスです\n会員登録を行ってください');
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        alert(e.code);
      }
  }
};
