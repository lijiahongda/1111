<template>
  <div class="login_content">
    <div class="login_headimg">
      <img
        src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-19/21/yuelvhui6MUyy0Ka1g1597842033.png"
      />
    </div>
    <div class="login_box_content">
      <!-- <div class="login_banner">
        <img v-if="xavatar" :src="xavatar" />
        <div v-if="xphonenum" class="ban_phone">邀请人:{{xphonenum}}</div>
        <div v-if="codeNumber" class="ban_phone" style="font-size:12px;">邀请码:{{codeNumber}}</div>
      </div> -->
      <van-form class="login_box">
        <!-- 手机+验证码 -->
        <div class="put_box" v-if="resType==1||resType==4">
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
            <button class="vCodeBtn" :disabled="isCodeBtn" @click="vCodeBtn">{{innerText}}</button>
          </div>
        </div>
        <!-- 邮箱+密码 -->
        <div class="put_box" v-if="resType==2">
          <div class="input_box">
            <span class="icon_int">
              <img
                src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhuiRt2CzEMeIT1597023313.png"
              />
            </span>
            <van-field
              v-model="email_num"
              size="large"
              autofocus="true"
              center
              placeholder="请输入邮箱"
            />
          </div>
          <div class="input_box">
            <span class="icon_int">
              <img
                src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhuiJ9hAcuPcc81597023107.png"
              />
            </span>
            <van-field
              v-model="email_password"
              size="large"
              autofocus="true"
              center
              placeholder="请输入邮箱密码"
            />
          </div>
        </div>
        <!-- 邮箱+验证码 -->
        <div class="put_box" v-if="resType==3">
          <div>已发送邮件到{{email_num}}请注意查收</div>
          <div class="input_box">
            <span class="icon_int">
              <img
                src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhuiRt2CzEMeIT1597023313.png"
              />
            </span>
            <van-field
              v-model="email_num"
              size="large"
              autofocus="true"
              center
              placeholder="请输入邮箱"
            />
          </div>
          <div class="input_box">
            <span class="icon_int">
              <img
                src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/09/yuelvhuiAb5j3L7Ny71597023484.png"
              />
            </span>
            <van-field v-model="email_code" maxlength="6" center clearable placeholder="请输入邮箱验证码" />
            <button class="vCodeBtn" :disabled="isMCodeBtn" @click="vBCodeBtn">{{MinnerText}}</button>
          </div>
        </div>
        <div style="margin-top:20px;">
          <van-button block round color="#F7263C" v-if="resType==1" @click="onSublime()">注册领取50元</van-button>
          <van-button block round color="#F7263C" v-if="resType==2" @click="vBCodeBtn()">注册领取50元</van-button>
          <van-button block round color="#F7263C" v-if="resType==3" @click="onSublimeMail()">登录</van-button>
          <van-button block round color="#F7263C" v-if="resType==4">绑定注册</van-button>
          <div class="ybtn" v-if="resType==4" @click="editBind()">稍后绑定,跳过</div>
          <div class="ybtn" v-if="resType==1" @click="checkEmail()">邮箱注册</div>
          <div class="ybtn" v-if="resType==2" @click="checkPhone()">手机注册</div>
        </div>
        <div class="yu_over" v-if="resType==4">稍后可在'悦淘App-我的-完善信息'中绑定</div>
        <div class="yu_over" v-if="resType==1">
          <span>没有收到验证码?</span>
          <span style=" color:#F7263C;" @click="hiSiri()">使用语音验证</span>
        </div>
      </van-form>
    </div>
    <div id="c1"></div>
    <div id="c2"></div>
    <div class="brew_box" v-if="isDingxiang"></div>
    <!-- 提示语音验证 -->
    <div class="dialog" v-show="isDialog">
      <div class="novicon">
        <h1>{{Mlistmsg.title}}</h1>
        <div class="text" v-html="Mlistmsg.wapContent"></div>
        <div class="btn">
          <span @click="closeVoiceMessage">关闭</span>
          <span class="col" @click="openVoiceMessage">接听语音验证码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field, Button, Toast } from "vant";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
