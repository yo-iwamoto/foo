import { AppProps } from 'next/app';
import { Layout } from '../components/templates/Layout';
import '../styles.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import createStore from '../ducks/createStore';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={createStore()}>
      <Head>
        <title>Foo - ひとりご飯の検索サイト</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
        <link rel="icon" href="favicon.ico"/>
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png" sizes="180x180" />
        <link rel="android-touch-icon" href="images/android-touch-icon.png" sizes="192x192" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
