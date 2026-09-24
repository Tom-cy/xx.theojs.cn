import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { Footer, Notice, Underline } from '@theojs/lumen'
import '@theojs/lumen/style'
import HairHome from './components/HairHome.vue'
import './style.css'
import { Footer_Data } from '../data/FooterData'

// 沿用原站 DefaultTheme + Lumen，不重绘 Hero、Notice 或原生按钮。
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info-before': () => h(Notice),
      'layout-bottom': () => h(Footer, { Footer_Data })
    })
  },
  enhanceApp({ app }) {
    app.component('Home', Underline)
    app.component('HairHome', HairHome)
  }
} satisfies Theme
