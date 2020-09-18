<template>
  <div class="login_content">
    <div class="login_banner">
      <img
        src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-23/15/yuelvhuiW3VR6db0OH1595489947.png"
        alt
      />
    </div>
    <van-form class="login_box">
      <!-- <van-field
        v-model="phone_num"
        label="+86"
        left-icon="arrow-down"
        size="large"
        autofocus="true"
        center
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="phone_code"
        maxlength="6"
        input-align="center"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            color="linear-gradient(to right, #FF894F, #FF6863)"
            @click="vCodeBtn"
            :disabled="isCodeBtn"
          >{{ innerText }}</van-button>
        </template>
      </van-field>-->
      <!-- 手机+验证码 -->
      <div class="put_box">
        <div class="input_box">
          <span class="icon_int">
            <img
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhui6sroFnej2p1597023025.png"
            />
          </span>
          <van-field
            v-model="phone_num"
            size="large"
            autofocus="true"
            center
            placeholder="请输入手机号码"
          />
        </div>
        <div class="input_box">
          <span class="icon_int">
            <img
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhuiAb5j3L7Ny71597023484.png"
            />
          </span>
          <van-field v-model="phone_code" maxlength="6" center clearable placeholder="请输入短信验证码" />
          <button class="vCodeBtn" :disabled="isCodeBtn" @click.stop="vCodeBtn">{{innerText}}</button>
        </div>
      </div>
      <div style="margin-top:40px;">
        <van-button block round color="#F7263C" @click="onSublime">登录</van-button>
      </div>
    </van-form>
    <div id="c1"></div>
    <div class="brew_box" v-if="isDingxiang"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field, Button, Toast } from "vant";
