import { Sairin } from '@sairinjs/core'

// theme
import BlogTheme from '@sairinjs/sairin-theme-minimal'
import '@sairinjs/sairin-theme-minimal/style.css'
import themeConfig from '../theme.config'

export const sairin = new Sairin({
  theme: BlogTheme,
  themeConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp