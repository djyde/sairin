import Head from 'next/head'
import Link from 'next/link'
import { OpenGraph } from './OpenGraph'

export default function Post(props) {

  if (!props.post) {
    return null
  }

  return (
    <div>

      <Head>
        <title>{props.post.title} - {props.themeConfig.title}</title>
        <OpenGraph post={props.post} />
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

          <div className='flex mt-4 items-center gap-2'>
            <img className='w-8 h-8 rounded-full' src={ props.post.user.avatar_url }></img>

            <a target='_blank' href={props.post.user.html_url}>{props.post.user.login}</a>

            <a className='underline text-sm' target='_blank' href={props.post.issueUrl}>View on GitHub</a>

          </div>

          <div className='mt-2'>
          </div>
        </div>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: props.post.html }}>

        </div>

      </div>

    </div>
  )
}