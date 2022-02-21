import { Sairin } from '@sairin/core'

// theme
import BlogTheme from '@sairin/sairin-theme-minimal'
import '@sairin/sairin-theme-minimal/style.css'

export const sairin = new Sairin({
  theme: BlogTheme
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp