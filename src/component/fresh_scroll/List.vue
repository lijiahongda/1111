<template>
  <div>
    <!--推荐商品-->
    <div class="recommended">
      <div v-if="list.length != '0'">
        <h1><img src="../../assets/images/fresh_icon3.png"><em>推荐商品</em><span>猜你喜欢</span></h1>
        <div class="recommended_list">
          <van-list v-model="childLoadParams.loading"
                    :finished="childLoadParams.finished"
                    :immediate-check="false"
                    offset="300"
                    :error.sync="childLoadParams.error"
                    error-text="请求失败，点击重新加载"
                    finished-text="没有更多了"
                    @load="onLoad">
            <div class="recommended_item"
                 v-for="(item,index) in list"
                 :key="index"
                 @click="godetail(item)">
              <img class="img"
                   :src="item.goodCover">
              <p class="tit">{{item.goodName}}
              </p>
              <!-- <p class="desc">
                优选材质，便携使用便携优选材质，便携使用便携
              </p> -->
              <p class="money"><em>¥</em>{{item.goodPrice}}<span><em>原价:¥</em>{{item.goodVipPrice}}</span></p>
            </div>
          </van-list>
        </div>
      </div>
    </div>
    <Nav></Nav>
  </div>
</template>
<script>
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
export default {
  name: 'fresh',
  props: ['list', 'childLoadParams'],
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {

    //触底请求
    onLoad () {
      this.$nextTick(() => {
        this.$emit('sendInfo', { nowPage: this.childLoadParams.page + 1 })
      })
    },
    //跳转到详情
    godetail (item) {
      // /goodsDetailZY?liveId='直播ID'&liveUserId='直播人ID'&parentTypeId='产品类型'&goodsId='产品ID'&skuid='产品规格ID'
      this.$router.push({ path: "/goodsDetailZY", query: { goodsId: item.goodId, skuid: item.skuId } })
    }
  }
}
</script>
<style lang="less" scoped>
/*精选商品*/
.recommended {
  width: 351px;
  margin: 0 auto;
  padding-bottom: 50px;
  h1 {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 16px;
    color: #141414;
    height: 21px;
    img {
      width: 21px;
      height: 21px;
      display: inline-block;
      margin-right: 4px;
    }
    em {
      font-style: normal;
    }
    span {
      color: #999;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .recommended_list,
  .van-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: left;
    .recommended_item:nth-child(odd) {
      margin-right: 9px;
    }
    .recommended_item {
      width: 171px;
      padding: 0 16px;
      background: #fff;
      border-radius: 9px;
      display: flex;
      flex-direction: column;
      margin-bottom: 9px;
      .tit {
        color: #191919;
        font-size: 15px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /*要显示的行数*/
        -webkit-box-orient: vertical;
        margin-top: 10px;
        line-height: 22px;
        font-weight: bold;
      }
      .desc {
        color: #999;
        font-weight: bold;
        font-size: 12px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1; /*要显示的行数*/
        -webkit-box-orient: vertical;
        height: 12px;
      }
      .money {
        font-size: 17px;
        color: #c82519;
        font-weight: bold;
        margin-top: 20px;
        span {
          text-decoration: line-through;
          color: #bbbbbb;
          font-size: 12px;
          margin-left: 2px;
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