# Sairin

A blog engine based on GitHub issue and Vercel.

## On Clieck Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fsairin-starter&env=GITHUB_TOKEN&envDescription=Provide%20an%20access%20token%20to%20increase%20revalidate%20frequency&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens)

## Documentation

[Step by step guide](https://blog.sairinjs.com/blog/introducing-sairin)

### sairin.config.ts

- `siteConfig`
  - `title` (required) Your blog title
  - `author` The author name of your blog. The repo owner login id will be set by default
  - `url` The URL of your blog. Start with `http://` or `https://`. This field is required if you want to enable RSS.
- `theme` (required)
- `themeConfig` A config object passed to the theme
- `allowUsers` string[] An array of GitHub user login id that allowed to publish blog post. By default, only issues created by the repo owner will be published on the blog.

## RSS Support

Sairin support RSS out of the box. You need to set `url` on the `sairin.config.ts` to enable it:

```diff
// sairin.config.ts

export default {
  siteConfig: {
    title: 'Sairin',
    url: 'http://your-site.com'
  },
} as SairinConfig;
```

The RSS feed is on `http://your-site.com/rss.xml`.

## FAQ

### Need I redeploy the Vercel project after the issue updated?

No.

### How long will take to update the latest content after the issue content update?

If you didn't provide a `GITHUB_TOKEN` environment variable, the update frequency is every 3 miniutes. Since the GitHub API rate limit for unauthencated request is 60 per hour.

Set an `GITHUB_TOKEN` environment variable to increase the update frequency to every 10 seconds.

## Theme Development

Sairin supports custom theme. But the API is not stable now. If you still want to try to develope a theme, you could see the source code of the built-in theme [sairin-theme-minimal](https://github.com/djyde/sairin/tree/master/packages/sairin-theme-minimal).

# Build

## Development

```bash
$ pnpm i

# run all the dev command
$ pnpm run dev --filter "*" --parallel
```
