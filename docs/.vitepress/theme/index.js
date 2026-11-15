import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomeShowcase from './HomeShowcase.vue'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeShowcase', HomeShowcase)
  }
}
