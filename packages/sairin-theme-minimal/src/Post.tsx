import Head from 'next/head'
import Link from 'next/link'

export default function Post(props) {

  if (!props.post) {
    return null
  }

  return (
    <div>

      <Head>
        <title>{props.post.title} - {props.themeConfig.title}</title>

      </Head>

      <div className="container mx-auto mt-24 max-w-2xl px-4 sm:px-0">

        <div>
          <div className="flex my-8 font-bold">
            <Link href="/">{props.themeConfig.title}</Link>
          </div>
        </div>

        <div className="mb-8">
          <div className='text-3xl font-medium'>
            {props.post.title}
          </div>

          <div className='mt-2'>
            <a className='underline text-sm' target='_blank' href={props.post.issueUrl}>View on GitHub</a>
          </div>
        </div>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: props.post.html }}>

        </div>

      </div>

    </div>
  )
}