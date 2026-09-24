<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import ProductPreview from './ProductPreview.vue'
import { contact, faqs, features, merchantUrl, upgrades } from '../product'

const { frontmatter } = useData()
const hero = computed(() => frontmatter.value.hero)
const menuOpen = ref(false)
const screen = ref('store')
const filter = ref('全部功能')
const visibleFeatures = computed(() =>
  filter.value === '全部功能' ? features : features.filter((item) => item.group === filter.value)
)
const previewTabs = [
  {
    key: 'store',
    title: '门店首页',
    sub: '把第一印象，变成到店期待。',
    text: '轮播展示品牌，作品表达风格，设计师建立信任。把顾客想了解的内容，放在同一个熟悉的入口。'
  },
  {
    key: 'booking',
    title: '在线预约',
    sub: '顾客自己选，门店有序接。',
    text: '从设计师到服务项目，再到可约时段，顾客按自己的节奏完成选择，门店统一管理预约安排。'
  },
  {
    key: 'orders',
    title: '订单记录',
    sub: '服务走到哪一步，一眼就清楚。',
    text: '预约、服务、完成与取消状态集中查看，让顾客的每一次到店，都有清晰的记录。'
  }
]
const activePreview = computed(() => previewTabs.find((item) => item.key === screen.value)!)
const modal = ref<HTMLDialogElement>()
const selectedPlan = ref('')
const feedback = ref('')
let returnFocus: HTMLElement | null = null
let previousOverflow = ''
async function openModal(plan = '') {
  selectedPlan.value = plan
  feedback.value = ''
  returnFocus = document.activeElement as HTMLElement
  await nextTick()
  previousOverflow = document.body.style.overflow
  modal.value?.showModal()
  document.body.style.overflow = 'hidden'
}
function restoreFocus() {
  document.body.style.overflow = previousOverflow
  returnFocus?.focus()
}
async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    feedback.value = '已复制：' + value
  } catch {
    feedback.value = '复制未成功，请选择并手动复制下方文字。'
  }
}
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = previousOverflow
})
</script>

