<template>
  <div id="apps"
       :style='"background:#" + info.bgColor'>
    <!-- <my-header :browser='browser'></my-header>
    <show-list :showLoading='showLoading'></show-list> -->

    <div class="img-back"
         v-if="type== 4"
         :style="{backgroundImage:'url('+info.appOneImage+')'}">
      <!-- <img class="img-top"
           :src="info.appOneImage"> -->

      <div class="couponDetail"
           v-if="type== 4">
        <div class="left">
          <div><span>￥</span> <span>{{info.couponData.couponPrice}}</span></div>
          <div>{{info.couponData.couponDesc}}</div>
        </div>
        <div class="middle">
          <div class="title">{{info.couponData.title}}</div>
          <div class="desc">{{info.couponData.titleDesc}}</div>
          <div class="time">{{info.couponData.endTime}}</div>
        </div>
        <div class="right"
             @click="order(info.link)">用券下单</div>
      </div>
      <img class="img-desc" v-if="info.appTwoImage"
           :src="info.appTwoImage" />
    </div>
    <img class="top" v-if="info.imgUrl"
         :src="info.imgUrl"
         alt="" />
    <img class="go"
         src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-03-13/16/yuelvhui9yIpLfLO321584089624.gif"
         @click="order(info.link)"
         alt="" />
    <div class="rules"
         :style="{'background':'#'+info.ruleCoulr}">
      <div class="header">规则说明</div>
      <div class="list"
           v-for='(item,index) in info.explain'
           :key="index">{{index+1}} : {{item}}</div>
    </div>
  </div>
</template>
<script>
import { getcpsInfo } from '../../services/activity';
export default {
  data () {
    return {
      info: {
        bgColor: ''
      },
      type: '',
      room_id:"",
      codeNumber:"",
      live_id:"",
      live_people_id:"",
      uid:""
    }
  },
  mounted () {
    // this.room_id=this.$route.query.room_id || "0"; // cpsID
    this.codeNumber=this.$store.state.codeNumber || ""; // codeID
    this.room_id=this.$store.state.room_id || ""; // 关系ID
    this.live_id=this.$store.state.live_id || ""; // 直播间ID
    this.live_people_id=this.$store.state.live_people_id || ""; // 主播ID
    this.uid=window.localStorage.getItem("uid") || 0; // 用户ID
    this.getcpsInfo();
  },
  methods: {
    getcpsInfo () {
      this.type = this.$route.query.type
      let opt = {
      type: this.type,
      postType: 2,
      uid: this.uid,
      room_id:this.room_id,
      codeNumber:this.codeNumber,
      live_id:this.live_id,
      live_people_id:this.live_people_id
      }
      getcpsInfo(opt).then(res => {
        this.info = res.data
        switch(res.data.type){
          case '1':
          document.title = "唯品会"
          break;
          case '2':
          document.title = "苏宁"
          break;
          case '4':
          document.title = "美团"
          break;
          default:
          document.title = "悦淘"
        }
      })
    },
    order (link) {
      console.log(1)
      window.location.href = link
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  padding-bottom: 20px;
  img{
    border: 0;
  }
  .img-back {
    padding-top: 292px;
    background-size: 100%;
    background-repeat: no-repeat;
    .img-top {
      width: 100%;
    }
    .couponDetail {
      background-image: url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-03-18/17/yuelvhuiELD1bafTON1584525588.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      font-size: 0.3rem;
      width: 345px;
      height: 85px;
      margin: 0 auto 15px;
      border-radius: 8px;
      height: 85px;
      z-index: 1;
    }
    .couponDetail .left {
      width: 110px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #666666;
      font-size: 12px;
    }

    .couponDetail .left > div:nth-child(1) {
      color: #d40f00;
      font-size: 30px;
    }

    .couponDetail .left > div:nth-child(1) > span:nth-child(1) {
      font-size: 14px;
    }

    .couponDetail .middle {
      width: 130px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-sizing: 0 0.2rem;
    }

    .couponDetail .middle .title {
      color: #141414;
      font-size: 14px;
      font-weight: bold;
    }

    .couponDetail .middle .desc {
      color: #141414;
      font-size: 14px;
      font-weight: bold;
    }

    .couponDetail .middle .time {
      color: #333333;
      font-size: 11px;
      padding-top: 11px;
    }

    .couponDetail .right {
      width: 79px;
      height: 34px;
      background: linear-gradient(
        -30deg,
        rgba(253, 187, 45, 1),
        rgba(255, 221, 90, 1)
      );
      border-radius: 17px;
      color: #141414;
      font-size: 13px;
      text-align: center;
      line-height: 34px;
      font-weight: bold;
    }
  }
  .img-desc {
    width: 345px;
    margin: 0 auto;
  }
  .rules {
    padding: 21px 23px 50px 19px;
    width: 345px;
    border-radius: 8px;
    margin: 0 auto;
    text-align: left;
    color: #fff;
    line-height: 21px;
    font-size: 10px;
  }
}
</style>
