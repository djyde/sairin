
export type GetPostQueryVar = {
  owner: string,
  repo: string
}
export type GetPostQueryProps = {
  repository: {
    issues: {
      nodes: {
        id: string;
        title: string;
        url: string;
        createdAt: string;
        updatedAt: string;
        body: string;
        comments: {
          nodes: {
            url: string,
            createdAt: string,
            author: {
              login: string;
              url: string;
              avatarUrl: string;
            };
            body: string;
          }[];
        };
        reactionGroups: {
          content: string;
          reactors: {
            totalCount: number;
          };
        }[];
        author: {
          login: string;
          url: string;
          avatarUrl;
        };
      }[];
    };
  };
};
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
        comments (first: 100) {
          nodes {
            createdAt,
            url,
            author {
              login,
              url,
              avatarUrl,
            },
            body
          }
        },
        reactionGroups {
          content,
          reactors {
            totalCount,
          }
        },
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
  variables,
});