import {
  getshowTip,
  sendNewByWeChat,
  sendSmsCode,
  isCheckUserRegister,
  verifyAndRegister,
  MemberInfo,
  voiceSendTips,
  sendVoiceVerifyCode,
  smsRegister,
} from "../../services/userApi";
export default {
  name: "sharelogin",
  data() {
    return {
      isDingxiang: false, //顶象模拟蒙层
      xphonenum: "", //xx手机号
      xavatar: "",
      phone_num: "", //手机号
      phone_code: "", //验证码
      email_code: "", //验证码
      areaCode: "86", //区域码
      code_num: "", //邀请码
      email_num: "", //邮箱号
      email_password: "", //邮箱密码
      email_phonenum: "", //绑定手机号
      email_phonecode: "", //绑定验证码
      //手机获取验证码
      isCodeBtn: false,
      wait: 59, //倒计时
      innerText: "获取验证码",
      //邮箱获取验证码
      isMCodeBtn: false,
      Mwait: 59, //倒计时
      MinnerText: "重新发送",
      Mlistmsg: "", //语音消息
      isDialog: false,
      myCaptcha: "", //顶象验证
      myCaptchaToken: "", //滑块token
      myCaptchaMail: "", //顶象验证
      myCaptchamailToken: "", //滑块token
      codeNumber: "", //邀请码
      openId: "", //微信静默授权openid
      resType: 1, //注册类型 1手机验证码 2 邮箱
    };
  },
  created() {
    let _codeNumber = this.$route.query.codeNumber;
    this.codeNumber = _codeNumber;
    let _mobile = this.$route.query.mobile;
    this.phone_num = _mobile;
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
      this.wxlogin();
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
    _self.myCaptchaMail = _dx.Captcha(document.getElementById("c2"), {
      appId: "22670a97d0ee5e5621e76ad732effce9",
      success: function (token) {
        _self.myCaptchamailToken = token;
        _self.voiceMessageAjax();
        _self.myCaptchaMail.hide();
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
    // 获取邀请人信息
    getTip() {
      let _self = this;
      getshowTip(_self.codeNumber).then((res) => {
        if (res.code == 200) {
          _self.xphonenum = res.data.nickName;
          _self.xavatar = res.data.headimgurl;
        } else {
          Toast(res.msg);
        }
      });
    },
    checkPhone() {
      this.resType = 1;
    },
    checkEmail() {
      this.resType = 2;
    },
    //手机注册验证码
    vCodeBtn() {
      let _self = this;
      let _phone = _self.phone_num;
      let phoneReg = /^1\d{10}$/;
      if (!_phone || !phoneReg.test(_phone)) {
        Toast("请输入有效的手机号码！");
        return false;
      } else {
        _self.lisCheckUserRegister();
      }
    },
    //邮箱注册验证码
    vBCodeBtn() {
      console.log(11111);
      let _self = this;
      let _email = _self.email_num;
      let emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (!_email || !emailReg.test(_email)) {
        Toast("请输入有效的邮箱！");
        return false;
      } else {
        _self.lsendSmsCode();
      }
    },
    //语音验证码
    hiSiri() {
      let _self = this;
      let _phone = _self.phone_num;
      let phoneReg = /^1\d{10}$/;
      if (!_phone || !phoneReg.test(_phone)) {
        Toast("请输入有效的手机号码！");
        return false;
      } else {
        let e = "siri";
        _self.lisCheckUserRegister(e);
      }
    },
    //手机验证码倒计时
    sTime() {
      let _self = this;
      if (_self.wait == 0) {
        _self.myCaptchaToken = "";
        _self.myCaptchamailToken = "";
        _self.myCaptcha.reload();
        _self.myCaptchaMail.reload();
        _self.innerText = "获取验证码";
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
    //邮箱验证码倒计时
    sMTime() {
      let _self = this;
      if (_self.Mwait == 0) {
        _self.MinnerText = "重新发送";
        _self.Mwait = 59;
        _self.isMCodeBtn = false;
      } else {
        _self.MinnerText = _self.Mwait + "s后再发";
        _self.isMCodeBtn = true;
        _self.Mwait--;
        setTimeout(function () {
          _self.sMTime();
        }, 1000);
      }
    },
    //获取语音验证码内容
    voiceSendTips() {
      let _self = this;
      voiceSendTips({}).then((res) => {
        console.log(res);
        if (res.code == 200) {
          _self.Mlistmsg = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    // 关闭语音验证码
    closeVoiceMessage() {
      this.isDialog = false;
    },
    //打开语音验证
    openVoiceMessage() {
      if (this.innerText == "获取验证码") {
        this.isDialog = false;
        this.wait == 59;
        this.myCaptchaMail.show();
        this.isDingxiang = true;
      } else {
        Toast("验证码已发送,请注意查收");
        this.isDialog = false;
      }
    },
    //语音验证码
    voiceMessageAjax() {
      let _self = this;
      let params = {
        mobile: _self.phone_num,
        token: _self.myCaptchamailToken, //是否添加该字段
        areaCode: "86",
      };
      sendVoiceVerifyCode(params).then((res) => {
        console.log(res);
        _self.sTime();
      });
    },
    // 手机获取验证码
    lsendNewByWeChat() {
      let _self = this;
      let params = {
        mobile: _self.phone_num,
        invitationCode: _self.codeNumber,
        areaCode: _self.areaCode,
        myCaptchaToken: _self.myCaptchaToken,
      };
      sendNewByWeChat(params).then((res) => {
        if (res.code == 200) {
          _self.sTime();
        } else {
          Toast(res.msg);
        }
      });
    },
    // 邮箱获取验证码
    lsendSmsCode() {
      let _self = this;
      let params = {
        email_address: _self.email_num,
        type: "Register",
        invitationCode: _self.codeNumber,
      };
      sendSmsCode(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          Toast("邮件发送成功,请注意查收");
          _self.resType = 3;
          _self.sMTime();
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
    //判断是否是老用户
    lisCheckUserRegister(e) {
      let _self = this;
      let params = {
        mobile: _self.phone_num,
      };
      isCheckUserRegister(params).then((res) => {
        if (res.code == 200) {
          if (res.data.status == 1) {
            Toast("你已经是注册VIP会员,正在为你跳转首页");
            _self.$router.push({ path: "/" });
          } else {
            if (e == "siri") {
              _self.isDialog = true;
              _self.voiceSendTips();
            } else {
              _self.wait == 59;
              _self.myCaptcha.show();
              _self.isDingxiang = true;
            }
            // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            //   window.open("CnSellersApp://"); //ios app协议
            //   window.setTimeout(function () {
            //     window.location.href =
            //       "https://apps.apple.com/cn/app/%E6%82%A6%E6%97%85%E4%BC%9A/id1460325408";
            //   }, 3000);
            // }
            // if (navigator.userAgent.match(/android/i)) {
            //   window.open("sellingworldapp://"); //android app协议
            //   window.setTimeout(function () {
            //     window.location.href =
            //       "https://a.app.qq.com/o/simple.jsp?pkgname=com.newHuanQiuYueLv.www&from=singlemessage"; // 下载地址
            //   }, 3000);
            // }
          }
        } else {
          Toast(res.msg);
        }
      });
    },
    //手机验证码注册
    onSublime() {
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
          sessionStorage.setItem("verifyCode", _self.phone_code);
          MemberInfo().then((res) => {
            localStorage.setItem("userarvr", res.data.avatar);
            localStorage.setItem("headImg", res.data.avatar);
            localStorage.setItem("username", res.data.name);
            localStorage.setItem("levelText", res.data.levelText);
            localStorage.setItem("codeFand", res.data.reCode);
          });
          _self.$router.push({
            path: "/slogin",
            query: {
              codeNumber: _self.codeNumber,
              mobile: _self.phone_num,
              EsMcode: _self.phone_code,
              type: 1,
            },
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    //邮箱验证码注册
    onSublimeMail() {
      let _self = this;
      let params = {
        email_address: _self.email_num,
        password: _self.email_password,
        smsCode: _self.email_code,
        codeNumber: _self.codeNumber,
        type: 147,
      };
      smsRegister(params).then((res) => {
        if (res.code == 200) {
          localStorage.setItem("uid", res.id);
          localStorage.setItem("token", res.token);
          localStorage.setItem("openid", res.openid);
          localStorage.setItem("md5Id", res.md5Id);
          localStorage.setItem("recode", res.recode);
          localStorage.setItem("nickname", res.nickname);
          sessionStorage.setItem("verifyCode", _self.phone_code);
          MemberInfo().then((res) => {
            localStorage.setItem("userarvr", res.data.avatar);
            localStorage.setItem("headImg", res.data.avatar);
            localStorage.setItem("username", res.data.name);
            localStorage.setItem("levelText", res.data.levelText);
            localStorage.setItem("codeFand", res.data.reCode);
          });
          _self.$router.push({
            path: "/slogin",
            query: {
              codeNumber: _self.codeNumber,
              email_address: _self.email_num,
              password: _self.email_password,
              sMsCode: _self.email_code,
              type: 2,
            },
          });
        } else {
          Toast(res.msg);
        }
      });
      console.log(params);
      _self.resType = 4;
    },
    // 绑定注册
    bindMail() {
      let _self = this;
      let params = {
        mid: localStorage.getItem("mid"),
        mobile: _self.phone_num,
        sendCode: _self.phone_code,
      };
      bindMobile(params).then((res) => {
        if (res.code == 200) {
          _self.$router.replace({
            path: "/slogin",
            query: {
              codeNumber: _self.codeNumber,
              mobile: _self.phone_num,
              type: 1,
              EsMcode: _self.phone_code,
            },
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    //稍后绑定
    editBind() {
      let _self = this;
      _self.$router.replace({
        path: "/slogin",
        query: {
          email_address: _self.email_num,
          password: _self.email_password,
          sMsCode: _self.email_code,
          type: 2,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_content {
  .login_headimg {
    width: 100%;
    height: 160px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  width: 100%;
  height: auto;
  overflow: auto;
  background: #f8f8f8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login_box_content {
    width: 90%;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 auto;
    .login_banner {
      padding-top: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .ban_phone {
        line-height: 20px;
        color: #000;
        font-size: 15px;
      }
    }
    .put_box {
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
        }
      }
    }
    .news {
      width: 100%;
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 5px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
      }
      .news_txt {
        margin-left: 10px;
      }
    }
    .login_box {
      width: 80%;
      overflow: auto;
      height: auto;
      margin: 0 auto;
    }

    .yu_over {
      line-height: 20px;
      margin-bottom: 15px;
    }
    .ybtn {
      line-height: 40px;
      color: #f7263c;
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #f7263c;
      margin-top: 5px;
      margin-bottom: 20px;
    }
  }
}
.dialog {
  background: #000;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  .novicon {
    width: 80%;
    margin: auto;
    background: #fff;
    border-radius: 0.2rem;
    margin-top: 28%;
    h1 {
      text-align: center;
      font-size: 18px;
      color: #000;
      padding-top: 0.48rem;
    }

    .text {
      padding: 0.37rem;
      font-size: 14px;
      line-height: 20px;
      color: #8f8f8f;
      text-align: left;
    }

    .btn {
      font-size: 18px;
      color: #444;
      padding: 0.52rem 0;
      display: flex;
      border-top: 1px solid #e6e6e6;
      span {
        flex: 1;
        text-align: center;
      }

      .col {
        color: #f7263c;
        border-left: 1px solid #e6e6e6;
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

//强改
/deep/ .van-field__control {
  height: 30px;
  font-size: 15px;
}
/deep/ .van-field__label {
  width: auto;
}
</style>