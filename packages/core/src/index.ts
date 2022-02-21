import { getPostList } from './core';

export class Sairin {

  private PAGE_PATH_PLACEHOLDER = 'path'
  private REVALIDATE = 10

  constructor(public config?: {
    theme: any
  }) {

  }

  getHomePageStaticProps = async () => {
    const posts = await getPostList()

    return {
      props: {
        posts
      },
      revalidate: this.REVALIDATE
    }
  }

  getStaticPaths = async () => {
    const posts = await getPostList()
    return {
      paths: posts.map(p => {
        // TODO: the fallback path should be issue id
        return `/${p.attributes.path || ''}`
      }),
      fallback: true
    }
  }

  getPostPageStaticProps = async (ctx) => {
    const posts = await getPostList() as any[]
    const post = posts.find(p => p.attributes.path === ctx.params[this.PAGE_PATH_PLACEHOLDER].join('/')) || null
    return {
      props: {
        post
      },
      revalidate: this.REVALIDATE
    }
  }
}
