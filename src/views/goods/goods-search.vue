<template>
    <div class="search-result">
        <div class="search-box">
            <div class="cancelButton" @click.prevent="backLastPage('./')">取消</div>
            <form action="/">
                <van-search
                        :left-icon="require('../../assets/images/search.png')"
                        v-model="searchValue"
                        shape="round"
                        placeholder="请输入商品名称"
                        @search="goodsSearch"/>
            </form>
        </div>


        <div class="status-box" v-show="searchHistoryList.length >=1">
            <div class="tits">
                <span>搜索历史</span>
                <div class="clearBox" @click="clearHistoryKey">
                    <img class="icon-delete" src="../../assets/images/delete.png">
                    <span class="clearName">清空</span>
                </div>
            </div>
            <div class="status">
                <span class="box" v-for="(val,i) in searchHistoryList.slice(0,10)" :key="i"
                      @click="goodsSearch(val)">{{val}}</span>
            </div>
        </div>


        <div class="status-box" v-for="(item,index) in historyData" :key="index">
            <div class="tits">{{item.categoryName}}</div>
            <div class="status">
                <span class="box" v-for="(val,i) in item.keyChild" :key="i">
<!--                    <img class="icon-hot" src="../../assets/images/icon-hot.png">-->
                    <img class="icon-hot" :src="val.img" alt="" v-if="val.img">
                    <span @click="goodsSearch(val.keyword)">{{val.keyword}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Search} from 'vant';
    import {goodsSearchHistory} from '@/services/api';

    Vue.use(Search);
    export default {
        data() {
            return {
                searchValue: '',
                historyData: [],//搜索页数据
                searchHistoryList: [],
            };
        },
        methods: {
            backLastPage(val) {
                val === -1 ? this.$router.back(-1) : this.$router.push(val);
            },
            goodsSearch(val) {
                // console.log(val);
                // localStorage.setItem("searchHistory", val);//搜索历史记录
                // ['太阳镜', '智能手环', '智能手机', '无人机', '电视', '清洁工具', '苹果', '水果', '西瓜', '自行车']


                if (val.trim()) {
                    if (this.searchHistoryList.indexOf(val) < 0) {
                        this.searchHistoryList.unshift(val);
                        let localObj = JSON.stringify(this.searchHistoryList);
                        window.localStorage.setItem('searchHistoryKey', localObj)
                    }
                    this.$router.push({
                        path: '/goodsList',
                        query: {
                            searchKeyword: val,
                            fromPage: 'goodsSearch'
                        }
                    })
                }
            },

            //清除搜索历史记录
            clearHistoryKey() {
                this.searchHistoryList = [];
                window.localStorage.removeItem('searchHistoryKey');
            },
            //获取搜索历史
            searchHistory() {
                goodsSearchHistory().then(res => {
                    // console.log(res.data);
                    this.historyData = res.data.data;
                })
            }

        },
        created() {
            const newKeyList = JSON.parse(window.localStorage.getItem('searchHistoryKey'));
            this.searchHistoryList = newKeyList.length >= 1 ? newKeyList : [];
        },
        mounted() {
            this.searchHistory();
        }
    };
</script>

<style lang="less" scoped>
    .search-result {
        width: 100%;
        height: 100vh;
        background: #f0f2f5;
        box-sizing: border-box;
        padding: 12px 14px;

        .search-box {
            width: 100%;
            /*background: blue;*/
            /*box-sizing: border-box;*/
            /*padding: 6px;*/
            margin-bottom: 12px;
            position: relative;
            height: 34px;

            .cancelButton {
                position: absolute;
                right: 0;
                top: -8px;
                height: 50px;
                line-height: 50px;
                /*background-color: blue;*/
            }

            .van-search {
                position: absolute;
                left: 50%;
                /*top:5px;*/
                transform: translateX(-50%);
                width: 280px;
                padding: 0;
                background-color: #f0f2f5;
                /*background-color: red;*/
            }

            /*.icon-search {*/
            /*    width: 14px;*/
            /*    height: 14px;*/
            /*    position: absolute;*/
            /*    left: 30px;*/
            /*    top: 50%;*/
            /*    transform: translateY(-50%);*/
            /*}*/
            /*.search {*/
            /*    width: 100%;*/
            /*    height: 32px;*/
            /*    background: #fff;*/
            /*    border-radius: 16px;*/
            /*    font-size: 14px;*/
            /*    color: #141f33;*/
            /*    // text-align: center;*/
            /*    box-sizing: border-box;*/
            /*    padding-left: 54px;*/
            /*}*/
        }

        .status-box {
            width: 100%;
            margin-bottom: 8px;

            .tits {
                font-size: 16px;
                color: #141f33;
                margin-bottom: 12px;
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;

                .clearBox {
                    /*background-color: #d90d09;*/
                    width: 45px;
                    height: 18px;
                    position: absolute;
                    top: 0;
                    right: 0;

                    .icon-delete {
                        width: 16px;
                        height: 16px;
                        /*background: red;*/
                        position: absolute;
                        right: 27px;
                        top: 0;
                    }

                    .clearName {
                        position: absolute;
                        right: 0;
                        top: 3px;
                        font-size: 13px;
                        color: rgb(186, 186, 186);
                    }
                }

            }

            .status {
                width: 100%;
                overflow: hidden;

                .box {
                    width: auto;
                    padding: 0 6px;
                    height: 28px;
                    // line-height: 28px;
                    background: #F2F2F2;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #141414;
                    display: inline-box;
                    margin-right: 12px;
                    margin-bottom: 12px;
                    float: left;
                    border-radius: 14px;
                    border: 1px solid #fff;
                    display: flex;
                    align-items: center;

                    .icon-hot {
                        width: 16px;
                        height: 18px;
                    }
                }
            }
        }
    }
</style>
