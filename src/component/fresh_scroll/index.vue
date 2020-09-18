<template>
  <div class="fresh_scroll">
    <div v-for="(item,index) in activityList"
         :key="index">
      <img class="tit"
           v-if="item.typeInfo.temType == 1"
           :src="item.goodsInfo[0].image">
      <div class="scroll_list"
           v-if="item.typeInfo.temType == 3">
        <div class="scroll_item"
             @click="goDetail(item)"
             v-for="(item,index) in item.goodsInfo"
             :key='index'>
          <img :src="item.image">
          <p class="desc">{{item.goodsName}}</p>
          <p class="money"><em>¥</em>{{item.goodsPrice}}<span><em>¥</em>{{item.vipPrice}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'scroll',
  props: ['activityList'],
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    goDetail (item) {
      // /goodsDetailZY?liveId='直播ID'&liveUserId='直播人ID'&parentTypeId='产品类型'&goodsId='产品ID'&skuid='产品规格ID'
      this.$router.push({ path: "/goodsDetailZY", query: { liveId: '1', liveUserId: '32456', parentTypeId: '3', goodsId: item.goodId, skuid: item.skuId } })
    }
  }
}
</script>
<style lang="less">
/*滑动商品*/
.fresh_scroll {
  width: 100%;
  margin: 0 auto 10px;
  img.tit {
    width: 100%;
    display: block;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
  }
  .scroll_list {
    width: 351px;
    padding: 10px;
    // font-weight: bold;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
    margin: 0 auto;
    .scroll_item {
      width: 93px;
      margin-right: 10px;
      img {
        border-radius: 9px;
        width: 93px;
        height: 93px;
        margin-bottom: 10px;
      }
      .desc {
        width: 93px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /*要显示的行数*/
        -webkit-box-orient: vertical;
        line-height: 19px;
        color: #333333;
      }
      .money {
        font-size: 17px;
        color: #c82519;
        padding-top: 20px;
        span {
          color: #bbbbbb;
          font-size: 12px;
          float: right;
          line-height: 23px;
        }
        em {
          font-size: 12px;
          font-style: normal;
        }
      }
    }
  }
}
</style>