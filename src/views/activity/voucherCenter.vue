<template>
  <div class="warp"
       :style="{'background':bgColor}">
    <img class="banner"
         :src="banner">
    <div class="activety_center_list">
      <div class="activety_item"
           v-for="(item,index) in List"
           :key="index">
        <div class="left">
          <img :src="item.couponImg">
          <p>
            <span class="title">{{item.couponName}}</span>
            <span class="mony"><em>¥</em>{{item.usedMoney}}</span>
            <span class="conditions">{{item.remind}}</span>
          </p>
        </div>
        <div class="right"
             @click="postVouchers(item)">
          <p>立即领取</p>
        </div>
        <div :style="{'background':bgColor}"
             class="radio-top radio"></div>
        <div :style="{'background':bgColor}"
             class="radio-bottom radio"></div>
      </div>

    </div>
  </div>
</template>
<script>
import { voucherList, postVouchers } from "../../services/activity";
import { Toast } from "vant"; // 提示框
export default {
  name: 'activity',
  data () {
    return {
      banner: '',
      title: '',
      bgColor: '',
      valuetext: '',
      page: 1,
      pageSize: 10,
      List: [],
    }
  },
  created () {
    this.voucherList()
  },
  methods: {
    //获取信息
    voucherList () {
      let opt = {
        uid: window.localStorage.getItem('uid') || '',
        couponActivityId: 1,
        page: this.page,
        pageSize: this.pageSize
      }
      voucherList(opt).then(res => {
        this.banner = res.data.activityInfo.shareImg
        this.bgColor = res.data.activityInfo.showColor
        this.List = res.data.list
      })
    },
    //领取优惠券
    postVouchers (item) {
      console.log(item)
      let opt = {
        uid: window.localStorage.getItem('uid') || '',
        cid: item.cid
      }
      //拦截器requsts
      postVouchers(opt).then(res => {
        if (res.code == 200) {
          Toast(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.warp {
  height: 100%;
}
.activety_center_list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 347px;
  margin: 0 auto;
  padding: 30px 0;
  .activety_item {
    display: flex;
    flex-direction: row;
    position: relative;
    margin-bottom: 10px;
    .radio {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      position: absolute;
      left: 255px;
    }
    .radio-top {
      top: -5px;
    }
    .radio-bottom {
      bottom: -5px;
    }
    .left {
      background: #fff;
      width: 260px;
      height: 88px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      display: flex;
      flex-direction: row;
      padding: 4px;
      img {
        width: 77px;
        height: 79px;
      }
      p {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 14px;
        .title {
          color: #ed7a4b;
          font-size: 14px;
          font-weight: bold;
          padding: 8px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 150px;
        }
        .mony {
          color: #ed7a4b;
          font-size: 27px;
          font-weight: bold;
          em {
            font-style: normal;
            font-size: 14px;
          }
        }
        .conditions {
          color: #666;
          font-size: 10px;
        }
      }
    }
    .right {
      background: #f7d488;
      width: 87px;
      height: 88px;
      padding-top: 28px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      p {
        width: 74px;
        height: 32px;
        line-height: 32px;
        background: #fff;
        text-align: center;
        font-size: 14px;
        color: #d37c29;
        margin: 0 auto;
        border-radius: 16px;
      }
    }
  }
}
</style>