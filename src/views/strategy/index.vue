<template>
  <div class="strategy_content">
    <van-nav-bar title="攻略" />
    <van-tabs v-model="active" :border="false">
      <van-tab title="新人上手"></van-tab>
      <van-tab title="进阶学习"></van-tab>
      <van-tab title="邀请海报"></van-tab>
    </van-tabs>
    <div class="strategy_a" v-if="active===0">
      <div class="strategy_a_list">6666666666</div>
      <div class="footer">
        <div class="subBotton">申请店长</div>
        <div class="groupZ">我的群助手></div>
      </div>
    </div>
    <div class="strategy_b" v-if="active===1">44444</div>
    <div class="strategy_c" v-if="active===2">55555</div>
    <Nav />
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, NavBar } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
import Nav from "@/component/Nav";
export default {
  components: {
    Tab,
    NavBar,
    Nav,
    NavBar
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
.strategy_content {
  width: 100%;
  height: auto;
  overflow: auto;
  .strategy_a {
    width: 100%;
    height: 300px;
    padding-top: 10px;
    position: relative;
    border-top: 10px solid #f6f6f6;
    .footer {
      width: 100%;
      height: 100px;
      position: fixed;
      bottom: 1.3rem;
      left: 0;
      background: #fff;
      z-index: 2;
      .subBotton {
        margin: 0 auto;
        width: 90%;
        height: 50px;
        background: rgba(187, 187, 187, 1);
        box-shadow: 0px 5px 15px 0px rgba(210, 210, 210, 0.3);
        border-radius: 16px;
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
      }
      .groupZ {
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(20, 20, 20, 1);
        line-height: 60px;
      }
    }
  }
  .strategy_b {
  }
  .strategy_c {
  }
}
//强改
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
</style>