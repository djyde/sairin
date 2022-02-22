import { getPostList, resolvedConfig } from './core';

export class Sairin {

  private PAGE_PATH_PLACEHOLDER = 'path'
  private REVALIDATE = resolvedConfig.ghToken ? 10 : 60

  constructor(public config?: {
    theme: any,
    themeConfig?: Record<string, any>
  }) {
  }

  getHomePageStaticProps = async () => {
    const posts = await getPostList()

    return {
      props: {
        // TODO: reduce post body size
        posts,
        themeConfig: this.config?.themeConfig || {}
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
        post,
        themeConfig: this.config?.themeConfig || {},
      },
      revalidate: this.REVALIDATE,
    };
  }
}