Vue.use(Form).use(Field).use(Button).use(Toast);
import {
  sendNewByWeChat,
  isCheckUserRegister,
  verifyAndRegister,
  getWxAppId,
  getCodeByOpenid,
  MemberInfo,
} from "../../services/userApi";
export default {
  data() {
    return {
      isDingxiang: false, //顶象模拟蒙层
      phone_num: "", //手机号
      phone_code: "", //验证码
      areaCode: "86", //区域码
      code_num: "", //邀请码
      openId: "", //微信静默授权openid
      //获取验证码
      isCodeBtn: false,
      wait: 59, //倒计时
      innerText: "获取验证码",
      myCaptcha: "", //顶象验证
      myCaptchaToken: "", //滑块token
      codeNumber: "0", //邀请码
    };
  },
  created() {
    this.codeNumber = this.$route.query.codeNumber || "";
    let ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.wxlogin(); //在微信中打开
    } else {
      Toast("请在微信浏览器中打开,否则会影响你的使用体验");
    }
  },
  mounted() {
    let _self = this;
    //实例化顶象无感验证
    _self.myCaptcha = _dx.Captcha(document.getElementById("c1"), {
      appId: "22670a97d0ee5e5621e76ad732effce9",
      success: function (token) {
        _self.myCaptchaToken = token;
        _self.lsendNewByWeChat();
        _self.myCaptcha.hide();
        _self.isDingxiang = false;
      },
      fail: function (err) {
        console.log(err);
      },
      language: localStorage.getItem("language"),
      style: "popup",
      inlineFloatPosition: "up",
    });
    _self.getTip();
  },
  methods: {
    //验证码事件绑定
    vCodeBtn: function () {
      let _self = this;
      window.scroll(0,0);
      let _phone = _self.phone_num;
      let phoneReg = /^1\d{10}$/;
      if (!_phone || !phoneReg.test(_phone)) {
        Toast("请输入有效的手机号码！");
        return false;
      } else {
        _self.lisCheckUserRegister();
      }
    },
    //验证码倒计时
    sTime() { 
      let _self = this;
      if (_self.wait == 0) {
        _self.innerText = "获取验证码";
        _self.myCaptchaToken="";
        _self.myCaptcha.reload();
        _self.wait = 59;
        _self.isCodeBtn = false;
      } else {
        _self.innerText = _self.wait + "s后再发";
        _self.isCodeBtn = true;
        _self.wait--;
        setTimeout(function () {
          _self.sTime();
        }, 1000);
      }
    },
    // 获取验证码请求
    lsendNewByWeChat() {
      let _self = this;
      let params = {
        mobile: _self.phone_num,
        invitationCode: _self.code_num,
        areaCode: _self.areaCode,
        myCaptchaToken: _self.myCaptchaToken,
      };
      sendNewByWeChat(params).then((res) => {
        if(res.code==200){
          _self.sTime();
        }else{
          Toast(res.data.messages);
          this.$router.replace({path:"/"});
        }
      });
    },
    //判断是否是老用户
    lisCheckUserRegister() {
      let _self = this;
      let params = {
        mobile: _self.phone_num,
      };
      isCheckUserRegister(params).then((res) => {
        if (res.code == 200) {
          if (res.data.status == 1) {
            _self.wait == 59;
            _self.myCaptcha.show();
            _self.isDingxiang = true;
          } else {
            _self.$router.replace({
              path: "/register",
              query: {
                mobile: _self.phone_num,
                codeNumber: _self.codeNumber,
              },
            });
          }
        } else {
        }
      });
    },
    //登录
    onSublime() {
      localStorage.clear();
      let _self = this;
      let params = {
        mobile: _self.phone_num,
        code: _self.phone_code,
        openId: _self.openId,
        codeNumber: _self.codeNumber,
        type: 147,
      };
      verifyAndRegister(params).then((res) => {
        if (res.code == 200) {
          localStorage.setItem("uid", res.id);
          localStorage.setItem("token", res.token);
          localStorage.setItem("openid", res.openid);
          localStorage.setItem("md5Id", res.md5Id);
          localStorage.setItem("recode", res.recode);
          localStorage.setItem("nickname", res.nickname);
          MemberInfo().then((res) => {
            localStorage.setItem("userarvr", res.data.avatar);
            localStorage.setItem("headImg", res.data.avatar);
            localStorage.setItem("username", res.data.name);
            localStorage.setItem("levelText", res.data.levelText);
            localStorage.setItem("codeFand", res.data.reCode);
            if (_self.$route.query.intercept == 1) {
              let url = window.sessionStorage.getItem("detailUrl");
              window.location.replace(url);
              return;
            }
            if (_self.$route.query.active == "dalibao") {
              let url = "https://web.yuetao.group/dalibao?env=2";
              window.location.replace(url);
              return;
            }
            if (_self.$route.query.active == "gaode") {
              let url = "https://web.yuetao.group/gaode";
              // window.location.replace(url);
              this.$router.replace({ path: "/gaode" });
              return;
            }
            if (_self.$route.query.code) {
              //微信授权后，会在url中添加一个code码
              _self.$router.replace({ path: "/" });
              return;
            }
            _self.$router.go(-1);
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    // 微信授权
    async wxlogin() {
      let _self = this;
      if (_self.$route.query.code) {
        let params = {
          code: _self.$route.query.code,
          type: 147,
        };
        await getCodeByOpenid(params).then((res) => {
          if (res.code == 200) {
            _self.openId = res.data.openid;
          }
        });
        return;
      } else {
        let url = _self.urlencode(window.location.href);
        await getWxAppId({ type: 147 }).then((res) => {
          if (res.code == 200) {
            let appid = res.appId;
            let scope = "snsapi_userinfo";
            let state = _self.codeNumber;
            let url = _self.urlencode(window.location.href);
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              appid +
              "&redirect_uri=" +
              url +
              "&response_type=code&scope=" +
              scope +
              "&state=" +
              state +
              "#wechat_redirect";
          }
        });
      }
    },
    // 重定向地址处理函数
    urlencode(str) {
      str = (str + "").toString();
      return encodeURIComponent(str)
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A")
        .replace(/%20/g, "+");
    },
    // 截取微信url中code
    GetUrlParam(paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login_content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  -webkit-overflow-scrolling: unset;
  .login_banner {
    width: 80px;
    margin: 60px auto 30px auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .login_box {
    overflow: auto;
    height: auto;
    margin: 0 40px;
    .put_box {
      background: #fff;
      .input_box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .icon_int {
          width: 25px;
          height: 25px;
          display: block;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .vCodeBtn {
          width: 100px;
          line-height: 35px;
          background: #ffffff;
          position: absolute;
          right: 0;
          top: 6px;
          z-index:10;
        }
      }
    }
  }
  .brew_box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: 10;
  }
}
// /deep/ .van-field__control {
//   height: 50px;
//   font-size: 16px;
// }
// /deep/ .van-field__label {
//   width: auto;
// }
</style>
