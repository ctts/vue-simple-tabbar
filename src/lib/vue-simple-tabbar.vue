<template>
  <div
    class="contaienr"
    :style="`height:${ct_height};background:${ct_background};font-size:${fontSize}`"
  >
    <div
      class="tab-item"
      v-for="(tab,index) of t_tabs"
      :key="'tab'+index"
      @click="changeState(tab.name);linkTo(tab.routerLink)"
    >
      <transition
        :name="zoom"
        mode="out-in"
      >
        <div
          v-if="tab.active"
          key="active"
        >
          <slot :name="tab.name"></slot>
        </div>
        <div
          v-else
          key="inactive"
        >
          <slot :name="'_'+ tab.name"></slot>
        </div>
      </transition>
      <div class="tab-text">{{tab.text}}</div>
      <div
        class="ripple-wapper"
        v-if="showRipple"
      >
        <vue-long-ripple></vue-long-ripple>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabbar',
  props: {
    tabs: Array,
    // 高度
    ct_height: {
      type: String,
      default: '49px'
    },
    // 背景色
    ct_background: {
      type: String,
      default: '#f4f4f4'
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '12px'
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    // 默认开启
    defaultActive: {
      type: String
    },
    // 显示ripple动画
    showRipple: {
      type: Boolean,
      default: true
    },
    // 显示缩放动画
    showZoom: {
      type: Boolean,
      default: true
    },
    // 是否适配移动端可能存在的fixed问题
    autoHide: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 用于移动端适配fixed
    let realScreenHeight = document.documentElement.clientHeight
    let screenHeight = document.documentElement.clientHeight
    return {
      t_tabs: JSON.parse(JSON.stringify(this.tabs)),
      zoom: 'zoom',
      realScreenHeight,
      screenHeight,
      tabbarFlag: false
    }
  },
  mounted () {
    // 设置默认active
    this.t_tabs.forEach(tab => {
      if (tab.active) {
        this.changeState(tab.name)
      }
    })
    if (!this.showZoom) {
      this.zoom = ''
    }
    if(this.autoHide){
        this.autoHideBar()
    }
  },
  methods: {
    // 状态改变事件
    changeState (tabName) {
      this.t_tabs.forEach((tab, index) => {
        tab.active = tab.name === tabName
        this.$set(this.t_tabs, index, tab)
      })
    },
    // 路由跳转
    linkTo (link) {
      if (link || link === '') {
        link = link.search(/^\//) !== 0 ? '/' + link : link
        if (this.$route.path === link) {
          // 可以在此处添加回调
          return
        } else {
          this.$router.push(link)
        }
      } else {
        this.$router.replace('/')
      }
    },
    autoHideBar () {
      const that = this
      window.onresize = () => {
        return (() => {
          that.screenHeight = document.documentElement.clientHeight
        })()
      }
    }
  },
  watch: {
    // 获取设备高度
    screenHeight (val) {
      this.screenHeight = val
      this.tabbarFlag = this.screenHeight >= this.realScreenHeight
    }
  }
}
</script>

<style scoped>
.contaienr {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab-item {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  flex: 1;
}

.tab-text {
  margin-top: 2px;
}

.ripple-wapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.zoom-enter-active {
  animation: zoom-in 0.4s;
}

/* .zoom-leave-active {
  animation: zoom-out 0.2s;
} */

@keyframes zoom-in {
  0% {
    transform: scale(0);
  }

  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoom-out {
  100% {
    opacity: 0;
  }
}
</style>
