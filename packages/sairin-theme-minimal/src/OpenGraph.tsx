import { PostPageThemeProps } from "@sairinjs/core"

export function OpenGraph(props: {
  post: PostPageThemeProps['post']
}) {

  if (!props.post) {
    return null
  }

  const ogImage = `
        https://og-image.vercel.app/${props.post.title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg
      `
  return (
    <>
      <meta property="og:type" content="artical" />
      {/* <meta property="og:description" content={props.post.body.substring(0, 140)} /> */}
      <meta property="og:title" content={props.post.title} />
      <meta property="og:image" content={ogImage} />

      <meta property="article:published_time" content={props.post.createdAt} />
      <meta property="article:author" content={props.post.author.login} />


      <meta name="twitter:card" content={props.post.title} />
      <meta name="twitter:title" content={props.post.title} />
      <meta name="twitter:image" content={ogImage} />

    </>
  )
}