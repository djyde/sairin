export default function Head (props: {
  sairinConfig: any
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

      {props.sairinConfig.themeConfig.umami && <script async defer data-website-id={props.sairinConfig.themeConfig.umami.id} src={props.sairinConfig.themeConfig.umami.src}></script> }
      
    </>
  )
}