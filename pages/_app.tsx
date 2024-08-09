// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head'; // Import Head from next/head
import '../styles/globals.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Aclonica&family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
