# Sairin

A blog engine based on GitHub issue and Vercel.

## On Clieck Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fsairin-starter&env=GITHUB_TOKEN&envDescription=Provide%20an%20access%20token%20to%20increase%20revalidate%20frequency&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens)

## FAQ

### Need I redeploy the Vercel project after the issue updated?

No.

### How long will take to update the latest content after the issue content update?

If you didn't provide a `GITHUB_TOKEN` environment variable, the update frequency is every 3 miniutes. Since the GitHub API rate limit for unauthencated request is 60 per hour.

If `GITHUB_TOKEN` is provided, the update frequency is every 10 seconds.

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

## Theme Development

WIP...

# Build

## Development

```bash
$ pnpm i

# run all the dev command
$ pnpm run dev --filter "*" --parallel
```
