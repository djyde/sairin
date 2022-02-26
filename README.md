
<p align="center">
  <img width="640" src="https://user-images.githubusercontent.com/914329/155258608-6f1ecbdd-d1e0-4ee0-813f-4c02d92c13ec.png" alt="showcase">
</p>


# Sairin

Generate a blog from GitHub issue.

## One Click Deploy

<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fsairin-starter&env=GITHUB_TOKEN&envDescription=GitHub%20personal%20access%20token&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

## Get started

1. Clone the [starter template](https://github.com/djyde/sairin-starter)

```bash
$ git clone https://github.com/djyde/sairin-starter.git your_blog

$ cd your_blog && rm .git

# install dependencies

$ npm i
```

2. Run the blog

Before running, you need to set these environment variable by creating a `.env`:

- `REPO`: The GitHub repo name. Like `user/repo`
- `GITHUB_TOKEN`: The [personal access token](https://github.com/settings/tokens)

```bash
# run the blog

$ npm run dev
```

3. Export the blog as a static site

```bash
$ npm run export
```

The static site will be ouput to `/out`

## Documentation

### sairin.config.ts

- `siteConfig`
  - `title` (required) Your blog title
  - `author` The author name of your blog. The repo owner login id will be set by default
  - `url` The URL of your blog. Start with `http://` or `https://`. This field is required if you want to enable RSS.
- `theme` (required)
- `themeConfig` A config object passed to the theme
- `allowUsers` string[] An array of GitHub user login id that allowed to publish blog post. By default, only issues created by the repo owner will be published on the blog.

### Environment Variables

- `GITHUB_TOKEN` (required) [Personal Access Token](https://github.com/settings/tokens) to call GitHub API
- `REPO` The repository which will be fetch blog posts from (e.g `owner/repo`). By default it will use the repo that created by Vercel.

## RSS Support

Sairin support RSS out of the box. You need to set `url` on the `sairin.config.ts` to enable it:

```diff
// sairin.config.ts

export default {
  siteConfig: {
    title: 'Sairin',
+   url: 'http://your-site.com'
  },
} as SairinConfig;
```

The RSS feed is on `http://your-site.com/rss.xml`.

## FAQ

### Need I redeploy the Vercel project after the issue updated?

No.

### How long will take to update the latest content after the issue content update?

Blog will be updated every 1 minute.

## Theme Development

Sairin supports custom theme. But the API is not stable now. If you still want to try to develope a theme, you could see the source code of the built-in theme [sairin-theme-minimal](https://github.com/djyde/sairin/tree/master/packages/sairin-theme-minimal).

# Build

## Development

> Sairin use [pnpm](https://pnpm.io) to organize the packages, you need to install pnpm first.

Install the dependencies:

```bash
$ pnpm i
```

Create a `.env` file on `example/`:

```bash
GITHUB_TOKEN= # need to provide a GitHub access token when developing, or it will reach the API request rate limit.
REPO=djyde/sairin # you can change to any repo for debugging
```

Run dev command:

```bash
$ pnpm run dev --filter "*" --parallel
```

This command will run a blog on localhost.
