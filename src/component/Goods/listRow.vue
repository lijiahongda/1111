<template>
    <ul class="goodsul">
        <li>
            <div class="goodsleft">
                <img src="" class="goodsimg">
            </div>
            <div class="goodsright">
                <div>
                    <div class="goods_name">垃圾袋加厚商品比奥体厚商品比奥体</div>
                    <div class="goodsyhjdiv">
                        <div class="goodsyhj">5元优惠券</div>
                        <div class="goodspl">78条好评</div>
                    </div>
                    <div class="goodsprogress">
                        <div class="progress1">
                            <div class="progress2"></div>
                        </div>
                        <span class="progress_num">已售71%</span>  
                    </div>
                    <div class="buyuser">
                        <div class="uservatarlist">
                            <img  class="useravatar" v-for="(item , index ) in useravatar" :key="index" :src="item">
                        </div>
                        <span class="buypeople">12人购买</span>
                    </div>
                    <div class="logodiv">
                        <img src="" class="logo" alt="">
                        <span class="compony">金河果品</span>
                    </div>
                </div>

                <div class="goodsright_bottom">
                    <div class="goodspricediv">
                        <div class="goodspicediv">
                            <div class="goodspricenow">¥89.09</div>
                            <div class="goodspriceold">¥90.99</div>
                        </div>
                        <div class="willbuy">我要了</div>
                        <!-- <div class="willbuy">去购买</div> -->
                        <!-- <div class="willbuy">马上抢</div> -->
                    </div>
                    <div class="goodstg">推广赚¥12.00</div>
                    <div class="goodsBtnlist">
                        <div class="goodsbtn">复制文案</div>
                        <div class="goodsbtn">分享图片</div>
                    </div>
                </div>    
            </div>
            <!-- 18:00秒杀 -->
            <div class="miaoshatip">18:00秒杀</div>
            <!-- 群主推荐 -->
            <div class="qztj">
                <img src="../../assets/images/good.png"  class="goodhand" alt="">
                <span class="qztjspan">群主推荐</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            useravatar:['','','','']
        }
    }
}
</script>
<style lang="less" scoped>
.goodsul li{
    background: #ffffff;
    border-radius: 8px;
    padding:14px;
    width:375px;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    margin-bottom: 10px;
    position: relative;
}
.goodsleft{
    width:140px;
    height:140px;
    border:1px solid red;
}
.goodsimg{
    width:100%;
}
.goodsright{
    width:195px;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    align-content: space-between;
}
.goods_name{
    color:#141414;
    font-size:15px;
    font-weight: bold;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 22px;
}
.goodsyhjdiv{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 4px;
}
.goodsyhj{
    background: url("../../assets/images/yhj.png") no-repeat;
    background-size:82px 22px;
    width:82px;
    height:22px;
    text-align: center;
    line-height:22px;
    font-size:12px;
    color:#ED2E2E;
}
.goodspl{
    font-size:12px;
    color:#999999;
    margin-left: 5px;
}
.goodsprogress{
    margin-top:5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.progress1{
    width:120px;
    height:4px;
    background:#FFEFF0;
    position: relative;
}
.progress2{
    width:80px;
    height:4px;
    background:#ED2E2E;
    position: absolute;
    left:0;
    top:0;
    border-radius:4px;
}
.progress_num{
    font-size:12px;
    color:#999999;
    margin-left:10px;
}
.buyuser{
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.uservatarlist{
    position: relative;
    width:120px;
}
.useravatar{
    width:22px;
    height:22px;
    border-radius: 50%;
    margin-left: -0.13rem;
    position: relative;
    border:1px solid red;
}
.buypeople{
    font-size:12px;
    color:#999999;
    margin-left: 10px;
}
.goodsright_bottom{
    width:100%;
}
.goodspricediv{
    margin-top:5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.goodspicediv{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.goodspricenow{
    color:#ED2E2E;
    font-weight: bold;
    font-size:18px;
}
.goodspriceold{
    font-size:12px;
    color:#999999;
    text-decoration:line-through;
    margin-left:2px;
}
.willbuy{
    width:68px;
    height:24px;
    background:#ED2E2E;
    text-align: center;
    line-height:24px;
    color:#FFFFFF;
    font-size:13px;
    border-radius: 15px;
}
.goodstg{
    width:89px;
    height:22px;
    border-radius:11px;
    border:1px solid #ED2E2E;
    color:#ED2E2E;
    font-size:12px;
    text-align: center;
    line-height: 22px;
    margin-top: 5px;
}
.goodsBtnlist{
    margin-top: 5px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.goodsbtn{
    width:64px;
    height:22px;
    border-radius:11px;
    background:#ED2E2E;
    text-align: center;
    line-height: 22px;
    font-size:12px;
    color:#FFFFFF;
    margin-left: 10px;
}
.miaoshatip{
    width:80px;
    height:30px;
    background:#ED2E2E;
    border-radius:0 40px 40px 0;
    position: absolute;
    left:0;
    top:12px;
    font-size:14px;
    color:#ffffff;
    line-height:30px;
    text-align: center;
}
.qztj{
    width:77px;
    height:22px;
    background:#FEAB05;
    border-radius: 4px 4px 16px 4px;
    font-size:12px;
    color:#FFFFFF;
    text-align: center;
    position: absolute;
    left: 12px;
    top: 12px;
    line-height: 22px;
}
.goodhand{
    width:12px;
    height:12px;
    margin-left:2px;
}
.qztjspan{
    padding-left: 3px;
}
.logodiv{
    margin-top:5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.compony{
    font-size:12px;
    color:#999999;
}
.logo{
    width:20px;
    height:20px;
    border:1px solid red;
    margin-right:5px;
}
</style>