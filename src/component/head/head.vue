<template>
    <div class="head">
        <template v-if="isLogin">
          <div class="headimgdiv">
            <img :src="userinfo.avatar" class="headicon">
          </div>
          <div class="headmiddle" >
            <div class="username" :style="{color:color}">{{userinfo.nickname}}</div>
            <div class="vip" :style="{color:color}">{{userinfo.levelText}}</div>
          </div>
        </template>
        <template v-else>
          <div class="headimgdiv" @click="gologin">
            <img src="../../assets/images/defaulthead.png" class="headicon">
          </div>
          <div class="headmiddle" @click="gologin">
            <div class="usernames" :style="{color:color}">请登录</div>
            <div class="vip"></div>
          </div>
        </template>
        <div class="searchdiv">
          <img src="../../assets/images/search.png"
               class="fangdajing">
          <input type="text"
                 placeholder="搜索品牌优惠卷 优惠下单"
                 @click="jumpToGoodsSearch"
                 class="searchinput">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isLogin:false ,//用户登录状态，默认未登录
            userinfo:"", //用户信息
        }
    },
    props:{
      color:{
        type:String,
        default:"#333333"
      }
    },
    mounted(){
        this.getUserLogin();//获取用户登录状态
    },
    methods:{
        gologin(){
            this.$router.push({ path: "/login" });
        },
        //获取用户登录状态
        getUserLogin(){
            var that = this;
            var uid =localStorage.getItem("uid");
            if(uid){
                that.isLogin=true;
                this.userinfo={
                "nickname":localStorage.getItem("nickname"),
                "avatar":localStorage.getItem("userarvr"),
                "levelText":localStorage.getItem("levelText"),
                }
            }
        },
        //首页搜索框点击跳转搜索页
        jumpToGoodsSearch () {
        this.$router.push('./goodsSearch');
        },
    }
}
</script>
<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 5px;
}
.headimgdiv {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.headicon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.headmiddle {
  width: 70px;
  text-align: left;
}
.username {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  margin-top: 5px;
}
.usernames {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  margin-top: 5px;
  line-height: 30px;
}
.vip {
  font-size: 11px;
  margin-top: 5px;
}
.searchdiv {
  width: 226px;
  height: 34px;
  border-radius: 17px;
  background: #ffffff;
  border:1px solid #ccc;
}
.fangdajing {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 7px;
  margin-left: 5px;
}
.searchinput {
  float: left;
  font-size: 13px;
  color: #999999;
  height: 32px;
  line-height: 32px;
  width: 170px;
}    
</style>