<template>
  <div class="addressList_content">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @select="onGo"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList, Toast } from "vant";
Vue.use(AddressList);
Vue.use(Toast);
import { addressH5List } from "../../services/userApi";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      type: "",
    };
  },
  mounted() {
    this.type = this.$route.query.type;
    this.getAddresslist();
  },
  methods: {
    onAdd() {
      this.$router.push({ path: "/editAddress" });
    },
    onEdit(item, index) {
      this.$router.push({ path: "/editAddress", query: item });
    },
    //选择地址跳转
    onGo(item, index) {
      item.mobile = item.tel;
      item.receiverName = item.name;
      if (this.type != 1) {
        let _address = JSON.stringify(item);
        localStorage.setItem("addressItem", _address);
        this.$router.go(-1);
      }else{
        this.$router.push({ path: "/editAddress", query: item });
      }
    },
    //获取地址列表
    getAddresslist() {
      let _self = this;
      let _uid = localStorage.getItem("uid");
      let params = {
        mid: _uid,
      };
      addressH5List(params).then((res) => {
        let _chosenAddress = res.data.filter((val) => val.isDefault == 1);
        _self.chosenAddressId = _chosenAddress[0].id;
        _self.list = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
//强改
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
  }
}
</style>