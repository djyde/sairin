import { Html, Head, Main, NextScript } from 'next/document'
import { sairin } from './_app'

export default function Document() {
  return (
    <Html>
      <Head>
        <sairin.DocumentHead />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}