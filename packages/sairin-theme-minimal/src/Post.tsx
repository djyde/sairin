import Head from 'next/head'
import Link from 'next/link'

export default function Post(props) {

  if (!props.post) {
    return null
  }

  return (
    <div>

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

        <title>{props.post.title} - {props.themeConfig.title}</title>

      </Head>

      <div className="container mx-auto mt-24 max-w-2xl">

        <div>
          <div className="flex my-8 font-bold">
            <Link href="/">{props.themeConfig.title}</Link>
          </div>
        </div>

        <div className="text-3xl font-medium mb-8">
          {props.post.title}
        </div>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: props.post.html }}>

        </div>

      </div>

    </div>
  )
}