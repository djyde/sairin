import axios from "axios";
import { marked } from "marked";
import fm from "front-matter";
import { pick } from 'lodash'

export type SairinConfig = {
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
  private REVALIDATE = this.resolvedConfig.ghToken ? 10 : 60

  constructor(public config?: SairinConfig) {
  }

  private allowUsers: string[] = [this.resolvedConfig.ghUserName].concat(this.config?.allowUsers || [])

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

  authHeaders = this.resolvedConfig.ghToken
    ? {
      Authorization: `bearer ${this.resolvedConfig.ghToken}`,
    }
    : ({} as any);

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
        id: post.id,
        title: post.title,
        created_at: post.created_at,
        html_url: post.html_url,
        body: post.body,
        user: pick(post.user, ["avatar_url", "name", "html_url", "login"]),
        html,
        attributes,
      };
    });

    return posts;
  }

  processBody(body: string) {
    const { body: rawBody, attributes } = fm(body);
    return {
      html: marked.parse(rawBody),
      attributes,
    };
  }

  async getUser(username: string) {
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

  DocumentHead = () => <>
    {this.config?.theme.Head && <this.config.theme.Head></this.config.theme.Head>}
  </>
}
