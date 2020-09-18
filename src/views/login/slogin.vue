<template>
  <div class="slogin_content">
    <div class="slogin_second" v-if="status==1">
      <div class="slogin_title">请输入悦淘邀请码</div>
      <div class="slogin_btn">
        <van-field v-model="codeNumber" @input="isYqmDisable()" placeholder="请输入邀请码" />
        <van-button round block color="#FF6863" @click="isCodenumber()" v-if="isdisable">下一步</van-button>
        <van-button round block color="#989190" v-else disabled>下一步</van-button>
        <div class="slogin_btntxt" @click="isWuma()">暂无邀请码,绑定官方账号></div>
        <div class="slogin_btn_txt">绑定后5天可修改</div>
      </div>
    </div>

    <div class="slogin_fist" v-if="status==2">
      <div class="slogin_title">确认您的邀请人</div>
      <div class="slogin_user">
        <van-image round width="50px" height="50px" :src="xavatar" />
        <div class="slogin_name">{{xphonenum}}</div>
      </div>
      <div class="slogin_btn">
        <van-button round block color="#FF6863" @click="sure()">是的</van-button>
        <van-button
          round
          block
          style="border-color:gray;color:#000;margin-top:10px;"
          @click="nono()"
        >不是</van-button>
        <div class="slogin_btntxt">请确认您的邀请人,确认后无法修改</div>
      </div>
    </div>

    <div class="slogin_fist" v-if="status==3">
      <div class="slogin_title">确认您的邀请人</div>
      <div class="slogin_user">
        <van-image
          round
          width="50px"
          height="50px"
          src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-20/14/yuelvhui2fA7nbhDOv1595225029.png"
        />
        <div class="slogin_name">悦淘官方</div>
      </div>
      <div class="slogin_btn">
        <van-button round block color="#FF6863" @click="isThink">我再想想</van-button>
        <van-button
          round
          block
          style="border-color:gray;color:#000;margin-top:10px;"
          @click="isBang()"
        >继续绑定</van-button>
        <div class="slogin_btntxt">绑定后悦淘官方账号后,5天内可在个人中心修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios"; // 引入axios
