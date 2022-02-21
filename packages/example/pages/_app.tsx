import { Sairin } from '@sairin/core'

// theme
import BlogTheme from '@sairin/sairin-theme-minimal'
import '@sairin/sairin-theme-minimal/style.css'
import themeConfig from '../theme.config'

export const sairin = new Sairin({
  theme: BlogTheme,
  themeConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp