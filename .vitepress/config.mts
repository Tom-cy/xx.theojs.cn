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
  // 恢复原主题的浅色 / 深色模式与字体、背景变量。
  appearance: true,
  vue: { template: { compilerOptions: { isCustomElement: (tag) => tag === 'iconify-icon' } } },
  themeConfig: {
    nav: [
      { text: '产品体验', link: '/#product' },
      { text: '功能介绍', link: '/#features' },
      { text: '版本价格', link: '/#pricing' },
      { text: '申请体验', link: '/#experience' },
      { text: '商家登录', link: 'https://hair.iskaola.com/login?sourceId=100000000002&storeCode=DCY809753' }
    ],
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '发艺视界 HAIR WORLDS' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }]
  ]
})
