<template>
    <div class="asses">
        <div class="title">
            <div>
                <span>商品评价</span>
                <span class="spe">（{{ commentList.comment_total }}条）</span>
            </div>
            <img v-if="showMores" class="more" src="../../assets/images/more-change.png" @click="routerLink('/assessList?goodsID=' + goodsIDs)"/>
        </div>
        <div class="asses-list">
            <div
                class="list"
                v-for="(item, index) in commentList.result"
                :key="index"
            >
                <img class="avatar" :src="item.litpic" />
                <div class="info-box">
                    <div class="username">
                        <div class="le">{{ item.nickname }}</div>
                        <div class="ri">{{ item.create_time }}</div>
                    </div>
                    <div class="username">
                        <div class="star-box">
                            <img
                                v-for="(ele,idx) in Array.from(new Array(item.goods_score))"
                                :key="idx"
                                class="star"
                                src="../../assets/images/star.png"
                            />
                        </div>
                    </div>
                    <div class="assess-txt">{{ item.comment }}</div>
                    <div class="pic-box" v-for="(ele,idx) in item.imgs" :key="idx">
                        <img :src="ele" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            default: {
                comment_total: 0,
                result: [],
            }
        },
        showMore: {
            type: Boolean,
            default: false
        },
        goodsID: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            commentList: this._props.comment,
            showMores: this._props.showMore,
            goodsIDs: this._props.goodsID
        };
    },
    methods: {
        routerLink(url){
            this.$router.push(url)
        }
    }
};
</script>

<style lang="less" scoped>
.asses {
    width: 100%;
    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 15px 12px 5px 12px;
        font-size: 14px;
        color: #333333;
        .spe {
            font-size: 12px;
            color: #999999;
        }
        .more {
            width: 14px;
            height: 4px;
        }
    }
    .asses-list {
        width: 100%;
        .list {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #e6e6e6;
                overflow: hidden;
            }
            .info-box {
                width: 300px;
                padding: 5px 0 16px 0;
                border-bottom: 1px solid #f8f8f8;
                .username {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                    .le {
                        color: #333333;
                        font-size: 13px;
                    }
                    .ri {
                        color: #999999;
                        font-size: 13px;
                    }
                }
                .star-box {
                    margin-bottom: 22px;
                    .star {
                        width: 12px;
                        height: 12px;
                    }
                }
                .assess-txt {
                    color: #333333;
                    font-size: 12px;
                    text-align: left;
                    text-align: justify;
                    margin-bottom: 12px;
                }
                .pic-box {
                    width: 90%;
                    display: flex;
                    justify-content: space-between;
                    img {
                        width: 75px;
                        height: 75px;
                        border-radius: 5px;
                        background: #999;
                    }
                }
            }
        }
    }
}
</style>
