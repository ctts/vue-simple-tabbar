<template>
  <div id="app">
    <router-view />
    <tab-bar
      v-bind="tabOption"
      @clickCallBack="clickCallBack"
    >
      <template #_discover>
        <img
          src="../assets/grade.png"
          alt=""
        >
      </template>
      <template #discover>
        <img
          src="../assets/grade1.png"
          alt=""
        >
      </template>
      <template #_homePage>
        <img
          src="../assets/more.png"
          alt=""
        >
      </template>
      <template #homePage>
        <img
          src="../assets/more1.png"
          alt=""
        >
      </template>
      <template #_userCenter>
        <img
          src="../assets/pagedown.png"
          alt=""
        >
      </template>
      <template #userCenter>
        <img
          src="../assets/pagedown1.png"
          alt=""
        >
      </template>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from '../lib/vue-simple-tabbar'
export default {
  name: 'App',
  components: {
    TabBar
  },
  data () {
    return {
      tabOption: {
        tabs: [{
          name: 'discover',
          // text: '发现',
          routerLink: '',
        }, {
          name: 'homePage',
          routerLink: '',
          // text: '主页',
          active: true
        }, {
          name: 'userCenter',
          routerLink: '',
          // text: '个人中心'
        }],
        // showZoom: false
      }
    }
  },
  methods: {
    clickCallBack (tabInfo) {
      console.log('click', tabInfo)
    }
  },
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  width: 2em;
  height: 2em;
}

.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
