<template>
  <!--食品生鲜-->
  <div>
    <div class="headdiv">

      <Head></Head>
    </div>
    <fresh-nav :hover="freshNav"></fresh-nav>
    <!--banner-->
    <fresh-banner :swiper="Banner"></fresh-banner>
    <!--grid list-->
    <fresh-grid :categoryGrip="category"
                :hover="freshNav"></fresh-grid>
    <!--常买清单-->
    <!-- <fresh-buy></fresh-buy> -->
    <!--滑动商品-->
    <fresh-scroll :activityList='activity'></fresh-scroll>
    <!--推荐商品-->
    <fresh-list :list="commendList"></fresh-list>
    <!--底部tab-->
    <Nav></Nav>
  </div>
</template>
<script>
import FreshScroll from '@/component/fresh_scroll'
import FreshList from '@/component/fresh_scroll/List'
import FreshBanner from '@/component/fresh_scroll/banner'
import FreshGrid from '@/component/fresh_scroll/grid'
import FreshBuy from '@/component/fresh_scroll/buy'
import FreshNav from '@/component/fresh_scroll/nav'
import Head from '@/component/head/head'
import Nav from '@/component/Nav';
import Vue from 'vue';
import { getNav, getrecommendList } from '../../services/fresh'

export default {
  name: 'fresh',
  components: {
    FreshNav,
    FreshBanner,
    FreshGrid,
    FreshBuy,
    FreshScroll,
    FreshList,
    Nav,
    Head
  },
  data () {
    return {
      uid: '',
      Banner: '',
      category: '',
      activity: '',
      page: 1,
      pageSize: 10,
      commendList: '',
      class: '',
      freshNav: 'fresh'
    }
  },
  mounted () {
    this.uid = window.localStorage.getItem('uid') || ''
    this.getNav()
    this.getrecommendList()
  },
  methods: {
    getNav () {
      let opt = {
        categoryId: '8792,8805',
        channelId: 3,
        uid: this.uid
      }
      getNav(opt).then(res => {
        let _this = this
        _this.Banner = res.data.banner
        _this.category = res.data.category
        _this.activity = res.data.activity
        // console.log(_this.activity)
      })
    },
    getrecommendList () {
      let _this = this
      let opt = {
        categoryId: '8792,8805',
        page: _this.page,
        pageSize: _this.pageSize
      }
      getrecommendList(opt).then(res => {
        console.log(res)
        this.commendList = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
body {
  background: #f5f7fa;
  padding-bottom: 100px;
}
.headdiv {
  padding: 0 12px;
}
</style>