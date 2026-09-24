// 原始图片由项目所有者提供，原样复制到 public，不裁剪、不重绘。
export const screenshots = [
  {
    key: 'store',
    title: '门店首页',
    width: 614,
    height: 1334,
    sub: '第一眼，就看见门店的风格。',
    text: '轮播、门店信息、预约入口和推荐设计师集中展示。顾客在微信里，就能开始了解你的门店。'
  },
  {
    key: 'services',
    title: '服务选择',
    width: 620,
    height: 1340,
    sub: '选好设计师，再选心仪的服务。',
    text: '切换设计师、浏览服务分类、了解项目耗时，把服务选择提前完成，让到店沟通更从容。'
  },
  {
    key: 'booking',
    title: '预约时间',
    width: 624,
    height: 1352,
    sub: '哪天有空，一眼就知道。',
    text: '按设计师与日期查看时段，区分可预约、已预约和休息安排，再选择适合自己的时间。'
  },
  {
    key: 'confirm',
    title: '确认预约',
    width: 620,
    height: 1346,
    sub: '重要的信息，确认得清清楚楚。',
    text: '核对预约时间、服务项目、设计师与门店位置，填写特殊需求后确认预约。'
  },
  {
    key: 'success',
    title: '预约成功',
    width: 616,
    height: 1344,
    sub: '下一次见面，已经安排好。',
    text: '预约成功后查看取号码、到店时间、位置与服务内容，也可在详情中取消订单。'
  },
  {
    key: 'orders',
    title: '我的订单',
    width: 622,
    height: 1350,
    sub: '每次服务，都有迹可循。',
    text: '待实施、待评价、已评价分类展示，预约时间、取号码与项目内容清晰可查。'
  },
  {
    key: 'profile',
    title: '个人中心',
    width: 626,
    height: 1370,
    sub: '熟悉的服务，下一次更好找。',
    text: '个人资料、我的评价、专属设计师和联系管理员集中管理，顾客再次到店更加方便。'
  }
]
export const screenshotPath = (key: string) => `/images/miniapp/${key}.png`
