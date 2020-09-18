<template>
    <div>
        <div v-if="isReady">
            <AssessList
                :comment="comment"
                :goodsID="0"
                :showMore="false"
                :key="time"
            />
        </div>
        <div class="btm" v-if="isReady && comment.result && totalSize == comment.result.length">我是有底线的～</div>
    </div>
</template>

<script>
import AssessList from "@/component/GoodsDetail/assessList";

import { commentList } from "@/services/goods.js";
export default {
    components: {
        AssessList,
    },
    data() {
        return {
            comment: {},
            isReady: false,
            time: "",
            page: 1,
            totalSize: 0
        };
    },
    methods: {
        getCommentList() {
            // 获取评论列表
            let data = {
                page: this.page,
                pageSize: 10,
                product_id: this.$route.query.goodsID || "0",
            };
            commentList(data).then((res) => {
                if (res.code === 200) {
                    this.totalSize = res.data.comment_total;
                    if(this.comment.result){
                        res.data.result = this.comment.result.concat(res.data.result)
                    }
                    this.comment = res.data;
                    this.time = new Date().getTime();
                    this.isReady = true;
                }
            });
        },
        getScrollTop() { // 获取滑动位置
          var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
          if (document.body) {
            bodyScrollTop = document.body.scrollTop;
          }
          if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
          }
          scrollTop =
            bodyScrollTop - documentScrollTop > 0
              ? bodyScrollTop
              : documentScrollTop;
          return scrollTop;
        },
        getScrollHeight() { //文档的总高度
          var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
          if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
          }
          if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
          }
          scrollHeight =
            bodyScrollHeight - documentScrollHeight > 0
              ? bodyScrollHeight
              : documentScrollHeight;
          return scrollHeight;
        },
        getWindowHeight() { //浏览器视口的高度
          var windowHeight = 0;
          if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
          } else {
            windowHeight = document.body.clientHeight;
          }
          return windowHeight;
        }
    },
    mounted() {
        window.onscroll = () => {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var bottomFlag =
                this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()
                    ? true
                    : false;
            if(bottomFlag && this.totalSize > this.comment.result.length){
                this.page++
                this.getCommentList()
            }
        };
        this.getCommentList();
    },
};
</script>

<style lang="less" scoped>
.btm {
    padding: 10px 0;
    text-align: center;
}
</style>
