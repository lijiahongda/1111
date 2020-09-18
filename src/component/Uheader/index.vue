<template>
  <div>
    <van-nav-bar :border="false" title="个人中心" />
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #1f1a19;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
</style>
