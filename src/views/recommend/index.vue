<template>
  <div class="main">
    <div class="pages">
      <Head :color="headcolor" :key="new Date().getTime()"></Head>
      <div class="navdiv">
        <div v-for="(item,index) in bannerlist.types"
             :key="index">
          <div v-if="item.redirectType==666">
            <router-link class="link current"
                         :to="{name:'recommend'}">{{item.name}}</router-link>
          </div>
          <div v-else-if="item.redirectType==70">
            <router-link class="link"
                         :to="{name:'fresh'}">{{item.name}}</router-link>
          </div>
          <div v-else-if="item.redirectType==45">
            <router-link class="link"
                         :to="{name:'house'}">{{item.name}}</router-link>
          </div>
          <div v-else-if="item.redirectType==71">
            <router-link class="link"
                         :to="{name:'beauty'}">{{item.name}}</router-link>
          </div>
        </div>
      </div>

      <div class="swipediv">
        <van-swipe :autoplay="3000"
                   my-swipe>
          <van-swipe-item v-for="(item, index) in bannerlist.banner"
                          :key="index">
            <img v-lazy="item.imgUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="shopdiv">
        <ul class="shopul">
          <li v-for="(item , index ) in bannerlist.icon"
              :key="index"
              @click="jump(item)">
            <div class="shipicondiv"><img :src="item.iconUrl"
                   class="shopicon"></div>
            <div class="shopname">{{item.name}}</div>
            <div class="shopzhekou">{{item.desc}}</div>
          </li>
        </ul>
      </div>

      <div class="newuserdiv">
        <ul class="newuserul">
          <li v-for="(item , index) in newpeople.goodsInfo"
              :key="index" @click="goDetail(item)">
            <div class="newimgdiv">
              <img :src="item.goodCover"
                   class="newimg">
              <img src="../../assets/images/newicon.png"
                   class="newusericon">
            </div>
            <div class="newprice">￥{{item.goodPrice}}</div>
          </li>

          <!-- 下面div不在li循环范围内 -->
          <div class="newtimediv">
            <div class="newuserzs">新人专属推荐</div>
            <div class="newbuytime">剩余<van-count-down :time="time" format="DD天HH时mm分ss秒" /></div>
            
            <!-- <div class="newuserbtn">立即领取</div> -->
          </div>
        </ul>
      </div>
      <div class="guanggao">
          <van-notice-bar :left-icon="labaicon" :scrollable="false" color="#ffffff" background="#ed2e2e">
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item v-for="(item , index) in bannerlist.ad" :key="index">{{item.title}}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
      </div>
      <!-- <div class="xiaoxidiv">
        <img src="../../assets/images/laba.png"
             class="laba">

        <div class="xiaoxidiv2">
          <span class="labaxiaoxi">{{bannerlist.ad[0].title}}1</span>
        </div>     
      </div> -->
    </div>
    <div class="goodsList">
      <ListRowMs :list="miaoshaFirst"
                 :ms="true"
                 :progress="false"></ListRowMs>
      <div class="activediv">
        <ul class="activeul">
          <li @click="selectType(1)">
            <div class="activefirstline"
                 :class="{'currentactiveul':currentactiveul==1}">限时秒杀</div>
            <div class="activesecondline"
                 :class="{'currentactiveul':currentactiveul==1}">悦淘推荐</div>
          </li>
          <li @click="selectType(2)">
            <div class="activefirstline"
                 :class="{'currentactiveul':currentactiveul==2}">惊喜不断</div>
            <div class="activesecondline"
                 :class="{'currentactiveul':currentactiveul==2}">惊喜不断</div>
          </li>
          <li @click="selectType(3)">
            <div class="activefirstline"
                 :class="{'currentactiveul':currentactiveul==3}">你该评团了</div>
            <div class="activesecondline"
                 :class="{'currentactiveul':currentactiveul==3}">参团更优惠</div>
          </li>
          <li @click="selectType(4)">
            <div class="activefirstline"
                 :class="{'currentactiveul':currentactiveul==4}">他们都买了</div>
            <div class="activesecondline"
                 :class="{'currentactiveul':currentactiveul==4}">大众喜欢</div>
          </li>
        </ul>
      </div>
      <div v-show="currentactiveul==1">
        <ListRowMs :list="miaoshalist"
                   :ms="false"
                   :progress="true"></ListRowMs>
      </div>
      <div v-show="currentactiveul==2">
        <ListRowJd :list="jingxi" :loadStatus="loadStatus" @getlist="jingxiFun"></ListRowJd>
      </div>
      <div v-show="currentactiveul==3">
        <ListRowPdd :list="pintuan" :loadStatus="loadStatus2" @getlist="pintuanFun"></ListRowPdd>
      </div>
      <div v-show="currentactiveul==4">
        <ListRowAllbuy :list="allbuy"></ListRowAllbuy>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload ,Toast,CountDown,NoticeBar} from 'vant';
