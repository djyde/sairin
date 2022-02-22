## Deploy

### Basic

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fsairin-starter&env=GITHUB_TOKEN&envDescription=Provide%20an%20access%20token%20to%20increase%20revalidate%20frequency&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens)

### Personal access token

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fsairin-starter&env=GITHUB_TOKEN&envDescription=Provide%20an%20access%20token%20to%20increase%20revalidate%20frequency&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens)

## Theme Layout

### Post

Props

- post
  - title
  - html
  - attributes
  - createdAt
  - html_url
  - user
    - avatar_url
    - name
    - login
    - html_url

### Home

- posts
- user
  - avatarUrl
  - name

# Build

## Development

```bash
$ pnpm i

# run all the dev command
$ pnpm run dev --filter "*" --parallel
```
