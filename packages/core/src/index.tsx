import axios from "axios";
import { marked } from "marked";
import fm from "front-matter";
import { omit, pick } from "lodash";
import { Feed } from "feed";

import * as prism from "prismjs";
import { GetPostQueryProps, GetPostsQuery } from "./queries";

export type FrontMatter = {
  path: string;
};

export type SairinConfig = {
  siteConfig: {
    title: string;
    author?: string;
    url?: string;
  };
  theme: any;
  themeConfig: Record<string, any>;
  allowUsers?: string[];
};

export class Sairin {
  resolvedConfig = (() => {
    const ghToken = (process.env.GITHUB_TOKEN as string) || undefined;
    const repo =
      process.env.REPO ||
      (`${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` as string);

    const [ghUserName, repoSlug] = repo.split("/");

    return {
      ghToken,
      repo,
      ghUserName,
      repoSlug,
    };
  })();

  private PAGE_PATH_PLACEHOLDER = "path";

  private REVALIDATE = 60;

  private allowUsers: string[] = [this.resolvedConfig.ghUserName].concat(
    this.config?.allowUsers || []
  );

  private authHeaders = this.resolvedConfig.ghToken
    ? {
        Authorization: `bearer ${this.resolvedConfig.ghToken}`,
      }
    : ({} as any);

  private async request<T>(query: { query: string; variables: any }) {
    const res = await axios.post("https://api.github.com/graphql", query, {
      headers: this.authHeaders,
    });
    return res.data.data as T;
  }

  constructor(public config: SairinConfig) {}

  getPostList = async () => {
    const result = await this.request<GetPostQueryProps>(
      GetPostsQuery({
        owner: this.resolvedConfig.ghUserName,
        repo: this.resolvedConfig.repoSlug,
      })
    );

    const posts = result.repository.issues.nodes
      .filter((post) => {
        return this.allowUsers.indexOf(post.author.login) !== -1;
      })
      .map((post) => {
        const { html, attributes } = this.processBody(post.body);
        post.comments.nodes = post.comments.nodes.map((comment) => {
          const { html } = this.processBody(comment.body);
          return {
            ...comment,
            html,
          };
        });

        return {
          ...post,
          labels: post.labels.nodes.reduce(
            (filtered, label) =>
              label.name === "published"
                ? filtered
                : [
                    ...filtered,
                    {
                      ...label,
                      color: "#" + label.color,
                    },
                  ],
            []
          ),
          html,
          attributes,
        };
      });

    return posts;
  };

  private processBody(body: string) {
    const { body: rawBody, attributes } = fm<FrontMatter>(body);
    marked.use({
      renderer: {
        code(code, lang, escaped) {
          code = this.options.highlight(code, lang);
          if (!lang) {
            return `<pre><code>${code}</code></pre>`;
          }

          var langClass = "language-" + lang;
          return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
        },
      },
    });
    const parsed = marked.parse(rawBody, {
      highlight: (code, lang) => {
        if (prism.languages[lang]) {
          return prism.highlight(code, prism.languages[lang], lang);
        } else {
          return code;
        }
      },
    });
    return {
      html: parsed,
      attributes,
    };
  }

  private async getUser(username: string) {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data;
  }

  getStaticPaths = async () => {
    const posts = await this.getPostList();
    return {
      paths: posts.map((p) => {
        return `/${p.attributes.path || p.number}`;
      }),
      fallback: true,
    };
  };

  getHomePageStaticProps = async () => {
    const posts = (await this.getPostList()).map((post) => {
      return omit(post, ["body", "html"]);
    });

    return {
      props: {
        // TODO: reduce post body size
        posts,
        themeConfig: this.config.themeConfig || {},
      },
      revalidate: this.REVALIDATE,
    };
  };

  getPostPageStaticProps = async (ctx) => {
    const posts = await this.getPostList();
    const post =
      posts.find(
        (p) =>
          p.attributes.path ===
            ctx.params[this.PAGE_PATH_PLACEHOLDER].join("/") ||
          p.number === parseInt(ctx.params[this.PAGE_PATH_PLACEHOLDER], 10)
      ) || null;
    return {
      props: {
        post,
        themeConfig: this.config?.themeConfig || {},
      },
      revalidate: this.REVALIDATE,
    };
  };

  private generateFeed = async () => {
    const feed = new Feed({
      title: this.config.siteConfig.title,
      copyright: this.config.siteConfig.title,
      id: this.config.siteConfig.title,
      author: {
        name: this.config.siteConfig.author || this.resolvedConfig.ghUserName,
      },
    });

    if (!this.config.siteConfig.url) {
      return feed.atom1();
    }

    const posts = await this.getPostList();

    posts.forEach((post) => {
      feed.addItem({
        date: new Date(post.updatedAt),
        link: `${this.config.siteConfig.url}/${post.attributes.path}`,
        title: post.title,
        content: post.html,
      });
    });

    return feed.atom1();
  };

  rssHandler = async (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
    res.setHeader(
      "Cache-Control",
      `s-maxage=1 stale-while-revalidate=${10 * 60}`
    );
    res.send(await this.generateFeed());
  };

  DocumentHead = () => (
    <>
      {this.config?.theme.Head && (
        <this.config.theme.Head
          sairinConfig={this.config}
        ></this.config.theme.Head>
      )}
    </>
  );
}

export type HomePageThemeProps = Awaited<
  ReturnType<Sairin["getHomePageStaticProps"]>
>["props"];
export type PostPageThemeProps = Awaited<
  ReturnType<Sairin["getPostPageStaticProps"]>
>["props"];
