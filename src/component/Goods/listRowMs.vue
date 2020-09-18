<template>
  <ul class="goodsul">
    <li v-for="(item ,index) in list"
        :key="index"
        @click="gobuy(item)">
      <div class="goodsleft">
        <img :src="item.goodCover"
             class="goodsimg">
      </div>
      <div class="goodsright">
        <div>
          <div class="goods_name">{{item.goodName}}</div>
          <div class="goodsprogress"
               v-show="progress">
            <div class="progress1">
              <div class="progress2"
                   :style='{width:item.discount+"px"}'></div>
            </div>
            <span class="progress_num">已售{{item.discount}}%</span>
          </div>
        </div>

        <div class="goodsright_bottom">
          <div class="goodspricediv">
            <div class="goodspicediv">
              <div class="goodspricenow">¥{{item.goodVipPrice}}</div>
              <div class="goodspriceold">¥{{item.goodPrice}}</div>
            </div>
            <div class="willbuy">我要了</div>
            <!-- <div class="willbuy">去购买</div> -->
            <!-- <div class="willbuy">马上抢</div> -->
          </div>
        </div>
      </div>
      <!-- 18:00秒杀 -->
      <div class="miaoshatip"
           v-show="ms">限时秒杀</div>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      useravatar: ['', '', '', '']
    }
  },
  props: ["list", "ms", "progress"],
  methods: {
    gobuy (data) {
      this.$router.push({ path: '/goodsDetailMS', query: { goodsId: data.goodId, skuid: data.productSkuId, activityId: data.activityId } });
    }
  }
}
</script>
<style lang="less" scoped>
.goodsul li {
  background: #ffffff;
  border-radius: 8px;
  padding: 14px;
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
}
.goodsleft {
  width: 140px;
  height: 140px;
  overflow: hidden;
}
.goodsimg {
  width: 100%;
}
.goodsright {
  width: 195px;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  align-content: space-between;
}
.goods_name {
  color: #141414;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 22px;
}
.goodsyhjdiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4px;
}
.goodsyhj {
  background: url("../../assets/images/yhj.png") no-repeat;
  background-size: 82px 22px;
  width: 82px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  font-size: 12px;
  color: #ed2e2e;
}
.goodspl {
  font-size: 12px;
  color: #999999;
  margin-left: 5px;
}
.goodsprogress {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.progress1 {
  width: 100px;
  height: 4px;
  background: #ffeff0;
  position: relative;
}
.progress2 {
  width: 0px;
  height: 4px;
  background: #ed2e2e;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
}
.progress_num {
  font-size: 12px;
  color: #999999;
  margin-left: 20px;
}
.buyuser {
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.uservatarlist {
  position: relative;
  width: 120px;
}
.useravatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-left: -0.13rem;
  position: relative;
}
.buypeople {
  font-size: 12px;
  color: #999999;
  margin-left: 10px;
}
.goodsright_bottom {
  width: 100%;
}
.goodspricediv {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.goodspicediv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.goodspricenow {
  color: #ed2e2e;
  font-weight: bold;
  font-size: 18px;
}
.goodspriceold {
  font-size: 12px;
  color: #999999;
  text-decoration: line-through;
  margin-left: 2px;
}
.willbuy {
  width: 68px;
  height: 24px;
  background: #ed2e2e;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
  font-size: 13px;
  border-radius: 15px;
}
.goodstg {
  width: 89px;
  height: 22px;
  border-radius: 11px;
  border: 1px solid #ed2e2e;
  color: #ed2e2e;
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  margin-top: 5px;
}
.goodsBtnlist {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.goodsbtn {
  width: 64px;
  height: 22px;
  border-radius: 11px;
  background: #ed2e2e;
  text-align: center;
  line-height: 22px;
  font-size: 12px;
  color: #ffffff;
  margin-left: 10px;
}
.miaoshatip {
  width: 80px;
  height: 30px;
  background: #ed2e2e;
  border-radius: 0 40px 40px 0;
  position: absolute;
  left: 0;
  top: 12px;
  font-size: 14px;
  color: #ffffff;
  line-height: 30px;
  text-align: center;
}
.qztj {
  width: 77px;
  height: 22px;
  background: #feab05;
  border-radius: 4px 4px 16px 4px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 12px;
  top: 12px;
  line-height: 22px;
}
.goodhand {
  width: 12px;
  height: 12px;
  margin-left: 2px;
}
.qztjspan {
  padding-left: 3px;
}
.logodiv {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.compony {
  font-size: 12px;
  color: #999999;
}
.logo {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>