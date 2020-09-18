<template>
    <div class="main">
        <!-- <van-nav-bar
                v-if="env_rn == 99"
                title=" "
                left-text="返回"
                right-text=" "
                fixed
                :placeholder="true"
                left-arrow
                @click-left="onClickLeft"/> -->
        <van-tabs v-model="active"
                  title-active-color="#ffffff"
                  title-inactive-color="#ffffff"
                  :ellipsis="false"
                  line-width="38px"
                  background="#F7263C"
                  @change="changeTab">
            <van-tab v-for="item in bannerData.secondLevelsTypeList"
                     :title='item.categorySecondName'></van-tab>
        </van-tabs>
        <div class="screenBox">
            <div class="screenBox_price">
                <div class="priceBox" @click="getDataprice_count(4)">价格
                    <div class="arrowBox">
                        <img v-show="proParams.sorttype === 4 && proParams.sort === 0"
                             src="../../assets/images/sxbottom.png" class="arrow">
                        <img v-show="proParams.sorttype === 4 && proParams.sort === 1"
                             src="../../assets/images/sxup.png" class="arrow">
                    </div>
                </div>
            </div>
            <!--            <div class="screenBox_brand">-->
            <!--                <van-dropdown-menu>-->
            <!--                    <van-dropdown-item title="品牌" ref="brandRef">-->
            <!--                        <template>-->
            <!--                            <div class='dropdownBox'>-->
            <!--                                <div class="dropdownBox_item"-->
            <!--                                     v-if="bannerData.brandList.length > 0"-->
            <!--                                     v-for="(val,index) in bannerData.brandList"-->
            <!--                                     :style="{backgroundColor : index=== checkedIndex ? '#F7263C' : '#f2f2f2',-->
            <!--                                     color : index === checkedIndex ? '#fff' : '#000'}"-->
            <!--                                     @click="checkBrand(val,index)">-->
            <!--                                    <span>{{val.name}}</span>-->
            <!--                                </div>-->
            <!--                                <div class="whiteBox" :style="{'height':-->
            <!--                                        bannerData.brandList.length <= 4 ? '181px':-->
            <!--                                        (bannerData.brandList.length <= 8 ? '141px':-->
            <!--                                        (bannerData.brandList.length <= 12 ? '101px':''))}"></div>-->
            <!--                                <div class="btnBox" v-if="bannerData.brandList.length > 0">-->
            <!--                                    <p class="resetBrand" @click="resetBrandCheck">重置</p>-->
            <!--                                    <p class="confirmBrand" @click="confirmBrandCheck">确认</p>-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                        </template>-->
            <!--                    </van-dropdown-item>-->
            <!--                </van-dropdown-menu>-->
            <!--            </div>-->
            <div class="screenBox_count">
                <div class="countBox" @click="getDataprice_count(2)">销量
                    <div class="arrowBox">
                        <img v-show="proParams.sorttype === 2 && proParams.sort === 0"
                             src="../../assets/images/sxbottom.png" class="arrow">
                        <img v-show="proParams.sorttype === 2 && proParams.sort === 1"
                             src="../../assets/images/sxup.png" class="arrow">
                    </div>
                </div>
            </div>
        </div>
        <clothesList :dataList="mainList"
                     :dataParams="proParams"
                     @sendPage="changePage"
                     :env="env_rn"
                     v-if="mainList && proParams"></clothesList>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Tab, Tabs, List, Cell, Search, Toast, Popup, DropdownMenu, DropdownItem, NavBar} from 'vant';
    import clothesList from '@/component/Goods/clothesList';

    import {getClothesHeader, getClothesMain} from '@/services/clothes';

    Vue.use(Tab).use(Tabs).use(List).use(Cell).use(Search).use(Toast).use(Popup).use(DropdownMenu).use(DropdownItem).use(NavBar);
    export default {
        name: 'clothes',
        data() {
            return {
                mainList: [],
                bannerData: {},
                active: 0,
                checkedIndex: -1,//选中的品牌下标
                env_rn:'',//判断访问终端
                proParams: {
                    keyword: '',
                    page: 1,
                    pageSize: 10,
                    sort: 1,//排序   0、1 0降序
                    sorttype: 4,//排序种类  1、品牌，2销量，4价格
                    // brandId: '',//品牌id,
                    categoryFirstId: '',
                    categorySecondId: '',
                    loading: false,
                    finished: false,
                    error: false,
                },

                // testData: [],//测试假数据


            }
        },
        components: {
            clothesList
        },
        methods: {
            onClickLeft() {
                // Toast('返回');
                window.history.go(-1);
            },
            // onClickRight() {
            //     // Toast('按钮');
            // },

            // //点击品牌
            // checkBrand(val, index) {
            //     this.checkedIndex = this.checkedIndex == index ? -1 : index;
            //     this.proParams.brandId = this.checkedIndex == index ? val.id : '';
            // },
            // //确认品牌选择
            // confirmBrandCheck() {
            //     console.log(this.proParams.brandId);
            //     this.$refs.brandRef.toggle();
            //     this.initSearchList();
            // },
            // //重置品牌
            // resetBrandCheck() {
            //     this.proParams.brandId = '';
            //     this.checkedIndex = -1;
            //     this.$refs.brandRef.toggle();
            //     this.initSearchList()
            // },

            //改变页码-子组件
            changePage(e) {
                this.proParams.page = e.nowPage;
                this.getMainContent();
            },

            //切换tab
            changeTab(index, name, title) {
                // console.log(index, name, title);
                console.log(this.bannerData.secondLevelsTypeList[index].categorySecondId);
                document.title = name;
                // this.proParams.keyword = name;
                this.proParams.categoryFirstId = '';
                this.proParams.categorySecondId =this.bannerData.secondLevelsTypeList[index].categorySecondId
                this.initSearchList();
            },

            //价格\数量排序
            getDataprice_count(val) {
                console.log(val);
                this.proParams.sorttype = val;
                if (val === 2) {
                    this.proParams.sort = this.proParams.sort === 0 ? 1 : 0;
                } else {
                    this.proParams.sort = this.proParams.sort === 0 ? 1 : 0;
                }
                this.proParams.page = 1;
                this.mainList = [];
                this.getMainContent();
            },


            //初始化搜索
            initSearchList() {
                this.proParams.page = 1;
                this.proParams.sort = 1;
                this.proParams.sorttype = 4;
                this.mainList = [];
                this.getMainContent();
            },
            //获取商品列表
            getMainContent() {
                this.proParams.loading = true;
                let _params = {
                    page: this.proParams.page,
                    pageSize: this.proParams.pageSize,
                    keyword: this.proParams.keyword,
                    sort: this.proParams.sort,
                    sorttype: this.proParams.sorttype,
                    // brandId: this.proParams.brandId,
                    categoryFirstId: this.proParams.categoryFirstId,
                    categorySecondId:this.proParams.categorySecondId
                }
                getClothesMain(_params).then(res => {
                    // console.log(res);
                    if (res.data.length >= 1) {
                        this.mainList = this.mainList.concat(res.data);
                        this.proParams.loading = false;
                    } else {
                        this.proParams.finished = true;
                        this.proParams.loading = false;
                    }
                })
            },

            //获取banner信息
            getBannerData() {
                let _params = {
                    categoryFirstId: this.proParams.categoryFirstId
                }
                getClothesHeader(_params).then(res => {
                    // console.log(res);
                    this.bannerData = res.code == 200 ? res.data : {}
                })
            }

        },


        created() {

        },
        beforeMount() {
            let newTitle = this.$route.query.channelName;
            document.title = newTitle ? newTitle : '商品列表';
            // this.proParams.keyword = this.$route.query.channelName;
            this.proParams.categoryFirstId = this.$route.query.epId;
            this.env_rn = this.$route.query.env;
        },
        mounted() {
            this.getBannerData();
            this.getMainContent();
            // console.log(this.bannerData);
        }
    }
