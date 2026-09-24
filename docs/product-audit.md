# 发艺视界：产品定位、版本文案与功能核验

本次定位：顾客体验展示与门店产品销售兼顾。首页用小程序使用场景表达价值，用年度版本完成商家选型，已有客户通过导航进入运营端。

技术栈沿用 package.json 中的 VitePress 2、Vue 3、Vite，不添加 UI 框架。index.md 保留 hero、hero.Notice、hero.actions，由自定义 Vue 主题读取并渲染。旧算命文档保留在源码，使用 srcExclude 排除发布；原站 SEO、广告、统计和导航不再加载。

## 首页内容策略

- Hero 名称：发艺视界。
- Hero 标题：让好手艺，遇见好生意。
- Hero 介绍：把门店、作品和设计师，装进顾客的微信里。从一次心动到一次预约，让服务更有序，让经营更从容。
- Notice：为美发门店，准备好下一步。基础款 ¥1,200/年 · 开发版 ¥2,500/年，选择适合你的经营方式。
- 首要 action「查看版本与价格」：到 #pricing，帮助门店选型。
- 次要 action「探索小程序功能」：到 #product，用产品体验解释价值。
- 辅助 action「体验小程序」：到 #experience，提供微信搜索指引。
- 商家登录：导航与体验区跳转原运营端，不能充当新客购买按钮。

## 版本定义

价格来自项目所有者明确要求，未添加折扣、试用或不确定的服务承诺。

**基础款 ¥1,200/年**：展示门店与作品，连接设计师、预约取号、服务订单、评价与后台管理。支持既有非微信支付业务路径。

**开发版 ¥2,500/年**：包含基础款全部功能，增加小程序微信支付、微信服务号业务消息与定制开发支持。定制范围、周期和费用在需求评估后确认，暂不承诺无限定制。接入需按门店配置支付与消息相关账号。

“基础款包含所有现有功能”的描述，按用户同时明确的版本差异理解为“全部现有基础业务能力”，支付和服务号消息专属开发版。仅更改官网介绍，没有修改后端版本授权、开关或收费逻辑。

## 已核验功能清单

以下路径均相对 /Users/micy/HairWorlds。源码证明存在实现，不等于已完成每个门店的线上验收。

