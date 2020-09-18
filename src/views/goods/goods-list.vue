<template>
    <div class="main">
        <!--搜索框-->
        <div class="searchmain" v-if="fromPageType === 1 || fromPageType === 3 || fromPageType === 4">
            <div class="searchdiv">
                <form action="/">
                    <van-search
                            :left-icon="require('../../assets/images/search.png')"
                            v-model="searchParams.keyword"
                            shape="round"
                            placeholder="请输入商品名称"
                            @search="goodsSearch"/>
                </form>
            </div>
        </div>
        <!--综合、销量、价格。。。排序分类-->
        <div class="pxdiv" v-if="fromPageType === 1 || fromPageType === 2">
            <ul class="pxul">
                <li @click="changeSalesSort(1)"
                    :class="[sortType === 1 ? 'pxworldselect':'']">
                    <!--                    class="pxworldselect"-->
                    <div class="pxworld">综合</div>
                </li>
                <li @click="changeSalesSort(2)"
                    :class="[sortType === 2 ? 'pxworldselect':'']">
                    <div class="pxworld">销量</div>
                    <div class="pxarrow">
                        <img v-show="sortNumber === 0 && sortType === 2"
                             src="../../assets/images/sxbottom.png" class="arrow">
                        <img v-show="sortNumber === 1 && sortType === 2"
                             src="../../assets/images/sxup.png" class="arrow">
                    </div>
                </li>
                <li @click="changeSalesSort(3)"
                    :class="[sortType === 3 ? 'pxworldselect':'']">
                    <div class="pxworld">价格</div>
                    <div class="pxarrow">
                        <img v-show="sortNumber === 0 && sortType === 3"
                             src="../../assets/images/sxbottom.png" class="arrow">
                        <img v-show="sortNumber === 1 && sortType === 3"
                             src="../../assets/images/sxup.png" class="arrow">
                    </div>
                </li>
                <li @click="sx">
                    <div class="pxworld">筛选</div>
                </li>
            </ul>
        </div>

        <!--首页过来的 品牌分类-->
        <div class="vantabdiv" v-if="fromPageType === 1">
            <van-tabs @change="changeSearchMenu">
                <van-tab v-for="item in searchBanner" :title='item.title'></van-tab>
            </van-tabs>
        </div>

        <!--京东、品多多搜索分类-->
        <!--        <div class="pxdiv" v-if="fromPageType === 3 || fromPageType === 4">-->
        <!--            <ul class="pxul">-->
        <!--                &lt;!&ndash;                :class="[sortType === 1 ? 'pxworldselect':'']"&ndash;&gt;-->
        <!--                <li class="pxworldselect">-->
        <!--                    <div class="pxworld">优惠力度</div>-->
        <!--                </li>-->
        <!--                <li>-->
        <!--                    <div class="pxworld">价格区间</div>-->
        <!--                </li>-->
        <!--                &lt;!&ndash;                <li @click="sx">&ndash;&gt;-->
        <!--                &lt;!&ndash;                    <div class="pxworld">筛选</div>&ndash;&gt;-->
        <!--                &lt;!&ndash;                </li>&ndash;&gt;-->
        <!--            </ul>-->
        <!--        </div>-->


        <!--搜索 商品列表-->
        <div class="goodsList">
            <!-- 首页搜索商品-->
            <SearchListRow :searchListData="searchData"
                           :searchParams="searchParams"
                           :loadStatus="loadStatus"
                           @sendPage="changePage"
                           v-if="fromPageType === 1"
            ></SearchListRow>
            <!--生鲜搜索 商品-->
            <FreshListRow :searchListData="searchData"
                          :searchParams="freshParams"
                          :loadStatus="loadStatus"
                          @sendPage="changePage"
                          v-if="fromPageType === 2"></FreshListRow>
            <!--京东、拼多多搜索列表-->
            <ProductList :searchListData="searchData"
                         :searchParams="jdPddParams"
                         :loadStatus="loadStatus"
                         @sendPage="changePage"
                         :pageType="fromPageType"
                         v-if="fromPageType === 3 || fromPageType === 4"></ProductList>
        </div>


        <!-- 筛选 -->
        <transition name="fade">
            <div v-show="showSx">
                <div class="grey" @click.prevent="closesx"></div>
                <div class="shuaixuandiv">
                    <div class="sxmain">
                        <div style="height:200px">1</div>
                        <div style="height:50px">2</div>
                        <div style="height:50px">3</div>
                        <div style="height:50px">4</div>
                        <div style="height:50px">5</div>
                        <div style="height:50px">6</div>
                        <div style="height:50px">7</div>
                        <div style="height:50px">8</div>
                        <div style="height:50px">9</div>
                        <div style="height:50px">0</div>
                        <div style="height:50px">11</div>
                    </div>
                    <div class="bottombtn">
                        <div class="sxreset">重置</div>
                        <div class="sxenter" @click="enterslect">确定</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Tab, Tabs, List, Cell, Search, Toast} from 'vant';
    import SearchListRow from '@/component/Goods/searchListRow';
    import FreshListRow from '@/component/Goods/freshListRow';
    import ProductList from '@/component/Goods/productList';
    import {newEndSearchData, freshSearch, jdSearch, pddSearch} from '@/services/api';

    Vue.use(Tab).use(Tabs).use(List).use(Cell).use(Search).use(Toast);
    export default {
        data() {
            return {
                showSx: false,
                searchData: [],//搜索数据
                searchBanner: [],//首页搜索过来tab 品牌名称
                searchParams: {//首页搜索参数
                    sorttype: 1,
                    sort: 0,
                    channelId: 'all',
                    mid: '174442',
                    keyword: '',
                    isCoupon: 0,
                    page: 1,
                    pageSize: 10
                },
                freshParams: {//生鲜\日用家居\美妆个护搜索参数
                    sorttype: 1,// 1 综合 2销量 3价格
                    sort: 0,
                    channelId: 'all',
                    keyword: '',
                    page: 1,
                    pageSize: 10,
                    // minprice:0,//最低价
                    // maxprice:100, //最高价
                    // brandId:0000,//品牌id
                    // categoryThreeId:00000,//分类三级id
                },
                jdPddParams: {//京东\拼多多搜索参数
                    keyword: '',
                    page: 1,
                    pageSize: 10,
                },
                loadStatus: {//加载状态/翻页
                    loading: false,
                    finished: false,
                    error: false,
                },
                fromPageType: 0,//来自传参的页面
                sortType: 1,//默认搜索类型
                sortNumber: 0,//默认搜索方式
            }
        },
        components: {
            SearchListRow,
            FreshListRow,
            ProductList
        },
        methods: {

            sx() {
                this.showSx = true;
            },
            closesx() {
                this.showSx = false;
            },
            enterslect() {

            },
            // backLastPage(val) {
            //     val === -1 ? this.$router.back(-1) : this.$router.push(val);
            // },

            changePage(e) {
                switch (this.fromPageType) {
                    case 1:
                        this.searchParams.page = e.nowPage;//首页搜索传过来
                        this.newSearch();
                        break;
                    case 2:
                        this.freshParams.page = e.nowPage;//生鲜搜索\日用家居\美妆个护 搜索传过来
                        this.newFreshSearch();
                        break;
                    case 3:
                        this.jdPddParams.page = e.nowPage;//京东主页搜索传过来
                        this.jdPddProductSearch();
                        break;
                    case 4:
                        this.jdPddParams.page = e.nowPage;//拼多多主页搜索传过来
                        this.jdPddProductSearch();
                        break;
                }
            },

            //首页过来的搜索
            newSearch() {
                newEndSearchData(this.searchParams).then(res => {
                    if (res.code == 200) {
                        this.searchBanner = res.data.menu;
                        this.loadStatus.loading = false;
                        if (res.data.doc.length < 1 || !res.data.doc) {
                            this.loadStatus.finished = true;
                            return
                        } else {
                            this.searchData = this.searchData.concat(res.data.doc);
                        }
                    }
                }).catch(error => {
                    // console.log(error);
                    this.loadStatus.error = true;
                }).finally(() => {
                    this.loadStatus.loading = false;
                })
            },
            //tab切换【仅当首页过来的搜索】
            changeSearchMenu(index) {
                this.searchParams.channelId = this.searchBanner[index].channelid;
                this.searchParams.page = 1;
                this.searchData = [];
                this.newSearch();
            },

            //搜索框输入关键字搜索【当首页过来 或 京东、拼多多过来】
            goodsSearch(val) {
                //存储搜索历史_丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅___________
                const newKeyList = JSON.parse(window.localStorage.getItem('searchHistoryKey'));
                this.searchHistoryList = newKeyList.length >= 1 ? newKeyList : [];
                if (this.searchHistoryList.indexOf(val) < 0) {
                    this.searchHistoryList.unshift(val);
                    let localObj = JSON.stringify(this.searchHistoryList);
                    window.localStorage.setItem('searchHistoryKey', localObj)
                }
                //存储搜索历史_丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄___________
                // console.log(val);
                if (val.trim() && (this.fromPageType === 1)) {
                    this.searchParams.keyword = val;
                    this.searchParams.page = 1;
                    this.searchData = [];
                    this.newSearch();
                } else if (val.trim() && (this.fromPageType === 3 || (this.fromPageType === 4))) {
                    this.jdPddParams.keyword = val;
                    this.jdPddParams.page = 1;
                    this.searchData = [];
                    this.jdPddProductSearch();
                }
            },

            //生鲜列表搜索
            newFreshSearch() {
                freshSearch(this.freshParams).then(res => {
                    if (res.code == 200) {
                        this.loadStatus.loading = false;
                        if (res.data.doc.length < 1 || !res.data.doc) {
                            this.loadStatus.finished = true;
                            return
                        } else {
                            this.searchData = this.searchData.concat(res.data.doc);
                        }
                    }
                }).catch(error => {
                    // console.log(error);
                    this.loadStatus.error = true;
                }).finally(() => {
                    this.loadStatus.loading = false;
                })
            },

            //京东拼多多列表搜索
            jdPddProductSearch() {
                (this.fromPageType == 3 ? jdSearch(this.jdPddParams) : pddSearch(this.jdPddParams)).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.loadStatus.loading = false;
                        if (res.data.length < 1 || !res.data) {
                            this.loadStatus.finished = true;
                            return
                        } else {
                            this.searchData = this.searchData.concat(res.data);
                            // console.log(this.searchData);
                            // 【优惠卷】数据问题 做的判断
                            this.searchData.forEach(ele => {
                                if (this.fromPageType == 3) {
                                    if (ele.coupon.discount) {
                                        ele.discount = ele.coupon.discount
                                    } else {
                                        ele.discount = 0;
                                    }
                                } else if (this.fromPageType == 4) {
                                    if (ele.coupon.length >= 1) {
                                        if (ele.coupon[0].coupon_discount) {
                                            ele.discount = ele.coupon[0].coupon_discount
                                        } else {
                                            ele.discount = 0;
                                        }
                                    } else {
                                        ele.discount = 0;
                                    }
                                }
                            })
                            // console.log(this.searchData);
                        }
                    }
                }).catch(error => {
                    // console.log(error);
                    this.loadStatus.error = true;
                }).finally(() => {
                    this.loadStatus.loading = false;
                })
            },


            //综合、销量、价格排序【首页过来的搜索、生鲜过来的搜索】
            changeSalesSort(val) {
                this.newParams = this.fromPageType === 1 ? this.searchParams : (this.fromPageType === 2 ? this.freshParams : {})
                if (val == 1) {
                    if (this.newParams.sorttype == 1) {
                        return
                    } else {
                        this.newParams.sort = 0;
                        this.newParams.sorttype = 1;
                    }
                } else if (val == this.newParams.sorttype) {
                    this.newParams.sort = this.newParams.sort == 0 ? 1 : 0;
                } else {
                    this.newParams.sorttype = val;
                }
                this.searchData = [];
                if (this.fromPageType === 1) {
                    this.searchParams.sorttype = this.sortType = this.newParams.sorttype;
                    this.searchParams.sort = this.sortNumber = this.newParams.sort;
                    this.searchParams.page = 1;
                    this.newSearch()
                } else if (this.fromPageType === 2) {
                    this.freshParams.sorttype = this.sortType = this.newParams.sorttype;
                    this.freshParams.sort = this.sortNumber = this.newParams.sort;
                    this.freshParams.page = 1;
                    this.newFreshSearch()
                }
            }
        },


        created() {
            this.searchParams.keyword = this.$route.query.searchKeyword;
            this.freshParams.keyword = this.$route.query.searchKeyword;
            this.jdPddParams.keyword = this.$route.query.searchKeyword;

            //判断传参页面
            switch (this.$route.query.fromPage) {
                case 'goodsSearch':
                    this.fromPageType = 1;//首页搜索传过来
                    this.newSearch();
                    break;
                case 'fresh':
                    this.fromPageType = 2;//生鲜搜索
                    this.newFreshSearch()
                    break;
                case 'house':
                    this.fromPageType = 2;//日用家居
                    this.newFreshSearch()
                    break;
                case 'beauty':
                    this.fromPageType = 2;//美妆个护
                    this.newFreshSearch()
                    break;
                case 'jdList':
                    this.fromPageType = 3;//京东搜索传过来
                    this.jdPddProductSearch();
                    break;
                case 'pddList':
                    this.fromPageType = 4;//拼多多搜索传过来
                    this.jdPddProductSearch();
                    break;
            }
        },
        beforeMount() {
            let newTitle = this.$route.query.searchKeyword;
            document.title = newTitle ? newTitle : '商品列表';
        },
        mounted() {


        }
    }