import { Image as VanImage, Button, Field, Toast } from "vant";
Vue.use(Button);
Vue.use(VanImage);
Vue.use(Field);
import {
  getshowTip,
  memberRegister,
  smsRegister,
} from "../../services/userApi";
export default {
  data() {
    return {
      xphonenum: "", //邀请人手机号
      xavatar: "", //邀请人头像
      codeNumber: "", //邀请码
      mobile: "", //注册人手机号
      Ptype: "", //注册人手机号
      sMsCode: "", //邮箱验证码
      EsMcode: "", //手机验证码
      isdisable: false,
      status: "1",
    };
  },
  created() {
    this.codeNumber = this.$route.query.codeNumber;
    this.mobile = this.$route.query.mobile;
    this.Ptype = this.$route.query.type;
    this.sMsCode = this.$route.query.sMsCode;
    this.EsMcode = this.$route.query.EsMcode;
    this.istype = this.$route.query.type;
    this.Password = this.$route.query.password;
    this.emailAddress = this.$route.query.email_address;
  },
  mounted() {
    let _self = this;
    if (_self.codeNumber) {
      _self.isdisable = true;
      _self.isCodenumber();
    } else {
      _self.isdisable = false;
    }
  },
  methods: {
    //暂无邀请码
    isWuma() {
      this.status = 3;
    },
    //我再想想
    isThink() {
      this.status = 1;
    },
    // 确定邀请人
    isCodenumber() {
      let _self = this;
      getshowTip(_self.codeNumber).then((res) => {
        if (res.code == 200) {
          _self.xphonenum = res.data.nickName;
          _self.xavatar = res.data.headimgurl;
          // _self.status = 3;
          _self.sure();
        } else {
          Toast(res.msg);
        }
      });
    },
    // 绑定code
    sure() {
      let _self = this;
      let _code = _self.istype;
      if (_code == 1) {
        let params = {
          mobile: _self.mobile,
          verifyCode: _self.EsMcode,
          codeNumber: _self.codeNumber,
          areaCode: "+86",
          country: "中国",
        };
        // memberRegister(params).then((res) => {
        //   if (res.code == 200) {
        //     Toast("绑定成功");
        //     _self.$router.replace({ path: "/" });
        //   } else {
        //     _self.$router.replace({ path: "/" });
        //     Toast(res.msg);
        //   }
        // });
        // axios
        //   .post("https://web.yuetao.group/app/member/register", params)
        //   .then(function (response) {
        //     console.log(response);
        //     if (response.code == 200) {
        //       Toast("绑定成功");
        //       _self.$router.replace({ path: "/" });
        //     } else {
        //       Toast(response.msg);
        //     }
        //   });
        axios({
          url: "https://web.yuetao.group/app/member/register",
          method: "post",
          data: params,
          headers: {
            Authorization:
              "Sys 2001.1528204771000.ee8647b6f5b91531aa26b1b2acb9b458",
          },
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            Toast("绑定成功");
            _self.$router.replace({ path: "/" });
          } else {
            Toast(res.data.msg);
            _self.$router.replace({ path: "/" });
          }
        });
      } else {
        let params = {
          email_address: _self.emailAddress,
          password: _self.Password,
          smsCode: _self.sMsCode,
          codeNumber: _self.codeNumber,
        };
        // smsRegister(params).then((res) => {
        //   if (res.code == 200) {
        //     Toast("绑定成功");
        //     _self.$router.replace({ path: "/" });
        //   } else {
        //     // _self.$router.replace({ path: "/" });
        //     Toast(res.msg);
        //   }
        // });
        // axios
        //   .post("https://web.yuetao.group/app/auth/smsRegister", params)
        //   .then(function (response) {
        //     console.log(response);
        //     if (response.code == 200) {
        //       Toast("绑定成功");
        //       _self.$router.replace({ path: "/" });
        //     } else {
        //       Toast(response.msg);
        //     }
        //   });
        axios({
          url: "https://web.yuetao.group/app/auth/smsRegister",
          method: "post",
          data: params,
          headers: {
            Authorization:
              "Sys 2001.1528204771000.ee8647b6f5b91531aa26b1b2acb9b458",
          },
        }).then((res) => {
          if (res.data.code == 200) {
            Toast("绑定成功");
            _self.$router.replace({ path: "/" });
          } else {
            Toast(res.data.msg);
            _self.$router.replace({ path: "/" });
          }
        });
      }
    },
    // 否
    nono() {
      let _self = this;
      _self.status = 1;
    },
    // 继续绑定(跳转app)
    isBang() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        window.open("CnSellersApp://"); //ios app协议
        window.setTimeout(function () {
          window.location.href =
            "https://apps.apple.com/cn/app/%E6%82%A6%E6%97%85%E4%BC%9A/id1460325408";
        }, 3000);
      }
      if (navigator.userAgent.match(/android/i)) {
        window.open("sellingworldapp://"); //android app协议
        window.setTimeout(function () {
          window.location.href =
            "https://a.app.qq.com/o/simple.jsp?pkgname=com.newHuanQiuYueLv.www&from=singlemessage"; // 下载地址
        }, 3000);
      }
    },
    //邀请码输入事件
    isYqmDisable() {
      let _codeNumber = this.codeNumber;
      if (_codeNumber.length > 0) {
        this.isdisable = true;
      } else {
        this.isdisable = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.slogin_content {
  .slogin_fist {
    .slogin_title {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-top: 100px;
    }
    .slogin_user {
      margin-top: 30px;
      .slogin_name {
        line-height: 40px;
      }
    }
    .slogin_btn {
      width: 80%;
      margin: 20px auto;
      font-size: 20px;
      .slogin_btntxt {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .slogin_second {
    .slogin_title {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-top: 100px;
    }
    .slogin_user {
      margin-top: 30px;
      .slogin_name {
        line-height: 40px;
      }
    }
    .slogin_btn {
      width: 80%;
      margin: 20px auto;
      font-size: 20px;
      .slogin_btntxt {
        margin-top: 10px;
        font-size: 12px;
        color: #2373c7;
      }
      .slogin_btn_txt {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
}
//强改
/deep/ .van-field__control {
  border: 1px solid #e6e6e6;
  line-height: 45px;
  border-radius: 20px;
  text-align: center;
  font-size: 25px;
}
</style>