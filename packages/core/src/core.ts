import axios from "axios";
import { marked } from 'marked'
import fm from 'front-matter'

const TOKEN = process.env.GITHUB_TOKEN;
const REPO =
  process.env.REPO ||
  `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`;

const authHeaders = TOKEN ? {
  Authorization: `bearer ${TOKEN}`,
} : {
  
} as any

export async function getPostList() {

  const res = await axios.get(
    `https://api.github.com/repos/${REPO}/issues?state=all&per_page=100`,
    {
      params: {
        state: 'all',
        per_page: 100,
        labels: [
          'published'
        ].join(',')
      },
      headers: {
        ...authHeaders
      },
    }
  );

  const posts = res.data.map(post => {
    const { html, attributes } = processBody(post.body)
    return {
      // ...post,
      id: post.id,
      title: post.title,
      createdAt: post.created_at,
      html,
      attributes
    }
  })

  return posts
}

function processBody(body: string) {
  const { body: rawBody, attributes } = fm(body)
  return {
    html: marked.parse(rawBody),
    attributes
  };
}