</script>
<style lang="less" scoped>
    .main {
        background: #F6F6F6;
    }

    .searchmain {
        background: #ffffff;
        padding: 10px 14px;
    }

    .searchdiv {
        width: 350px;
        height: 34px;
        /*border-radius: 17px;*/
        /*background: #F0F2F5;*/
        /*background-color: firebrick;*/

        .van-search {
            position: absolute;
            left: 50%;
            /*top:5px;*/
            transform: translateX(-50%);
            width: 300px;
            padding: 0;
            background-color: #fff;
            /*background-color: red;*/
        }
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
        height: 34px;
        line-height: 34px;
        width: 300px;
        background: #F0F2F5;
    }

    .vantabdiv {
        background: #ffffff;
        padding-top: 12px;
    }

    .pxdiv {
        background: #ffffff;
        padding-top: 5px;
    }

    .pxul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-bottom: 10px;
        margin-bottom: 1px;
    }

    .pxul li {
        position: relative;
        width: 100%;
        font-size: 16px;
        color: #141414;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .pxul li.pxworldselect {
        color: #FF001C;
        transition: all 1s;
    }

    .pxul li.pxworldselect::after {
        position: absolute;
        content: "";
        height: 2px;
        background: #FF001C;
        width: 100%;
        left: 0;
        bottom: -10px;
        transition: all 1s ease;
        /*animation:0.1s linear silde;*/
    }


    .pxarrow {
        width: 12px;
        height: 16px;
        margin-left: 2px;
    }


    /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border: none;
    }

    /deep/ .van-tabs--line .van-tabs__wrap {
        height: 40px;
    }

    /deep/ .van-tabs__nav--line {
        height: 30px;
        padding: 0 7px;
    }

    /deep/ .van-tab {
        width: 80px;
        height: 26px;
        border-radius: 15px;
        font-size: 15px;
        color: #141414;
        display: inline-block;
        line-height: 26px;
    }

    /deep/ .van-tab--active {
        background: #FF001C;
        color: #ffffff;
    }

    /deep/ .van-tabs__line {
        display: none;
    }

    .goodsList {
        margin-top: 10px;
        width: 375px;
    }

    // 筛选
    .grey {
        background: rgba(0, 0, 0, .6);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .shuaixuandiv {
        width: 280px;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 2;
        background: #ffffff;
        height: 100%;
    }

    .sxmain {
        height: 100%;
        overflow: scroll;
        padding-bottom: 90px;
    }

    .bottombtn {
        position: absolute;
        bottom: 0;
        height: 70px;
        background: #fff;
    }

    .sxreset {
        width: 90px;
        height: 60px;
        border-bottom: 1px solid black;
        line-height: 60px;
        text-align: center;
        color: black;
        font-size: 16px;
        margin-left: 30px;
        float: left;
    }

    .sxenter {
        height: 60px;
        width: 90px;
        color: #fff;
        background: #ED2E2E;
        border-radius: 4px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        margin-left: 30px;
        float: left;
    }
</style>