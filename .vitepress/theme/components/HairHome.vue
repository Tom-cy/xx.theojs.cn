<script setup lang="ts">
import { VPButton } from 'vitepress/theme'
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import ProductPreview from './ProductPreview.vue'
import { contact, faqs, features, merchantUrl, upgrades } from '../product'
import { screenshots } from '../screenshots'

const screen = ref('store')
const filter = ref('全部功能')
const visibleFeatures = computed(() =>
  filter.value === '全部功能' ? features : features.filter((item) => item.group === filter.value)
)
const previewTabs = screenshots
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
  <div class="hair-content">
    <section id="product" class="section product-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 / THE PRODUCT EXPERIENCE</p>
          <h2>顾客用得顺手，<br />门店管得轻松。</h2>
        </div>
        <p class="section-intro">
          从<span class="promo-text">“这款发型真好看”</span>，到<span class="promo-text">“下次还找你”</span
          >。<br />把服务前后的每一步，连接起来。
        </p>
      </div>
      <div class="product-showcase">
        <div class="preview-tabs" aria-label="切换小程序真实截图">
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
        <div class="product-demo">
          <ProductPreview :screen="screen" />
          <span class="demo-caption"
            >{{ previewTabs.findIndex((item) => item.key === screen) + 1 }} / 7 · {{ activePreview.title }} ·
            点击截图查看大图</span
          >
        </div>
        <div class="product-story">
          <div class="story-notice" aria-live="polite">
            <p class="eyebrow">MINI PROGRAM × EVERYDAY BUSINESS</p>
            <h3>
              <span class="promo-title" :data-tone="previewTabs.findIndex((item) => item.key === screen) % 6">{{
                activePreview.sub
              }}</span>
            </h3>
            <p>{{ activePreview.text }}</p>
          </div>
          <p class="screenshot-note">截图来自当前体验门店；其中的价格、时段与服务号入口以门店及版本配置为准。</p>
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
        <p class="section-intro">
          <span class="promo-text">基础款</span>已覆盖以下核心功能。<br /><span class="promo-text">开发版全部包含</span
          >，并增加消息与定制支持。
        </p>
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
          <h3>
            <span class="promo-title" :data-tone="Number(item.id) % 6">{{ item.title }}</span>
          </h3>
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
          <h3><span class="promo-title" data-tone="2">基础款</span></h3>
          <p class="plan-description">
            把好作品展示出去，把日常预约管理起来。<br />适合希望建立线上门店入口的美发门店。
          </p>
          <div class="price"><span>¥</span><strong>1,200</strong><small>/ 年</small></div>
          <p class="price-sub">先把顾客体验与门店管理做好。</p>
          <VPButton class="plan-action" theme="alt" text="咨询基础款" @click="openModal('基础款 · ¥1,200/年')" />
          <h4>完整基础功能</h4>
          <ul class="plan-list">
            <li v-for="item in features" :key="item.id"><span>✓</span>{{ item.title }}</li>
          </ul>
          <div class="plan-exclusion">不含服务号业务消息及定制开发支持。</div>
        </article>
        <article class="plan-card developer">
          <div class="plan-heading">
            <span class="eyebrow">ROOM TO GROW</span><span class="plan-badge">更多经营可能</span>
          </div>
          <h3><span class="promo-title" data-tone="4">开发版</span> <span aria-hidden="true">✳</span></h3>
          <p class="plan-description">从预约通知到个性化需求。<br />适合需要业务衔接与扩展能力的门店。</p>
          <div class="price"><span>¥</span><strong>2,500</strong><small>/ 年</small></div>
          <p class="price-sub">包含基础款全部功能，进一步连接经营流程。</p>
          <VPButton class="plan-action" theme="brand" text="咨询开发版" @click="openModal('开发版 · ¥2,500/年')" />
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
          <div class="plan-exclusion">定制范围、周期与费用需评估确认；消息需完成门店相关配置。</div>
        </article>
      </div>
      <p class="pricing-note">以上为产品年费。第三方认证及定制开发等费用，在开通前确认具体范围。</p>
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
                <td data-plan="基础款">✓ 包含</td>
                <td data-plan="开发版">✓ 包含</td>
              </tr>
              <tr>
                <th scope="row">服务号业务消息</th>
                <td data-plan="基础款">不包含</td>
                <td data-plan="开发版">✓ 支持接入</td>
              </tr>
              <tr>
                <th scope="row">定制化开发</th>
                <td data-plan="基础款">不包含</td>
                <td data-plan="开发版">✓ 支持，范围与费用另议</td>
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
        <p>在基础体验之上，<br />连接业务消息与门店自己的想法。</p>
      </div>
      <div class="upgrade-items">
        <article v-for="item in upgrades" :key="item.number">
          <span>{{ item.number }}</span>
          <div>
            <h3>
              <span class="promo-title" :data-tone="(Number(item.number) + 2) % 6">{{ item.title }}</span>
            </h3>
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
        <p class="eyebrow">体验版 · 申请开放中</p>
        <h2>先体验，再决定。</h2>
        <p>
          小程序尚未正式发布，当前为<span class="promo-text">体验版本</span>。<br />请<span class="promo-text"
            >联系管理员申请体验</span
          >，了解功能与开通安排。
        </p>
        <VPButton theme="brand" text="联系管理员申请体验" @click="openModal()" />
        <a class="underlined-link" :href="merchantUrl" target="_blank" rel="noopener noreferrer"
          >已有账号？进入商家运营端 ↗</a
        >
      </div>
      <div class="experience-card">
        <span class="plan-badge">联系管理员</span>
        <h3><span class="promo-title" data-tone="3">一起看看，是否适合你的门店。</span></h3>
        <p>
          微信 <strong>{{ contact.wechat }}</strong>
        </p>
        <p>
          电话 <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
        </p>
        <div class="contact-actions">
          <VPButton theme="brand" text="复制管理员微信" @click="copyText(contact.wechat)" /><VPButton
            theme="alt"
            :href="`tel:${contact.phone}`"
            text="拨打电话"
          />
        </div>
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
      <VPButton theme="brand" href="#pricing" text="查看版本与价格" />
    </section>
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
        <p class="eyebrow">发艺视界 · 体验版申请</p>
        <h2 id="dialog-title">联系管理员，申请体验。</h2>
        <div v-if="selectedPlan" class="selected-plan">{{ selectedPlan }}</div>
        <p>小程序尚未正式发布。请联系管理员开通体验资格，并确认版本、功能与服务安排。</p>
        <div class="contact-details">
          <p>
            微信：<strong>{{ contact.wechat }}</strong>
          </p>
          <p>
            电话：<a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
          </p>
        </div>
        <div class="contact-actions">
          <VPButton theme="brand" text="复制管理员微信" @click="copyText(contact.wechat)" /><VPButton
            theme="alt"
            text="拨打管理员电话"
            :href="`tel:${contact.phone}`"
          />
        </div>
        <p class="copy-status" role="status">{{ feedback }}</p>
        <small>联系后由管理员确认体验资格；本页不直接开通或购买。</small>
      </div>
    </dialog>
  </div>
</template>
