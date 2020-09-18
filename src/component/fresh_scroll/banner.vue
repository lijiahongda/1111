<template>
  <div>
    <van-swipe class="fresh-swipe wid"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(item,index) in swiper"
                      @click="goAcitivy(item)"
                      :key="index"><img v-lazy="item.url"></van-swipe-item>
    </van-swipe>

  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload } from 'vant';


Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  name: 'banner',
  components: {
  },
  props: ['swiper'],
  mounted () {
    // console.log(swiper)
  },
  methods: {
    goAcitivy (data) {
      this.$router.push({ path: '/activity', query: {id:data.actId} })
    }
  }
}
</script>

<style lang="less" scoped>
.wid {
  // width: 351px;
  width: 100%;
  margin: 8.5px auto 7.5px;
  border-radius: 9px;
  background: #fff;
}
.fresh-swipe {
  .van-swipe-item {
    color: #fff;
    text-align: center;
    // background-color: #39a9ed;
    img {
      width: 100%;
    }
  }
}
</style>