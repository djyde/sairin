
export type GetPostQueryVar = {
  owner: string,
  repo: string
}
export type GetPostQueryProps = {
  repository: {
    issues: {
      nodes: {
        id: string,
        title: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        body: string,
        author: {
          login: string,
          url: string,
          avatarUrl
        }
      }[]
    }
  }
}
export const GetPostsQuery = (variables: GetPostQueryVar) => ({
  query: `
      query GetPosts($owner: String!, $repo: String!) { 
  repository(owner: $owner, name: $repo) {
    issues(first: 100, orderBy: {
      field: CREATED_AT, direction: DESC
    }, labels: ["published"]) {
      nodes {
        id,
        url,
        title,
        updatedAt,
        createdAt,
        body,
        author {
          login,
          url,
          avatarUrl
        }
      }
    }
  }
}
    `,
    variables
});