import { AppProps } from 'next/app';
import { Layout } from '../components/templates/Layout';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Foo ひとりご飯の検索サイト</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
