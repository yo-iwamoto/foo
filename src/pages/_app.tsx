import { AppProps } from 'next/app';
import { Layout } from '../components/templates/Layout';
import '../styles.css';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Foo ひとりご飯の検索サイト</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="favicon.ico"/>
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png" sizes="180x180" />
        <link rel="android-touch-icon" href="images/android-touch-icon.png" sizes="192x192" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
