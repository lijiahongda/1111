<template>
  <div>
    <div class="gradList wid">
      <div class="gradItem"
           v-for="(item,index) in categoryGrip"
           @click="goSearch(item)"
           :key="index">
        <img :src="item.productImage"
             alt="item.categoryThreeName">
        <p v-html="item.categorySecondName || item.categoryFirstName"></p>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: 'grid',
  props: ['categoryGrip', 'hover', 'goodStore','env'],
  components: {
  },
  data () {
    return {
      grid: ''
    }
  },
  mounted () {
  },
  methods: {
    goSearch (item) {
      let _this = this
      // == 'goodStore' 好衣库   否则 就是 生鲜、美妆、
      if (_this._props.goodStore == 'goodStore') {
        console.log(item)
       if(this.env==99){
         let _url =
          "http://web.yuetao.group/clothes?epId=" +
          item.categoryFirstId +
          "&channelName=" +
          item.categoryFirstName +
          "&env=" +
          99;
        let _Router = {
          redirectType: 111,
          redirectUrl: _url,
          name: item.categoryFirstName,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
       }else{
          //好衣库
        _this.$router.push({
          path: '/clothes',
          query: {
            epId: item.categoryFirstId,
            channelName: item.categoryFirstName,
            env: this.env
          }
        })
       }
      } else {
        // 生鲜、美妆、
        _this.$router.push({ path: '/goodsList', query: { searchKeyword: item.categorySecondName, fromPage: _this._props.hover } })
      }
    }
  }

}
</script>

<style lang="less" scoped>
.wid {
  width: 351px;
  margin: 8.5px auto 7.5px;
  border-radius: 9px;
  background: #fff;
  width: 351px;
}

.iconList {
  padding: 15px 13px;
  border-radius: 9px;
  background: #fff;
}
.gradList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  .gradItem {
    width: 50px;
    margin: 15px 20px 0 0;
    img {
      width: 46px;
      height: 46px;
      margin-bottom: 9px;
      border-radius: 100%;
    }
    p {
      font-size: 12px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 50px;
    }
  }
  .gradItem:nth-child(5n) {
    margin-right: 0;
  }
}
</style>