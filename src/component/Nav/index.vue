<template>
  <div class>
    <van-tabbar active-color="#FF001C" inactive-color="#616B80" route>
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? homeicon.active : homeicon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/shopCar">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? carticon.active : carticon.inactive" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item replace to="/video">
        <span>直播</span>
        <template #icon="props">
          <img :src="props.active ? video.active : video.inactive" />
        </template>
      </van-tabbar-item> -->
      <!-- <van-tabbar-item  replace to="/strategy">
                <span>攻略</span>
                <template #icon="props">
                    <img :src="props.active ? strategyicon.active : strategyicon.inactive" />
                </template>
      </van-tabbar-item>-->
      <van-tabbar-item replace to="/user">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? myicon.active : myicon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      homeicon: {
        inactive:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuisjQwJeeMdC1594966843.png",
        active:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhui2t8mU26iFY1594966887.png",
      },
      carticon: {
        inactive:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuiJc9va5fUns1594967304.png",
        active:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuix9xSL7mGdF1594967336.png",
      },
      strategyicon: {
        inactive:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuiFuwDt8NtKq1594967426.png",
        active:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuizqUHhKUKL31594967446.png",
      },
      myicon: {
        inactive:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuioa39OC4wen1594967375.png",
        active:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/14/yuelvhuiI79apB2Dxy1594967401.png",
      },
      video: {
        inactive:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-31/15/yuelvhuifiKjkXO8jn1596180350.png",
        active:
          "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-30/15/yuelvhui2czp1yqfXT1596093855.png",
      },
    };
  },
};
</script>
<style lang="less" scoped>
/*iPhone X 适配*/
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  /deep/ .van-tabbar--fixed {
    padding-bottom: 37px;
  }
}
/*iPhone XS max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  /deep/ .van-tabbar--fixed {
    padding-bottom: 37px;
  }
}
/*iPhone XR max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  /deep/ .van-tabbar--fixed {
    padding-bottom: 37px;
  }
}
</style>