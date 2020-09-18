<template>
    <div class="grow-count">
        <div class="txt-box" v-for="(item,index) in content" :key="index">
            <div class="title">{{item.title}}</div>
            <div class="content" v-for="(ele,idx) in item.content" :key="idx">{{ele}}</div>
        </div>
    </div>
</template>

<script>
import { growthValueRemind } from "@/services/goods.js";
export default {
    data() {
        return {
            content: []
        }
    },
    methods: {
        getText(){
            growthValueRemind().then(res => {
                if(res.code == 200){
                    if(res.data){
                        res.data.content = res.data.content || []
                        this.content = res.data.content
                    }
                }
            })
        }
    },
    mounted(){
        this.getText()
    }
}
</script>

<style lang="less" scoped>
.grow-count {
    width: 100%;
    min-height: 100vh;
    background: #F5F7FA;
    box-sizing: border-box;
    padding-top: 8px;
    .txt-box {
        margin-bottom: 8px;
        width: 100%;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 12px;
        background: #fff;
        .title {
            font-size: 15px;
            color: #141414;
            margin-bottom: 12px;
        }
        .content {
            text-indent: 2em;
            text-align: justify;
            font-size: 14px;
            color: #666;
        }
    }
}
</style>