| 功能                 | 对外介绍范围                                                                                       | 源码依据                                                                                                                                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 门店首页             | 轮播、公告、地址、营业时间、电话、地图导航、推荐设计师                                             | HairUniapp/uniapp-operation/pages/tab/index.vue                                                                                                                                                                                                                                      |
| 作品中心             | 分类浏览、详情、收藏                                                                               | HairUniapp/uniapp-operation/pages/tab/category.vue；pageslike/like/likelist.vue；pageslike/like/hairInfo.vue                                                                                                                                                                         |
| 设计师               | 列表、推荐、分类、个人介绍、作品集、服务情况、评分、图文评价                                       | HairUniapp/uniapp-operation/pages2/designer/list.vue、detail.vue、portfolio.vue                                                                                                                                                                                                      |
| 服务项目             | 设计师切换、服务分类、价格、预计时长、组合选择、预约入口                                           | HairUniapp/uniapp-operation/pages/tab/service.vue；pages2/service/detail.vue                                                                                                                                                                                                         |
| 预约                 | 日期、设计师、可约时段、确认预约与取消                                                             | HairUniapp/uniapp-operation/components/DateTimePicker；pagesorder/reserve/reserve.vue；pagesorder/appointment/appointment.vue；pagesorder/cancelorder/cancelorder.vue                                                                                                                |
| 排班                 | 时间规则、例外时间、可约时间、休息、已占用时段、日期筛选                                           | HairFront/hair-operation/src/api/designer.ts；src/views/home/index.vue；CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/controller/ops/designer/OpsDesignerRuleController.java、OpsDesignerExceptionController.java                                                  |
| 排队                 | 取号、状态查询、手动取号、开始服务、完成、取消、过号与队列调整                                     | CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/controller/mini/Jyapi/JyapiTicketController.java；controller/ops/order/OpsTicketController.java；HairUniapp/uniapp-operation/pages/tab/order.vue                                                                     |
| 订单                 | 预约单/取号单、状态筛选、项目明细、设计师、预估耗时、预约时间、用户留言、取消备注、完成与取消处理  | HairFront/hair-operation/src/views/order/list.vue、appiontment.vue、completed.vue；HairUniapp/uniapp-operation/pagesorder/appointment/appointment.vue                                                                                                                                |
| 评价                 | 提交、评分、图片、标签、我的评价、设计师评价                                                       | HairUniapp/uniapp-operation/pagesorder/comment/comment.vue；pages2/designer/detail.vue；pages2/member/comment.vue；HairFront/hair-operation/src/views/order/comment.vue                                                                                                              |
| 顾客中心             | 微信登录、个人资料、我的评价、专属设计师、设置、联系管理员                                         | HairUniapp/uniapp-operation/pages/tab/my.vue；pageslogin/passport/wechatMPLogin.vue                                                                                                                                                                                                  |
| 门店运营             | 门店资料、位置、营业时间、公告、预约提前时间、轮播新增/编辑/排序/启停、图片资源                    | HairFront/hair-operation/src/views/setting/index.vue、swiper.vue；src/views/resource/image/index.vue                                                                                                                                                                                 |
| 设计师与作品运营     | 设计师与分类管理、作品上传、服务关联、规则与例外管理                                               | HairFront/hair-operation/src/api/designer.ts；src/views/designer/product、portfolio、category                                                                                                                                                                                        |
| 服务与分类运营       | 服务项目/发型商品、分类、新增编辑、删除                                                            | HairFront/hair-operation/src/views/hair/product、category；CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/controller/ops/cloud/OpsCloudProductController.java、OpsCloudCategoryController.java                                                                      |
| 运营首页与统计       | 设计师排班卡片、可约时间条带、预约时段占用、订单首页统计接口                                       | HairFront/hair-operation/src/views/home/index.vue；CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/controller/ops/order/OpsCloudAppointmentController.java                                                                                                           |
| 微信支付（开发版）   | 支付预约、取号支付、收银、支付结果查询、门店支付回调；存在退款服务实现，具体退款业务规则需门店验收 | CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/controller/mini/Jyapi/JyapiReservationController.java、JyapiCashierController.java、JyapiTicketController.java；controller/callback/CallbackPaymentController.java；serviceImpl/ops/order/HairRefundServiceImpl.java |
| 服务号消息（开发版） | 顾客预约成功、设计师新预约与取消通知；按模板和门店配置发送                                         | CloudV3/modules/system/system-biz/src/main/java/cn/cloud/system/serviceImpl/mini/TouUserMessageServiceImpl.java、TouDesignerMessageServiceImpl.java                                                                                                                                  |
| 定制支持（开发版）   | 品牌展示、页面及业务流程需求评估                                                                   | 项目所有者明确要求，属于服务能力而不是声称已经实现的新功能                                                                                                                                                                                                                           |

## 未纳入已交付承诺的内容

- 商城：pages/mall/mall.vue 的 web-view 指向 192.168.6.56 局域网地址；虽有商城、SKU、订单、运费、秒杀后台代码，无法据此保证对外交易链路已可用。
- 会员储值、积分、优惠券、AI 试发、自动营销：未核验完整可用链路，不写入套餐。
- 旧社交模板中的学历、身高、择偶、关于我们等页面：存在遗留内容，不视为本产品卖点。
- src/views/designer/setting/index.vue 当前为空模板，不作为独立设置功能宣传。
- 图片修复、分账等后台能力不属于已确认的美发小程序标准套餐范围。
- 不使用虚构客户数、成交增长、门店口碑、设计师案例或退款承诺。

## 图片与截图

目前浏览器工具的应用列表为空，原生桌面访问禁用，不能打开或截图微信开发者工具。因此没有声称获得开发者工具截图。

首页和产品区使用 ProductPreview.vue 自绘的门店、预约、订单界面示意，均有可见标注；没有真实客户姓名、手机号、评价或交易数据。

品牌配图 content/public/images/hero-editorial.png 使用内置 image_gen 生成。提示词：premium editorial hair fashion photograph, adult East Asian woman, short dark espresso French bob, wispy fringe, black minimalist top, warm beige plaster background, diffused sunlight, natural hair and skin texture, no logo, no text。该图仅作为示意界面的概念配图，不作为实际门店作品。

真实截图建议补充：门店首页、设计师主页/作品、服务选择、预约时间选择、我的订单、商家预约工作台。上传后应使用原图替换示意，不把重绘当作截图。

## 待确认配置

- 公开咨询微信/电话/链接：.vitepress/theme/product.ts 中 contact，当前为空；按钮明确说明尚未开放在线购买，不生成虚假提交成功。
- 定制开发包含范围与计价，第三方费用、交付周期、续费和主体域名：开通前确认。
- 小程序体验名称当前取自 HairUniapp/uniapp-operation/config/config.js：甲艺空间。尚未核验微信搜索可发现性，需实际体验或补充可用小程序码。
- 未新增无 token 接口。静态产品官网不需要读取私人订单或用户资料。
