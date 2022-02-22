import Head from "next/head"
import Link from "next/link"
import dayjs from 'dayjs'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>{props.themeConfig.title}</title>
      </Head>
      <div className="container mx-auto max-w-2xl mt-24 px-4 sm:px-0">
        <div className="text-3xl font-bold mb-12">
          {props.themeConfig.title}
        </div>

        <div>
          {props.posts.map(post => {
            return (
              <div key={post.id} className="text-xl my-8">
                <Link href={`/${post.attributes.path}`}>
                  <a className="hover:underline">
                    {post.title}
                  </a>
                </Link>

                <div className="text-sm">
                  {dayjs(post.created_at).format('DD/MM/YYYY')}
                </div>
              </div>
            )
          })}
        </div>

        <footer className="my-24">
          <div className="flex gap-2">
            {props.themeConfig.links?.map((link, index) => {
              return (
                <>
                  <a className="underline" target="_blank" href={link.url} key={link.url}>
                    {link.title}
                  </a>
                  {index !== props.themeConfig.links.length - 1 && '•'}
                </>
              )
            })}
          </div>
          
        </footer>
      </div>

    </>
  )
}