<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
defineProps<{ screen?: string }>()
</script>
<template>
  <div class="phone" aria-label="小程序界面示意，非真实截图">
    <div class="phone-status"><b>9:41</b><span class="phone-island"></span><span>▮▮▮ ▰</span></div>
    <div class="phone-title"><b>发艺视界 · 示例门店</b><span>••• ◉</span></div>
    <template v-if="!screen || screen === 'store'">
      <div class="phone-cover">
        <img :src="frontmatter.hero.image.src" alt="示例门店的发型概念配图" /><span
          >YOUR STYLE,<br />OUR INSPIRATION.<small>每一种风格，都值得被看见。</small></span
        >
      </div>
      <div class="phone-quick">
        <span><i>◷</i>在线预约</span><span><i>▧</i>作品中心</span>
      </div>
      <div class="phone-location"><span>⌖ 门店地址与导航</span><span>◷ 营业时间</span></div>
      <h4>发现你的设计师 <small>更多 ›</small></h4>
      <div class="phone-stylist">
        <div class="stylist-avatar">✳</div>
        <div>
          <b>设计师 · 示例</b>
          <p>剪裁 / 染烫 / 风格设计</p>
          <small>查看作品，了解擅长风格</small>
        </div>
        <span>›</span>
      </div>
      <div class="phone-story"><span>从灵感到预约</span><b>下一次改变，就在这里。 ↗</b></div>
    </template>
    <template v-else-if="screen === 'booking'">
      <div class="phone-booking">
        <span class="preview-label">预约服务</span>
        <h4>选择适合你的时间</h4>
        <p>设计师 · 示例 / 风格剪裁</p>
        <div class="mock-days">
          <span>周一<b>21</b></span
          ><span class="selected">周二<b>22</b></span
          ><span>周三<b>23</b></span
          ><span>周四<b>24</b></span>
        </div>
        <h4>可约时段</h4>
        <div class="mock-slots">
          <span>10:00</span><span class="selected">11:00</span><span>13:00</span><span>14:00</span><span>15:00</span
          ><span>16:00</span>
        </div>
        <div class="booking-summary">
          <b>预约信息</b>
          <p>服务项目 <span>风格剪裁</span></p>
          <p>设计师 <span>设计师 · 示例</span></p>
          <p>预约时间 <span>周二 11:00</span></p>
        </div>
        <div class="mock-submit">确认预约</div>
        <small class="mock-hint">日期与时间仅作界面示意</small>
      </div>
    </template>
    <template v-else>
      <div class="phone-booking">
        <span class="preview-label">我的订单</span>
        <h4>每一次到店，都有记录。</h4>
        <div class="order-tabs"><b>待服务</b><span>已完成</span><span>已取消</span></div>
        <div class="booking-summary">
          <span class="order-state">已预约</span><b>风格剪裁</b>
          <p>设计师 · 示例</p>
          <p>预约时间 <span>周二 11:00</span></p>
          <p>门店 <span>示例门店</span></p>
          <div class="order-detail">查看详情 →</div>
        </div>
        <div class="phone-story"><span>服务有序，体验从容</span><b>预约、服务、评价，一目了然。</b></div>
      </div>
    </template>
    <div class="phone-tabs">
      <span :class="{ on: !screen || screen === 'store' }">⌂<small>首页</small></span
      ><span :class="{ on: screen === 'booking' }">◷<small>预约</small></span
      ><span :class="{ on: screen === 'orders' }">▤<small>订单</small></span
      ><span>♧<small>我的</small></span>
    </div>
    <div class="phone-home"></div>
  </div>
</template>
