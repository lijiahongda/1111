<template>
  <div class="editAddress_content">
    <!-- <van-address-edit
      :address-info="AddressInfo"
      :area-list="areaList"
      show-set-default
      @save="onSave"
    />-->
    <van-cell-group>
      <van-field v-model="AddressInfo.receiverName" label="收货人" placeholder="请输入收货人" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="AddressInfo.mobile" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell-group>
      <!-- <van-cell title="地区" @click="ondirl" :value="areaCell" /> -->
      <div class="diququ">地区</div><van-cell is-link @click="showPopup">{{areaCell}}</van-cell>
      <van-popup v-model="popShow" position="bottom" :style="{ height: '60%' }">
        <van-tabs v-model="active">
          <van-tab :title="Provincelistswww">
            <div class="ads_item" v-for="(item) in Provincelists" :key="item.id" @click="addressChagea(item)">
              {{item.name}}
            </div>
          </van-tab>
          <van-tab :title="Citylistwww">
            <div class="ads_item" v-for="(item) in Citylist" :key="item.id" @click="addressChageb(item)">
              {{item.name}}
            </div>
          </van-tab>
          <van-tab :title="Arealistwww">
            <div class="ads_item" v-for="(item) in Arealist" :key="item.id" @click="addressChagec(item)">
              {{item.name}}
            </div>
          </van-tab>
        </van-tabs>
      </van-popup>
    </van-cell-group>
    <!-- <van-cell-group>
      <van-popup v-model="show" position="bottom">
        <van-area @cancel="quxaio" @confirm="areaBtn" :area-list="areaList" />
      </van-popup>
    </van-cell-group> -->
    <van-cell-group>
      <van-field
        v-model="AddressInfo.address"
        type="textarea"
        label="详细地址"
        placeholder="请输入详细地址"
        rows="1"
        autosize
      />
    </van-cell-group>
    <van-cell center title="设为默认收货地址">
      <template #right-icon>
        <van-switch v-model="AddressInfo.isDefault" size="24" />
      </template>
    </van-cell>
    <van-button style="margin-top:20px;" round type="danger" size="large" @click="onSave">保存地址</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import {
  AddressEdit,
  Toast,
  Cell,
  CellGroup,
  Field,
  Popup,
  Area,
  Switch,
  Button,
  Tab,
  Tabs
} from "vant";
Vue.use(AddressEdit);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
import province_list from "../../utils/areaList";
import { addressH5Create ,getProvince,getCity,getArea} from "../../services/userApi";
export default {
  data() {
    return {
      active:0,
      username: "",
      phone: "",
      areaCell: "选择省/市/地区",
      detailArea: "",
      show: false,
      popShow:false,
      checked: false,
      areaList: province_list,
      searchResult: [],
      Provincelists:"",//省
      Citylist:"",//市
      Arealist:"",//区
      Provincelistswww:"请选择",//省
      Citylistwww:"请选择",//市
      Arealistwww:"请选择",//区
      Provincelistsddd:"请选择",//省
      Citylistddd:"请选择",//市
      Arealistddd:"请选择",//区
      AddressInfo: {
        receiverName: "",
        address: "",
        addressId: "",
        mobile: "",
        townId: "",
        townName: "",
        proviceId: "",
        proviceName: "",
        cityId: "",
        cityName: "",
        zoneId: "",
        zoneName: "",
        isDefault: false,
        mid: localStorage.getItem("uid"),
      },
    };
  },
  mounted() {
    let _list = this.$route.query;
    console.log(_list);
    if (_list) {
      this.AddressInfo = {
        receiverName: _list.name,
        address: _list.house,
        addressId: _list.id,
        mobile: _list.tel,
        townId: _list.townId,
        townName: "",
        proviceId: _list.proviceId,
        proviceName: _list.proviceName,
        cityId: _list.cityId,
        cityName: _list.cityName,
        zoneId: _list.zoneId,
        zoneName: _list.zoneName,
        isDefault: _list.isDefault ? true : false,
      };
      this.areaCell = _list.proviceName
        ? _list.proviceName + _list.cityName + _list.zoneName
        : "选择省/市/地区";
    }
  },
  methods: {
    areaBtn() {
      this.areaCell =this.Provincelistswww + " " + this.Citylistwww + " " + this.Arealistwww;
      this.AddressInfo.proviceName = this.Provincelistswww;
      this.AddressInfo.proviceId = this.Provincelistsddd;
      this.AddressInfo.cityName = this.Citylistwww;
      this.AddressInfo.cityId = this.Citylistddd;
      this.AddressInfo.zoneName = this.Arealistwww;
      this.AddressInfo.zoneId = this.Arealistddd;
    },
    onSave() {
      let _self = this;
      let _fdata = _self.AddressInfo;
      let _uid = localStorage.getItem("uid");
      let params = {
        address: _fdata.address,
        addressId: _fdata.id ? _fdata.id : "",
        cityId: _fdata.cityId,
        cityName: _fdata.cityName,
        isDefault: _fdata.isDefault ? 1 : 0,
        mobile: _fdata.mobile,
        proviceId: _fdata.proviceId,
        proviceName: _fdata.proviceName,
        receiverName: _fdata.receiverName,
        townId: "",
        townName: "",
        zoneId: _fdata.zoneId,
        zoneName: _fdata.zoneName,
        mid: _uid,
      };
      // console.log(params);
      addressH5Create(params).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          Toast("操作成功");
          this.$router.go(-1);
        } else {
          Toast("操作失败");
        }
      });
    },
    // 查询省
    getProvincelist(){
      getProvince({}).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.Provincelists=res.data;
        }else{
          Toast(res.msg);
        }
      })
    },
    // 查询市
    getCitylist(id){
      let params = {
        province_id:id,
        page:1,
        pageSize:999
      }
      getCity(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.Citylist=res.data;
        }else{
          Toast(res.msg);
        }
      })
    },
    // 查询区
    getArealist(id){
      let params = {
        city_id:id,
        page:1,
        pageSize:999
      }
      getArea(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.Arealist=res.data;
        }else{
          Toast(res.msg);
        }
      })
    },
    //选择省
    addressChagea(item){
      this.active=1;
      this.Provincelistswww=item.name;//省
      this.Provincelistsddd=item.id;//省
      this.getCitylist(item.id);
    },
     //选择市
    addressChageb(item){
      this.active=2;
      this.Citylistwww=item.name;//市
      this.Citylistddd=item.id;//市
      this.getArealist(item.id);
    },
     //选择区
    addressChagec(item){
      this.Arealistwww=item.name;//区
      this.Arealistddd=item.id;//区
      // this.areaCell = this.Provincelistswww+this.Citylistwww+item.name;
      this.areaBtn();
      this.popShow=false;
    },
    showPopup(){
      this.getProvincelist();
      this.popShow=true;
    },
    onDelete() {
      Toast("delete");
    },
  },
};
</script>

<style lang="less" scoped>
.editAddress_content {
  padding: 0 10px;
  .diququ{
    padding-left: 18px;
    font-size: 16px;
    margin-right: 10px;
    text-align: left;
    width: 120px;
    color: #646566;
  }
  .ads_item{
    width: 100%;
    line-height: 40px;
    font-size: 18px;
    text-align: left;
    padding-left: 50px;
  }
}
//强改
/deep/ .van-cell {
  font-size: 15px;
}
/deep/ .van-cell__title {
  text-align: left;
}
/deep/ .van-cell__value {
  text-align: left;
  position: relative;
  overflow: hidden;
  color: #969799;
  vertical-align: middle;
  word-wrap: break-word;
  flex: 2;
}
/deep/ .van-cell-group{
  display: flex;
  align-items: center;
}
/deep/ .van-tab__pane{
    height: 350px;
    overflow-y: scroll;
}
</style>