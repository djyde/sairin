import axios from "axios";
import { marked } from 'marked'
import fm from 'front-matter'

export const resolvedConfig = {
  ghToken: process.env.GITHUB_TOKEN as string || undefined,
  repo: process.env.REPO ||
  `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` as string

};
  
const authHeaders = resolvedConfig.ghToken ? {
  Authorization: `bearer ${resolvedConfig.ghToken}`,
} : {
  
} as any

export async function getPostList() {

  // https://docs.github.com/en/rest/reference/issues#list-repository-issues
  const res = await axios.get(
    `https://api.github.com/repos/${resolvedConfig.repo}/issues?state=all&per_page=100`,
    {
      params: {
        state: "all",
        per_page: 100,
        labels: ["published"].join(","),
      },
      headers: {
        ...authHeaders,
      },
    }
  );

  const posts = res.data.map((post) => {
    const { html, attributes } = processBody(post.body);
    return {
      // ...post,
      id: post.id,
      title: post.title,
      createdAt: post.created_at,
      issueUrl: post.html_url,
      html,
      attributes,
    };
  });

  return posts;
}

function processBody(body: string) {
  const { body: rawBody, attributes } = fm(body)
  return {
    html: marked.parse(rawBody),
    attributes
  };
}