import Head from '@/component/head/head';
import ListRowMs from '@/component/Goods/listRowMs';
import ListRowJd from '@/component/Goods/listRowJd';
import ListRowPdd from '@/component/Goods/listRowPdd';
import ListRowAllbuy from '@/component/Goods/listRowAllbuy';
import { getIndexHeadType, miaosha, jingxi, pintuan, allbuy, newpeople } from '@/services/api'

Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(CountDown);
Vue.use(NoticeBar);
export default {
  data () {
    return {
      bannerlist: "",//头部banner
      miaoshalist: "",//秒杀
      miaoshaFirst: "",//秒杀第一条
      jingxi: [],//惊喜
      pintuan: [],//拼团
      allbuy: "",//都买
      newpeople: "",//新人推荐
      currentactiveul: 1,//默认选中秒杀列表
      isLogin:false ,//用户登录状态，默认未登录
      userinfo:"", //用户信息
      headcolor:"#fff",// 头部标题颜色
      labaicon:"https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-04/16/yuelvhuiVJ2OYnX0CS1596528082.png",
      time:"",//倒计时
      loadStatus:{//JD
        loading:false,
        finished:false,
        page:1
      },
      loadStatus2:{ //拼多多
        loading:false,
        finished:false,
        page:1
      },
    };
  },
  components: {
    Head,
    ListRowMs,
    ListRowJd,
    ListRowPdd,
    ListRowAllbuy
  },
  mounted () {
    this.getindexheadFun();//头部
    this.newpeopleFun();//新人推荐
    this.miaoshaFun();//秒杀
    setTimeout(()=>{
      this.jingxiFun();//惊喜
      this.pintuanFun();//拼团
      this.allbuyFun();//都买
    },1000)
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //头部
    getindexheadFun () {
      let uid= localStorage.getItem("uid")?localStorage.getItem("uid"):0;
        let params ={mid:uid};
      getIndexHeadType(params).then(res => {
        if (res.code == 200) {
          this.bannerlist = res.data;
        }
      })
    },
    //秒杀
    miaoshaFun () {
      miaosha().then(res => {
        if (res.code == 200) {
          this.miaoshalist = res.data;
          let data = [];
          data.push(res.data[0]);//只展示第一条
          this.miaoshaFirst = data;
        }
      })
    },
    //惊喜
    jingxiFun () {
      let data = {
        "page": this.loadStatus.page,
        "pageNum": 10
      }
      jingxi(data).then(res => {
        if (res.code == 200) {
          if(res.data==""){
            this.loadStatus.finished=true;
          }else{
            this.loadStatus.page++;
            res.data.map((value)=>{
                this.jingxi.push(value);
            })
          }
          this.loadStatus.loading=false;
        }
      })
    },
    //拼团
    pintuanFun () {
      let data = {
        "channelId": 98,
        "page": this.loadStatus2.page,
        "pageNum": 10,
        "mid":localStorage.getItem('uid')?localStorage.getItem('uid'):0
      }
      pintuan(data).then(res => {
        if (res.code == 200) {
          if(res.data==""){
            this.loadStatus2.finished=true;
          }else{
            this.loadStatus2.page++;
            res.data.map((value)=>{
                this.pintuan.push(value);
            })
          }
          this.loadStatus2.loading=false;
        }
      })
    },
    //都买
    allbuyFun () {
      let uid= localStorage.getItem("uid");
      let params ={
        "mid":uid
      }
      allbuy(params).then(res => {
        if (res.code == 200) {
          this.allbuy = res.data;
        }
      })
    },
    //新人推荐
    newpeopleFun () {
      newpeople().then(res => {
        if (res.code == 200) {
          this.newpeople = res.data;
          let nowTime =new Date().getTime();
          let time = new Date(res.data.endTime).getTime();
          this.time=time-nowTime;
        }
      })
    },
    //切换展示类型
    selectType (e) {
      this.currentactiveul = e;
    },
    //icon跳转
    jump (url) {
      if(url.name=="大牌折扣"){
        let uid = localStorage.getItem("uid");
        if(uid){
            window.location.href=url.jumpUrl;
        }else{
            Toast("请您登录后再访问");
        }
      }else{
        this.$store.commit('changeInterceptUrl',window.location.href + url.jumpUrl.substring(1))
        this.$store.dispatch('loginIntercept',this.$route.query)
        if(window.localStorage.getItem('uid')){
            this.$router.push({ path: url.jumpUrl });
        }
      }
    },
    //跳转详情
    goDetail(data){
      this.$router.push({path:'/goodsDetailZY',query:{goodsId:data.goodId,skuid:data.productSkuId}});
    },
    handleScroll(){
        // console.log(document.documentElement.scrollTop);
        // var scrollTop = document.documentElement.scrollTop;
        // if(scrollTop>86){
          
        // }
    },   
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped >
.main {
  background: #f6f6f6;
  padding-bottom: 50px;
}
.pages {
  width: 375px;
  padding: 0 12px;
  background: url(../../assets/images/headbg.png) no-repeat;
  background-size: 375px 457px;
  box-sizing: border-box;
}
.navdiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
}
.link {
  width: 60px;
  color: #ffffff;
  font-size: 15px;
  position: relative;
}
.current {
  font-weight: bold;
}
.link.current::after {
  position: absolute;
  content: "";
  height: 4px;
  width: 60px;
  left: 0;
  bottom: -10px;
  border-radius: 2px;
  background: #fff;
}
.swipediv {
  margin-top: 15px;
  border-radius: 8px;
  width: 351px;
  height: 150px;
}
.van-swipe {
  height: 100%;
  border-radius: 8px;
}
.shopdiv {
  margin-top: 16px;
}
.shopul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.shopul li {
  width: 53px;
  text-align: center;
  margin-left: 15px;
  margin-bottom: 16px;
}
.shipicondiv {
  width: 53px;
  text-align: center;
}
.shopicon {
  width: 40px;
  height: 40px;
}
.shopname {
  font-size: 13px;
  color: #333333;
  font-weight: bold;
  margin-top: 5px;
}
.shopzhekou {
  font-size: 11px;
  color: #999999;
  margin-top: 5px;
}
.newuserdiv {
  background: url("../../assets/images/newbg.png") no-repeat;
  background-size: 351px 125px;
  width: 351px;
  height: 125px;
  padding: 10px;
}
.newuserul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.newuserul li {
  height: 105px;
  border-radius: 4px;
  border: 1px solid red;
}
.newimgdiv {
  position: relative;
  border-radius: 4px 4px 0 0;
}
.newimg {
  width: 75px;
  height: 75px;
  display: block;
  border: 0;
  border-radius: 4px 4px 0 0;
}
.newusericon {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 75px;
  height: 17px;
}
.newprice {
  font-size: 13px;
  color: #e91726;
  text-align: center;
  line-height: 30px;
  background: #fff;
  font-weight: bold;
  border-radius: 0 0 4px 4px;
}
.newtimediv {
  width: 90px;
  text-align: center;
}
.newuserzs {
  font-size: 13px;
  color: #ffffff;
  margin-top: 30px;
}
.newbuytime {
  font-size: 12px;
  color: #ffffff;
  margin-top: 10px;
}
.van-count-down{
  font-size: 12px;
  color: #ffffff;
  display: inline;
}
.newuserbtn {
  width: 71px;
  height: 24px;
  background: linear-gradient(
    0deg,
    rgba(255, 226, 28, 1),
    rgba(255, 163, 2, 1)
  );
  border-radius: 12px;
  color: #462508;
  text-align: center;
  line-height: 24px;
  margin-top: 15px;
  margin-left: 10px;
  font-size: 12px;
}
.guanggao{
  margin-top: 10px;
}
.xiaoxidiv {
  margin-top: 10px;
  background: url("../../assets/images/xiaoxi.png") no-repeat;
  background-size: 351px 34px;
  width: 351px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.laba {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-left: 20px;
}
.xiaoxidiv2{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 34px;
}
.notice-swipe {
    height: 34px;
    line-height: 34px;
    border-radius:8px;
}
.labaxiaoxi {
  font-size: 13px;
  color: #ffffff;
  display:block;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 34px;
  line-height: 34px;
}
.goodsList {
  margin-top: 10px;
  width: 375px;
}
.activeul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.activefirstline {
  font-size: 15px;
  color: #141414;
  font-weight: bold;
}
.activesecondline {
  font-size: 12px;
  color: #141414;
  margin-top: 5px;
}
.activediv {
  margin: 10px 0;
}
.currentactiveul {
  color: #ee0e1b;
}
/deep/ .van-notice-bar{
    border-radius: 20px;
    border: 3px solid rgb(254,216,149);
    height: 34px;
    font-size: 13px;
}
/deep/ .van-icon__image {
  width: 20px;
  height: 20px;
}
</style>