<template>
  <div class="hair-site">
    <a class="skip-link" href="#main">跳转到主要内容</a>
    <header class="header">
      <a class="brand" href="/" aria-label="发艺视界首页"
        ><svg class="brand-symbol" viewBox="0 0 40 44" fill="none" aria-hidden="true">
          <path d="M7 4v36M33 4v36M7 22h26M16 4c26 9-16 27 10 36" stroke="currentColor" stroke-width="2.3" /></svg
        ><span class="wordmark">发艺视界<small>HAIR WORLDS</small></span></a
      >
      <nav class="desktop-nav" aria-label="主导航">
        <a href="#product">产品体验</a><a href="#features">功能一览</a><a href="#pricing">版本价格</a
        ><a href="#faq">常见问题</a>
      </nav>
      <div class="nav-actions">
        <a :href="merchantUrl" class="merchant-link" target="_blank" rel="noopener noreferrer">商家登录 ↗</a
        ><a href="#experience" class="button compact primary">体验小程序 <span>↗</span></a
        ><button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="mobile-nav" @click="menuOpen = !menuOpen">
          {{ menuOpen ? '关闭 −' : '菜单 +' }}
        </button>
      </div>
      <nav v-if="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="移动端导航" @click="menuOpen = false">
        <a href="#product">产品体验 ↗</a><a href="#features">功能一览 ↗</a><a href="#pricing">版本价格 ↗</a
        ><a href="#faq">常见问题 ↗</a><a :href="merchantUrl" target="_blank" rel="noopener noreferrer">商家登录 ↗</a>
      </nav>
    </header>
    <main id="main">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="live-dot"></span> BUILT FOR SALONS. MADE FOR YOU.</p>
          <a v-if="hero.Notice" class="notice" :href="hero.Notice.link"
            ><span class="notice-label">产品方案</span
            ><span
              ><strong>{{ hero.Notice.title }}</strong
              ><small>{{ hero.Notice.desc }}</small></span
            ><span class="notice-arrow" :aria-label="hero.Notice.linkText">↗</span></a
          >
          <p class="hero-name">{{ hero.name }} · 美发门店小程序</p>
          <h1 id="hero-title">
            {{ hero.text.split('，')[0] }}，<br /><span>{{ hero.text.split('，')[1] }}</span>
          </h1>
          <p class="hero-description">{{ hero.tagline }}</p>
          <div class="hero-actions">
            <a
              v-for="action in hero.actions"
              :key="action.text"
              :href="action.link"
              :class="[
                'button',
                action.theme === 'brand' ? 'primary' : action.theme === 'text' ? 'text-action' : 'outline'
              ]"
              >{{ action.text }} <span>↗</span></a
            >
          </div>
          <div class="hero-foot">
            <span>微信小程序</span><i></i><span>门店运营端</span><i></i><span>两种年度方案</span>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-label"><span>THE DIGITAL SALON</span><span>顾客体验 × 门店经营</span></div>
          <div class="hero-orbit" aria-hidden="true"></div>
          <div class="vertical-note">GOOD STYLE. BETTER BUSINESS.</div>
          <ProductPreview />
          <div class="float-card float-booking">
            <span class="float-icon">✓</span>
            <div><strong>下一次见面，已安排。</strong><small>预约 · 服务 · 评价</small></div>
          </div>
          <div class="float-card float-price">
            <small>基础款 / 年</small><strong><span>¥</span> 1,200</strong>
            <p>从门店展示，到日常经营。</p>
          </div>
          <div class="visual-disclaimer">基于现有功能制作的界面示意 · 非实机截图</div>
        </div>
      </section>
      <div class="values-strip">
        <span>让作品说话 <i>SHOW YOUR STYLE</i></span
        ><b>✳</b><span>让预约有序 <i>SIMPLIFY BOOKING</i></span
        ><b>✳</b><span>让经营从容 <i>GROW YOUR SALON</i></span>
      </div>

      <section id="product" class="section product-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">01 / THE PRODUCT EXPERIENCE</p>
            <h2>顾客用得顺手，<br />门店管得轻松。</h2>
          </div>
          <p class="section-intro">从“这款发型真好看”，到“下次还找你”。<br />把服务前后的每一步，连接起来。</p>
        </div>
        <div class="product-showcase">
          <div class="product-demo">
            <ProductPreview :screen="screen" /><span class="demo-caption">界面示意 / 内容与日期为演示数据</span>
          </div>
          <div class="product-story">
            <div class="preview-tabs" aria-label="切换产品展示">
              <button
                v-for="tab in previewTabs"
                :key="tab.key"
                :aria-pressed="screen === tab.key"
                :class="{ active: screen === tab.key }"
                @click="screen = tab.key"
              >
                {{ tab.title }}
              </button>
            </div>
            <div aria-live="polite">
              <p class="eyebrow">MINI PROGRAM × EVERYDAY BUSINESS</p>
              <h3>{{ activePreview.sub }}</h3>
              <p>{{ activePreview.text }}</p>
            </div>
            <ul class="story-points">
              <li>顾客端：看作品、选设计师、约时间</li>
              <li>门店端：管服务、排预约、跟订单</li>
              <li>同一套产品，连接两端的日常</li>
            </ul>
            <a class="underlined-link" href="#features">看看具体能做什么 <span>↗</span></a>
          </div>
        </div>
      </section>

      <section id="features" class="section feature-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">02 / EVERYTHING YOU NEED</p>
            <h2>不止一个展示页，<br />是门店的日常工作台。</h2>
          </div>
          <p class="section-intro">基础款已覆盖以下核心功能。<br />开发版全部包含，并增加支付、消息与定制支持。</p>
        </div>
        <div class="filter-row">
          <div class="filters" aria-label="功能分类">
            <button
              v-for="item in ['全部功能', '顾客体验', '预约经营']"
              :key="item"
              :aria-pressed="filter === item"
              :class="{ active: filter === item }"
              @click="filter = item"
            >
              {{ item }}
            </button>
          </div>
          <span class="collection-label">10 CORE CAPABILITIES</span>
        </div>
        <div class="feature-grid" aria-live="polite">
          <article
            v-for="item in visibleFeatures"
            :key="item.id"
            :class="['feature-card', { 'feature-wide': item.id === '10' }]"
          >
            <div class="feature-top">
              <span class="feature-icon" aria-hidden="true">{{ item.icon }}</span
              ><small>{{ item.id }} / {{ item.group }}</small>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="feature-brief">{{ item.brief }}</p>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section id="pricing" class="section pricing-section">
        <div class="section-heading centered">
          <p class="eyebrow">03 / A PLAN FOR YOUR NEXT CHAPTER</p>
          <h2>从现在需要的，<br class="mobile-break" />选到未来想做的。</h2>
          <p>清晰的年度方案，为不同阶段的门店准备。</p>
        </div>
        <div class="pricing-grid">
          <article class="plan-card">
            <div class="plan-heading">
              <span class="eyebrow">THE ESSENTIALS</span><span class="plan-badge">日常经营之选</span>
            </div>
            <h3>基础款</h3>
            <p class="plan-description">
              把好作品展示出去，把日常预约管理起来。<br />适合希望建立线上门店入口的美发门店。
            </p>
            <div class="price"><span>¥</span><strong>1,200</strong><small>/ 年</small></div>
            <p class="price-sub">先把顾客体验与门店管理做好。</p>
            <button class="button outline" @click="openModal('基础款 · ¥1,200/年')">
              了解基础款开通 <span>↗</span>
            </button>
            <h4>完整基础功能</h4>
            <ul class="plan-list">
              <li v-for="item in features" :key="item.id"><span>✓</span>{{ item.title }}</li>
            </ul>
            <div class="plan-exclusion">不含微信支付、服务号业务消息及定制开发支持。</div>
          </article>
          <article class="plan-card developer">
            <div class="plan-heading">
              <span class="eyebrow">ROOM TO GROW</span><span class="plan-badge">更多经营可能</span>
            </div>
            <h3>开发版 <span>✳</span></h3>
            <p class="plan-description">从预约到支付，从通知到个性化需求。<br />适合需要业务衔接与扩展能力的门店。</p>
            <div class="price"><span>¥</span><strong>2,500</strong><small>/ 年</small></div>
            <p class="price-sub">包含基础款全部功能，进一步连接经营流程。</p>
            <button class="button primary" @click="openModal('开发版 · ¥2,500/年')">
              了解开发版开通 <span>↗</span>
            </button>
            <h4>基础款全功能，全部包含</h4>
            <p class="included-summary">
              门店展示 / 作品收藏 / 设计师主页 / 服务项目 / 预约排班 / 取号排队 / 订单记录 / 顾客评价 / 个人中心 /
              运营管理
            </p>
            <div class="plan-upgrade" v-for="item in upgrades" :key="item.number">
              <span>↗</span>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.text }}</p>
              </div>
            </div>
            <div class="plan-exclusion">定制范围、周期与费用需评估确认；支付与消息需完成门店相关配置。</div>
          </article>
        </div>
        <p class="pricing-note">以上为产品年费。第三方认证、支付通道及定制开发等费用，在开通前确认具体范围。</p>
        <details class="comparison">
          <summary>展开查看完整功能对比 <span>＋</span></summary>
          <div class="table-scroll">
            <table>
              <caption class="sr-only">
                基础款与开发版功能对比
              </caption>
              <thead>
                <tr>
                  <th scope="col">功能项目</th>
                  <th scope="col">基础款 · ¥1,200/年</th>
                  <th scope="col">开发版 · ¥2,500/年</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in features" :key="item.id">
                  <th scope="row">{{ item.title }}</th>
                  <td>✓ 包含</td>
                  <td>✓ 包含</td>
                </tr>
                <tr>
                  <th scope="row">小程序微信支付</th>
                  <td>不包含</td>
                  <td>✓ 支持接入</td>
                </tr>
                <tr>
                  <th scope="row">服务号业务消息</th>
                  <td>不包含</td>
                  <td>✓ 支持接入</td>
                </tr>
                <tr>
                  <th scope="row">定制化开发</th>
                  <td>不包含</td>
                  <td>✓ 支持，范围与费用另议</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </section>

      <section class="upgrade-section">
        <div class="upgrade-intro">
          <p class="eyebrow">MORE POSSIBILITIES / 开发版专属</p>
          <h2>让每个经营环节，<br />更进一步。</h2>
          <p>在基础体验之上，<br />连接付款、消息与门店自己的想法。</p>
        </div>
        <div class="upgrade-items">
          <article v-for="item in upgrades" :key="item.number">
            <span>{{ item.number }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <div class="tags">
                <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="experience" class="section experience-section">
        <div>
          <p class="eyebrow">04 / TAKE A CLOSER LOOK</p>
          <h2>先体验，再决定。</h2>
          <p>看看顾客如何发现作品、选择设计师、预约服务。<br />再为自己的门店，选择合适的版本。</p>
          <button class="button primary" @click="openModal()">查看小程序体验指引 <span>↗</span></button
          ><a class="underlined-link" :href="merchantUrl" target="_blank" rel="noopener noreferrer"
            >已有账号？进入商家运营端 ↗</a
          >
        </div>
        <div class="experience-card">
          <div class="experience-icon">✳</div>
          <small>当前体验门店小程序</small>
          <h3>甲艺空间</h3>
          <p>打开微信 → 搜索小程序名称 → 进入体验</p>
          <button class="text-button" @click="copyText('甲艺空间')">复制小程序名称 <span>↗</span></button>
          <p class="copy-status" role="status">{{ feedback }}</p>
        </div>
      </section>

      <section id="faq" class="section faq-section">
        <div>
          <p class="eyebrow">A FEW THINGS TO KNOW</p>
          <h2>你可能还想知道。</h2>
          <p>把选择之前的疑问，先说清楚。</p>
        </div>
        <div class="faq-list">
          <details v-for="(item, index) in faqs" :key="item.q">
            <summary>
              <span
                ><i>0{{ index + 1 }}</i
                >{{ item.q }}</span
              ><b>＋</b>
            </summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </section>
      <section class="closing">
        <p class="eyebrow">GOOD STYLE DESERVES TO BE SEEN.</p>
        <h2>让门店的下一步，<span>从这里开始。</span></h2>
        <a class="button primary" href="#pricing">找到适合我的版本 <span>↗</span></a>
      </section>
    </main>
    <footer class="footer">
      <a class="wordmark" href="/">发艺视界<small>HAIR WORLDS</small></a>
      <p>连接好手艺，与好生意。</p>
      <div>
        <a href="#product">产品体验</a><a href="#pricing">版本价格</a
        ><a :href="merchantUrl" target="_blank" rel="noopener noreferrer">商家登录 ↗</a>
      </div>
      <small class="footer-legal">
        <span>© {{ new Date().getFullYear() }} 发艺视界</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">皖ICP备2020015992号-2</a>
      </small>
    </footer>
    <dialog
      ref="modal"
      class="site-dialog"
      aria-labelledby="dialog-title"
      @close="restoreFocus"
      @click="
        (event) => {
          if (event.target === modal) modal?.close()
        }
      "
    >
      <button class="dialog-close" aria-label="关闭弹窗" @click="modal?.close()">×</button>
      <div class="dialog-content">
        <span class="booking-symbol">✳</span>
        <p class="eyebrow">{{ selectedPlan ? 'YOUR NEXT CHAPTER' : 'LET’S MEET IN WECHAT' }}</p>
        <h2 id="dialog-title">{{ selectedPlan ? '为门店，选好下一步。' : '在微信里，体验一次。' }}</h2>
        <div v-if="selectedPlan" class="selected-plan">{{ selectedPlan }}</div>
        <template v-if="selectedPlan && (contact.wechat || contact.phone || contact.url)"
          ><p>联系产品顾问，确认版本、配置与开通安排。</p>
          <button v-if="contact.wechat" class="button primary" @click="copyText(contact.wechat)">
            复制咨询微信：{{ contact.wechat }}</button
          ><a v-if="contact.phone" class="button outline" :href="`tel:${contact.phone}`">{{ contact.phone }}</a
          ><a v-if="contact.url" class="button primary" :href="contact.url" target="_blank" rel="noopener noreferrer"
            >咨询开通 ↗</a
          ></template
        ><template v-else
          ><p v-if="selectedPlan">此页面暂未开放在线购买。你可以先体验小程序，了解作品、设计师与预约流程。</p>
          <p v-else>打开微信，搜索下方小程序名称，进入当前体验门店。</p>
          <div class="miniapp-name">
            <small>当前体验门店小程序</small><strong>甲艺空间</strong><span>微信 → 搜索 → 小程序</span>
          </div>
          <button class="button primary" @click="copyText('甲艺空间')">复制小程序名称 <span>↗</span></button></template
        >
        <p class="copy-status" role="status">{{ feedback }}</p>
        <small>体验店的展示与功能以当前配置为准。</small>
      </div>
    </dialog>
  </div>
</template>
