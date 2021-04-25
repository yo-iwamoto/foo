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
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
