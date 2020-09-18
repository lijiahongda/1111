<template>
  <div :style="{'background':'#'+bgColor}">
    <img class="banner"
         :src="banner">
    <img v-if="title != ''"
         class="tit"
         :src="title">
    <div v-for="(item,index) in list"
         :key="index">
      <!--模版1-->
      <div class="activety_list activety_list1"
           v-if="item.teamType == 1">
        <div class="activety_item"
             v-for="(jx,index) in item.goodsInfo"
             :key="index"
             @click="godetail(jx)">
          <img :src="jx.goodCover">
          <h1>{{jx.goodName}}</h1>
          <p><em>¥</em>{{jx.goodVipPrice}}<span><em>¥</em>{{jx.goodPrice}}</span></p>
        </div>

      </div>
      <!--模版二-->
      <div class="activety_list activety_list2"
           v-if="item.teamType == 2">
        <div class="activety_item"
             v-for="(jx,index) in item.goodsInfo"
             :key="index"
             @click="godetail(jx)">
          <img :src="jx.goodCover">
          <h1>{{jx.goodName}}</h1>
          <p><em>¥</em>{{jx.goodVipPrice}}<span><em>¥</em>{{jx.goodPrice}}</span></p>
        </div>

      </div>
      <!--模版三-->
      <div class="activety_list activety_list3"
           v-if="item.teamType == 3">
        <div class="activety_item"
             v-for="(jx,index) in item.goodsInfo"
             :key="index"
             @click="godetail(jx)">
          <img :src="jx.goodCover">
          <h1>{{jx.goodName}}</h1>
          <p><em>¥</em>{{jx.goodVipPrice}}<span><em>¥</em>{{jx.goodPrice}}</span></p>
        </div>

      </div>

      <!--模版四-->
      <div class="activity_box">
        <div class="activety_list activety_list4"
             :style="'width:'+item.width+'px'"
             v-if="item.teamType == 4"
             @click="godetail(jx)">
          <div class="activety_item"
               v-for="(jx,index) in item.goodsInfo"
               :key="index">
            <img :src="jx.goodCover">
            <h1>{{jx.goodName}}</h1>
            <p><em>¥</em>{{jx.goodVipPrice}}<span><em>¥</em>{{jx.goodPrice}}</span></p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getActivityList } from '../../services/activity.js'
export default {
  name: 'acthds',
  data () {
    return {
      banner: '',
      title: '',
      bgColor: 'd71f28',
      valuetext: ',mmkll',
      list: [],
      id: ''//活动id
    }
  },
  created () {
    this.getActivityList()
  },
  methods: {
    //获取信息
    getActivityList () {
      this.id = this.$route.query.id
      let opt = {
        id: this.id,
        // categoryId: 0, 不知道是什么
        page: 1,
        pageSize: 10

      }
      getActivityList(opt).then(res => {
        console.log(res)
        this.list = res.data
        this.banner = res.data[0].teamBanner
        this.list.map((item, index) => {
          item.width = 120 * (item.goodsInfo.length + 1)

          console.log(item.goodsInfo.length, '99999')
        })
        console.log(this.list, 'this.list')
      })
    },
    //跳转商品详情
    godetail (item) {
      console.log(item)
      this.$router.push({ path: "/goodsDetailZY", query: { goodsId: item.ProductId, skuid: item.skuId } })
    }
  }
}
</script>
<style lang="less" scoped>
.tit {
  display: block;
}
.activety_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 0 15px;
  width: 355px;
  margin: 0 auto;
  .activety_item {
    width: 175px;
    height: 235px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
    margin-top: 5px;
    img {
      width: 175px;
      height: 164px;
    }
    h1 {
      font-size: #191919;
      font-size: 12px;
      line-height: 15px;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2; /*要显示的行数*/
      -webkit-box-orient: vertical;
      padding: 0 12px;
      height: 0.8rem;
      text-align: left;
    }
    p {
      color: #ff4545;
      font-size: 10px;
      padding: 0 12px;
      text-align: left;
      font-size: 13px;
      span {
        font-size: 12px;
        color: #959595;
        text-decoration: line-through;
      }
      em {
        font-size: 10px;
      }
    }
  }
  .activety_item:nth-child(odd) {
    margin-right: 5px;
  }
}
.activety_list1 {
  padding: 0 0;
  .activety_item {
    width: 355px;
    max-height: 264px;
    margin-top: 10px;
    border-bottom-right-radius: 50px;
    img {
      width: 355px;
      height: auto;
    }
  }
  .activety_item:nth-child(odd) {
    margin-right: 0;
  }
}
.activety_list3 {
  padding: 0 0 15px;
  .activety_item {
    width: 115px;
    height: 170px;
    margin-right: 5px;
    img {
      width: 115px;
      height: 120px;
    }
  }

  .activety_item:nth-child(3n) {
    margin-right: 0;
  }
}
.activity_box {
  padding: 0 5px;
  overflow: scroll;
}
.activity_box {
  overflow-x: scroll;
}
.activety_list4 {
  width: 100%;
  .activety_item {
    width: 115px;
    height: 170px;
    margin-right: 5px;
    float: left;
    overflow: hidden;
    img {
      width: 115px;
      height: 120px;
    }
  }
  .activety_item:nth-child(odd) {
    margin-right: 5px;
  }
}
</style>