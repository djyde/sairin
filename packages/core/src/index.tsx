import axios from "axios";
import { marked } from "marked";
import fm from "front-matter";
import { pick } from 'lodash'
import { Feed } from 'feed'

import * as prism from 'prismjs'

marked.setOptions({
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
})

export type SairinConfig = {
  siteConfig: {
    title: string,
    author?: string,
    url?: string,
  },
  theme: any;
  themeConfig?: Record<string, any>;
  allowUsers?: string[]
};

export class Sairin {

  resolvedConfig = (() => {
    const ghToken = (process.env.GITHUB_TOKEN as string) || undefined;
    const repo =
      process.env.REPO ||
      (`${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` as string);

    const [ghUserName, repoSlug] = repo.split("/")

    return {
      ghToken,
      repo,
      ghUserName,
      repoSlug
    };
  })();

  private PAGE_PATH_PLACEHOLDER = 'path'

  private REVALIDATE = 60

  private allowUsers: string[] = [this.resolvedConfig.ghUserName].concat(this.config?.allowUsers || [])

  private authHeaders = this.resolvedConfig.ghToken
    ? {
      Authorization: `bearer ${this.resolvedConfig.ghToken}`,
    }
    : ({} as any);


  constructor(public config: SairinConfig) {
  }

  async getPostList() {
    // https://docs.github.com/en/rest/reference/issues#list-repository-issues
    const res = await axios.get(
      `https://api.github.com/repos/${this.resolvedConfig.repo}/issues?state=all&per_page=100`,
      {
        params: {
          state: "all",
          per_page: 100,
          labels: ["published"].join(","),
        },
        headers: {
          ...this.authHeaders,
        },
      }
    );

    const posts = res.data.filter(post => {
      return this.allowUsers.indexOf(post.user.login) !== -1
    }).map((post) => {
      const { html, attributes } = this.processBody(post.body);
      return {
        // ...post,
        ...pick(post, ['id', 'title', 'created_at', 'updated_at', 'html_url', 'body']),
        user: pick(post.user, ["avatar_url", "name", "html_url", "login"]),
        html,
        attributes,
      };
    });

    return posts;
  }

  private processBody(body: string) {
    const { body: rawBody, attributes } = fm(body);
    return {
      html: marked.parse(rawBody),
      attributes,
    };
  }

  private async getUser(username: string) {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data;
  }

  getStaticPaths = async () => {
    const posts = await this.getPostList()
    return {
      paths: posts.map(p => {
        // TODO: the fallback path should be issue id
        return `/${p.attributes.path || ''}`
      }),
      fallback: true
    }
  }

  getHomePageStaticProps = async () => {
    const posts = await this.getPostList()
    const user = await this.getUser(this.resolvedConfig.ghUserName)
    return {
      props: {
        // TODO: reduce post body size
        posts,
        user: {
          avatarUrl: user.avatar_url,
          name: user.name
        },
        themeConfig: this.config?.themeConfig || {}
      },
      revalidate: this.REVALIDATE
    }
  }

  getPostPageStaticProps = async (ctx) => {
    const posts = await this.getPostList() as any[]
    const post = posts.find(p => p.attributes.path === ctx.params[this.PAGE_PATH_PLACEHOLDER].join('/')) || null
    return {
      props: {
        post,
        themeConfig: this.config?.themeConfig || {},
      },
      revalidate: this.REVALIDATE,
    };
  }

  private generateFeed = async () => {

    const feed = new Feed({
      title: this.config.siteConfig.title,
      copyright: this.config.siteConfig.title,
      id: this.config.siteConfig.title,
      author: {
        name: this.config.siteConfig.author || this.resolvedConfig.ghUserName,
      }
    })

    if (!this.config.siteConfig.url) {
      return feed.atom1()
    }

    const posts = await this.getPostList()

    posts.forEach(post => {
      feed.addItem({
        date: new Date(post.updated_at),
        link: `${this.config.siteConfig.url}/${post.attributes.path}`,
        title: post.title,
        content: post.html,
      })
    })

    return feed.atom1()
  }

  rssHandler = async (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
    res.setHeader('Cache-Control', `s-maxage=1 stale-while-revalidate=${10 * 60}`)
    res.send(await this.generateFeed())
  }

  DocumentHead = () => <>
    {this.config?.theme.Head && <this.config.theme.Head></this.config.theme.Head>}
  </>
}
