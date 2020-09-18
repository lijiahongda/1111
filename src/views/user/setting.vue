<template>
  <div class="setting_content">
    <!-- 列表 -->
    <van-cell-group>
      <van-cell title="姓名" is-link :value="userList.name" @click="nameshow = true" />
      <van-cell title="昵称" is-link :value="userList.nickName" @click="nickshow = true" />
      <!-- <van-cell title="性别" is-link @click="sexshow = true" /> -->
      <van-cell title="地址管理" is-link to="/addressList?type=1" />
      <van-cell title="退出登录" is-link @click="Logout" />
    </van-cell-group>
    <!-- 姓名 -->
    <van-popup v-model="nameshow">
      <div class="mo_box">
        <p>修改姓名</p>
        <van-field v-model="nameChage" placeholder="请输入姓名" />
        <van-button class="mo_btn" type="danger" @click="sendName">确定</van-button>
      </div>
    </van-popup>
    <!-- 昵称 -->
    <van-popup v-model="nickshow">
      <div class="mo_box">
        <p>修改昵称</p>
        <van-field v-model="nicknameChage" placeholder="请输入昵称" />
        <van-button class="mo_btn" type="danger" @click="sendnickName">确定</van-button>
      </div>
    </van-popup>
    <!-- 性别 -->
    <van-action-sheet v-model="sexshow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import Vue from "vue";
import {
  Cell,
  CellGroup,
  Toast,
  ActionSheet,
  Popup,
  Field,
  Button,
} from "vant";
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(ActionSheet);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Button);
import {
  MemberInfo,
  truename,
  nickname,
  gender,
  loginOut,
} from "../../services/userApi";
export default {
  data() {
    return {
      userList: "",
      nameshow: false,
      nameChage: "",
      nickshow: false,
      nicknameChage: "",
      sexshow: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    this.getMemberInfo();
  },
  methods: {
    //个人信息查询
    getMemberInfo() {
      let _self = this;
      MemberInfo().then((res) => {
        if (res.code == 200) {
          _self.userList = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    //更改姓名
    sendName() {
      let _self = this;
      let params = {
        name: _self.nameChage,
      };
      if (_self.nameChage) {
        truename(params).then((res) => {
          if (res.code == 200) {
            _self.getMemberInfo();
            Toast(res.msg);
            _self.nameChage = "";
            _self.nameshow = false;
          } else {
            Toast(res.msg);
          }
        });
      } else {
        Toast("不能为空");
      }
    },
    //更改昵称
    sendnickName() {
      let _self = this;
      let params = {
        name: _self.nicknameChage,
      };
      if (_self.nicknameChage) {
        nickname(params).then((res) => {
          if (res.code == 200) {
            _self.getMemberInfo();
            Toast(res.msg);
            _self.nicknameChage = "";
            _self.nickshow = false;
          } else {
            Toast(res.msg);
          }
        });
      } else {
        Toast("不能为空");
      }
    },
    //性别选择
    onSelect(item) {
      this.sexshow = false;
      Toast(item.name);
    },
    // 退出登录
    Logout() {
      localStorage.clear();
      this.$router.push("/");
      // loginOut().then(res => {
      //   if (res.data.code == 200) {
      //     Toast("退出成功");
      //     this.$router.push('/')
      //   }
      // })
    },
  },
};
</script>

<style lang="less" scoped>
.setting_content {
  text-align: left;
  .mo_box {
    width: 250px;
    height: 136px;
    text-align: center;
    p {
      font-size: 18px;
      font-weight: 600;
      line-height: 50px;
    }
  }
  .mo_btn {
    width: 100%;
  }
}
//强改
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
  }
}
/deep/ .van-popup--center {
  border-radius: 10px;
}
</style>