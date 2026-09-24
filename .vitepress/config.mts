import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '发艺视界',
  titleTemplate: ':title · HAIR WORLDS',
  description: '发艺视界美发门店小程序：作品展示、设计师主页、在线预约与运营管理。基础款1200元/年，开发版2500元/年。',
  lang: 'zh-CN',
  srcDir: 'content',
  // 保留旧资料文件，但不再将它们发布到品牌官网。
  srcExclude: ['医/**', '卜/**', '命/**', '山/**', '灵宠/**', '相/**', '相关经典/**', '提交书籍与纠错.md'],
  cleanUrls: true,
  appearance: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f7f7f2' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '发艺视界 HAIR WORLDS' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }]
  ]
})
