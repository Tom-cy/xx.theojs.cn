import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import HairHome from './components/HairHome.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('HairHome', HairHome)
  }
} satisfies Theme
