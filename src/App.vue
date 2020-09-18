<template>
  <div id="app">
    <router-view />
    <transition :name="direction"></transition>
    <div class="loading-mask" v-show="$store.state.showLoading">
      <div class="pic-box">
        <img class="pic" src="./assets/images/dragon.gif" />
      </div>
    </div>
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
  </div>
</template>

<script>
import { getWxConfig } from "@/services/goods.js";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    // 动态设置过渡样式
    direction: function () {
      const currentPath = this.$route.path;
      const localRoute = (window.myVue && window.myVue.localRoute) || [];
      // console.log(localRoute, currentPath);
      const index = localRoute.indexOf(currentPath);
      let tranName = "";

      if (localRoute.length === 0) {
        tranName = "fade"; // 首页，渐显
      } else if (index >= 0) {
        tranName = "page-back"; // 回退，右划
      } else {
        tranName = "page-go"; // 进入新页面，左划
      }
      return tranName;
    },
  },
  methods: {},
  // watch: {
  //   $route(to, from) {},
  // },
  created() {
    // let data = {
    //     share_url: encodeURIComponent(window.location.href)
    // }
    // getWxConfig(data).then(res => {
    //     wx.config({
    //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: res.data.app_id, // 必填，企业号的唯一标识，此处填写企业号corpid
    //         timestamp: res.data.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: res.data.noncestr, // 必填，生成签名的随机串
    //         signature: res.data.signature,// 必填，签名，见附录1
    //         jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    // })
  },
  methods: {

  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @colorFont;
  font-size: @fontSizeH3;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .page {
    transition: all 0.8s ease-in-out;
  }
  .page-go-enter-active {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-to {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-active {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-to {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .loading-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 999;
    .pic-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 90px;
      .pic {
        display: block;
        width: 100%;
      }
      .txt {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