</script>
<style lang="less" scoped>
    .main {
        background: #F6F6F6;
        /*position: relative;*/
        /deep/ .van-tab--active {
            font-weight: bolder;
            font-size: 13px;
        }
        /deep/ .van-nav-bar__placeholder{
            height: 43px;
        }
        /deep/ .van-nav-bar{
            height: 43px;
        }
        /deep/ .van-nav-bar__left{
            .van-icon,.van-nav-bar__text{
                color:#333333;
            }
        }

        /deep/ .van-tabs__line {
            background-color: #fff;
            margin: 0 auto 3px auto;
        }

        /deep/ .van-tab {
            font-size: 13px;
            padding: 0 !important;
            flex-basis: 25% !important;
        }

        /deep/ .van-dropdown-menu__title {
            color: #333333;
        }

        /deep/ .van-dropdown-menu__bar {
            height: 43px;
            background-color: #fff;
            box-shadow: none;
        }

        /deep/ .van-dropdown-menu__title--active {
            color: #F7263C;
        }

        /deep/ .van-popup {

            position: relative;
        }
    }

    .tabBox {
        width: 375px;
        height: 43px;
        background: #f7263c;
    }

    .screenBox {
        width: 375px;
        height: 43px;
        background: #ffffff;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        color: #333333;

        .priceBox, .countBox {
            width: 55px;
            height: 43px;
            line-height: 43px;
            position: relative;

            .arrowBox {
                position: absolute;
                width: 12px;
                height: 16px;
                top: 3px;
                left: 47px;
            }
        }
    }

    .dropdownBox {
        width: calc(100% - 28px);
        min-height: 100px;
        max-height: 221px;
        /*overflow-y: auto;*/
        background-color: white;
        /*background-color: darkgoldenrod;*/
        display: flex;
        flex-wrap: wrap;
        /*margin: 0;*/
        /*padding: 0;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
        justify-content: left;
        margin: 0 14px 0;


        .dropdownBox_item {
            width: 82px;
            height: 33px;
            line-height: 33px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

            /*display: inline-block;*/
            margin-right: 6px;
            margin-bottom: 7px;
            background-color: #f2f2f2;
            font-size: 11px;
            font-family: PingFang SC Regular, PingFang SC Regular-Regular;
            font-weight: 400;
            color: #000000;
        }

        .dropdownBox_item:nth-child(4n) {
            margin-right: 0;
        }
    }

    .whiteBox {
        height: 62px;
        width: 100%;
    }

    .btnBox {
        width: calc(100% - 28px);
        display: flex;
        /*justify-content: space-around;*/
        position: fixed;
        margin-top: 160px;
        background-color: #fff;
        border-radius: 0 0 7px 7px;
        /*bottom: 0;*/
    }

    .resetBrand, .confirmBrand {
        flex: 1;
        /*width: 45%;*/
        height: 32px;
        line-height: 32px;
        border-radius: 16px;
        margin: 15px 0 14px 0;
        /*background-color: chocolate;*/
        /*background: #999999;*/
        border: 1px solid #999999;
        color: #000;
    }

    .confirmBrand {
        border: none;
        background-color: #F7263C;
        margin-left: 5px;
        color: #fff;
    }

</style>