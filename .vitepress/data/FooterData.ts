import type { FooterData } from '@theojs/lumen'

export const Footer_Data: FooterData = {
  beian: { icp: { number: '皖ICP备2020015992号-2', link: 'https://beian.miit.gov.cn/' }, showIcon: false },
  author: { name: '发艺视界', link: '/', text: '保留所有权利' },
  group: [
    {
      title: '发艺视界',
      links: [
        { name: '小程序功能', link: '/#features' },
        { name: '版本与价格', link: '/#pricing' }
      ]
    },
    {
      title: '体验与咨询',
      links: [
        { name: '联系管理员申请体验', link: '/#experience' },
        { name: '电话 18507040452', link: 'tel:18507040452' },
        { name: '微信 mi_cy0527', link: '/#experience' }
      ]
    }
  ]
}
