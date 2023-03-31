import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full font-open-sans font-normal leading-relaxed font-base scroll-smooth">
      <Head>
        {/* This is the NextJs way to preload fonts. Suppressing ESLint warning. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/fonts/fonts.css" rel="stylesheet" />

        {/* <!-- Primary Meta Tags --> */}
        {/* <meta name="title" content="$APOLLO - The Daylight ecosystem's undisputed true wealth storage token. " />
        <meta
          name="description"
          content="The world's first multifaceted decentralized launch portal with an ever appreciating token and supportive ecosystem branches."
        /> */}

        {/* <!-- Open Graph / Facebook --> */}
        {/* <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ignite.apollolaunch.tech/" />
        <meta property="og:title" content="$APOLLO - The Daylight ecosystem's undisputed true wealth storage token. " />
        <meta
          property="og:description"
          content="The world's first multifaceted decentralized launch portal with an ever appreciating token and supportive ecosystem branches."
        />
        <meta property="og:image" content="/images/meta-image.png" /> */}

        {/* <!-- Twitter --> */}
        {/* <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://ignite.apollolaunch.tech/" />
        <meta
          property="twitter:title"
          content="$APOLLO - The Daylight ecosystem's undisputed true wealth storage token. "
        />
        <meta
          property="twitter:description"
          content="The world's first multifaceted decentralized launch portal with an ever appreciating token and supportive ecosystem branches."
        />
        <meta property="twitter:image" content="/images/meta-image.png" /> */}

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/favicon.png" color="#b35bd5" />
        <meta name="msapplication-TileColor" content="#b35bd5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
