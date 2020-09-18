<template>
  <div class="warp" :style='"background:"+activityInfo.backColor'>
    <div class="banner">
      <img :src="activityInfo.backGround.url" alt />
    </div>
    <div class="menuList" v-if="typeList!=''" :style='"background:"+activityInfo.tabColor'>
      <ul>
        <li
          v-for="item in typeList"
          :key="item.id"
          :class="{active:num==item.id}"
          @click="getNum(item.id)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="tabCon_header">
      <img :src="teamBanner" alt />
    </div>
    <div class="tabCon">
      <div
        class="tabCon-item"
        v-for="(item,index) in goodsInfo"
        :key="index"
        @click="goShopdetail(item)"
      >
        <img :src="item.goodCover" alt />
      </div>
    </div>
    <div class="take_footer">
      <div class="take_footer-title">规则说明</div>
      <div class="take_footer-txt">1.新用户注册白拿一次</div>
      <div class="take_footer-txt">2.分享好友购买,每三个好友购买,自己可多一次白拿次数</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import {
  getActivityCategoryInfo,
  newActivityList,
} from "../../services/activity";
export default {
  name: "takewithoutpaying",
  data() {
    return {
      num: "75", //默认id
      activityInfo: "", //分类集合
      typeList: [], //类型列表
      teamBanner: "", //活动提示图
      goodsInfo: "", //白拿列表
    };
  },
  mounted() {
    this.getCategoryInfo();
    this.getList();
  },
  methods: {
    // 选项卡
    getNum(e) {
      this.num = e;
      this.getList();
    },
    // 获取白拿类型
    getCategoryInfo() {
      let _self = this;
      let params = {
        id: 55,
      };
      getActivityCategoryInfo(params).then((res) => {
        if (res.code == 200) {
          _self.activityInfo = res.data.activityInfo;
          _self.typeList = res.data.categoryInfo;
        } else {
          Toast(res.msg);
        }
      });
    },
    //获取白拿商品列表
    getList() {
      let _self = this;
      let params = {
        id: 55,
        categoryId: _self.num,
        page: 1,
        pageSize: 10,
      };
      newActivityList(params).then((res) => {
        if (res.code == 200) {
          _self.goodsInfo = res.data[0].goodsInfo;
          _self.teamBanner = res.data[0].teamBanner;
        } else {
          Toast(res.msg);
        }
      });
    },
    // 去详情
    goShopdetail(e) {
      this.$router.push({path:'/goodsDetailZY',query:{goodsId:e.goodId,skuid:e.productSkuId}})
    },
  },
};
</script>
<style lang="less" scoped>
.warp {
  width: 100%;
  height: auto;

  .banner {
    width: 100%;
    height: auto;
    overflow: hidden;
    img {
      display: block;
    }
  }
  .menuList {
    width: 100%;
    height: auto;
    overflow: auto;
    ul {
      width: 100%;
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      color: #e8e8e8;
      font-size: 0.4rem;
      line-height: 1rem;
      li {
        flex: 1;
        text-align: center;
      }
    }
    .active {
      color: #fff;
      font-size: 0.45rem;
      background: #444444;
    }
  }
  .tabCon_header img {
    width: 8rem;
    height: 5rem;
    margin: 0.3rem auto;
    display: block;
    font-size: 0;
    vertical-align: middle;
  }
  .tabCon {
    width: 100%;
    height: auto;
    overflow: auto;
    color: #999;
    font-size: 0.3rem;
    .tabCon-item {
      width: 90%;
      height: auto;
      overflow: auto;
      margin: 0.3rem auto;
    }

    .tabCon-item img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .take_footer {
    color: #ffffff;
    padding: 0.8rem;
    text-align: left;
    .take_footer-title {
      font-size: 0.4rem;
    }

    .take_footer-txt {
      font-size: 0.3rem;
      line-height: 0.5rem;
    }
  }
}
</style>