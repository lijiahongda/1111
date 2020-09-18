<template>
    <div class="main">

        <div class="head">
            <template v-if="orderDetail.orderType==1">
                <div class="status">{{orderDetail.orderTypeValue}}</div>
                <div class="tips">{{orderDetail.orderTypeDesc}}~</div>
            </template>

            <template v-if="orderDetail.orderType==0">
                <div class="status">{{orderDetail.orderTypeValue}}</div>
                <div class="tips">请您下载悦淘APP支付~</div>
            </template>
        </div>


        <div>
            <div class="addressarea">
                <div class="address">
                    <div class="name">{{orderDetail.linkName}}  {{orderDetail.linkTel}}</div>
                    <div class="addressdiv clear">
                        <img class="addressicon" src="../../assets/images/address.png">
                        <span class="addressdetail">{{orderDetail.address}}</span>
                    </div>
                </div>
            </div>


            <div class="orderdiv">
                <div class="ordertitle">订单信息</div>
                
                <div v-for="(item,index) in orderDetail.goodsInfo" :key="index">
                    <div class="ordercontent">
                        <img :src="item.goodsImg" alt="" class="orderimg">
                        <div class="orderdetaildiv">
                            <div class="orderfirst">
                                <!-- <span class="orderfirstname">优</span> -->
                                <span class="ordername">{{item.goodsName}}</span>
                            </div>
                            <div class="ordersecond">{{item.goodsSpec}}</div>
                            <div class="orderthird">
                                <span class="orderprice">￥{{item.goodsPrice}}</span>
                                <span class="ordernumber">X{{item.goodsNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goodsprice">
                    <span class="pricetitle">商品总计</span>
                    <span class="goodspricespan">￥{{orderDetail.totalMoney}}</span>
                </div>
                <div class="goodssjprice">
                    <span class="sjpricetitle">实际付款(不含运费)</span>
                    <span class="sjprice">￥{{orderDetail.actualPrice}}</span>
                </div>
            </div>

            <div class="orderdiv2">
                <div class="order2first">
                    <span>订单编号：</span>
                    <span id="ordernumber">{{orderDetail.orderNo}}</span>
                    <span class="fubtn" @click="copy">复制</span>
                </div>
                <div class="order2second">
                    <span>下单时间：</span>
                    <span>{{orderDetail.createTime}}</span>
                </div>
                <div class="order2three">
                    <span>下单方式：</span>
                    <span>微信</span>
                </div>
            </div>

        </div>

        <div class="bottombtn">
            <div v-if="orderDetail.orderType==1">
                <div class="tkbtn" @click="tk">申请退款</div>
                <!-- <div class="buybtn">再次购买</div> -->
            </div>
            <div v-if="orderDetail.orderType==0">
                <!-- <div class="paybtn" @click="pay">去支付</div> -->
            </div>
            
        </div>


        <!-- 物流/公从号 -->
        <template v-if="isShow4">
            <div class="shade"></div>
            <div class="redbagdiv">
                <div class="closeredbag clear">
                    <img src="../../assets/images/closehb.png" class="closehbimg2" @click="closeHb">
                </div>
                <div class="">
                    <div class="gzhhead">
                        <div class="gzhfirst">物流状态及退款</div>
                        <div class="gzhsecond">请移步悦淘APP查看</div>
                    </div>
                    <div class="gzhbottom">
                        <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-12/01/yuelvhuiqZaBHGWaJD1594487779.png" alt="" class="ewmicon">
                        <div class="downapp">悦淘APP下载二维码</div>
                    </div>
                </div>
            </div>
        </template> 
    </div>
</template>
<script>
import {getOrderDetail } from "@/services/payresult";
export default {
    data:function(){
        return {
            orderDetail:"",
            isShow4:false,
            Orderno:''
        }
    },
    mounted(){
        let _url = this.$route.query.orderNo
        this.Orderno = _url
        let data = {"orderNo" :this.Orderno};
        getOrderDetail(data).then(res=>{
            if(res.code==200){
                this.orderDetail=res.data
            }
        })
    },
    methods:{
        copy(){
            var ordernumber=document.getElementById("ordernumber").innerText;
            var input = document.createElement('input');
            input.setAttribute('id', 'copyInput');
            input.setAttribute('value', ordernumber);
            document.getElementsByTagName('body')[0].appendChild(input);
            document.getElementById('copyInput').select();
            if (document.execCommand('copy')) {
                console.log('复制成功');
            }
            document.getElementById('copyInput').remove();
        },
        tk(){
            this.isShow4=true
        },
        closeHb(){
            this.isShow4=false
        }
    }
}
</script>
<style lang="less" scoped>
    .clear:after,
    .clear:before {
        content: "";
        display: block;
        clear: both;
    }
    .main{
        background: #f8f8f8;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        overflow: auto;
        position: absolute;
    }   
    .head{
        width: 375px;
        background: linear-gradient(45deg,#ff6f29, #f7263c, #ff5c57);
        padding:50px 39.5px 25px;
    }
    .status{
        font-size:20px;
        color:#fff;
    }
    .tips{
        font-size:13.5px;
        color:#fff;
        margin-top: 20px;
    }
    .addressarea{
        background: linear-gradient(45deg,#ff6f29, #f7263c, #ff5c57);
    }
    .address{
        background: #fff;
        border-radius:13.5px 13.5px 0 0;
        padding-bottom: 15px;
    }
    .name{
        font-size:14px;
        color:#333333;
        font-weight: bold;
        padding-left: 39.5px;
        padding-right: 39.5px;
        padding-top: 20px;
    }
    .addressicon{
        width:17.5px;
        height: 20px;
        float: left;
    }
    .addressdetail{
        font-size:14px;
        color:#666666;
        float: left;
        margin-left: 5px;
        margin-top: 2.5px;
        width:305px;
    }
    .addressdiv{
        margin-top: 10px;
        padding-left: 20px;
        padding-right: 30px;
    }
    .orderdiv{
        background:#fff;
        padding:0 20px;
        margin-top: 10px;
    }
    .orderdiv2{
        background:#fff;
        margin-top: 10px;
        padding:20px;
        margin-bottom: 50px;
    }
    .ordertitle{
        font-size:15.5px;
        color:#333333;
        font-weight: bold;
        padding-top: 15px;
    }
    .ordercontent{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 15px;
    }
    .orderdetaildiv{
        width: 218.5px;
    }
    .orderimg{
        width: 106.5px;
        height:106.5px;
        border-radius: 5px;
    }
    .orderfirstname{
        font-size:12px;
        color:#fff;
        font-weight: bold;
        background: #F5335E;
        padding:1px;
        border-radius: 4px;
    }
    .ordername{
        font-size:14.5px;
        color:#333333;
        font-weight: bold;
        line-height: 20px;
    }
    .ordersecond{
        color:#999999;
        font-size:12px;
        margin-top: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .orderthird{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }
    .orderprice{
        font-size:16px;
        color:#333333;
        font-weight: bold;
    }
    .ordernumber{
        font-size:14px;
        color:#999999;
    }
    .goodsprice{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 15px;
        align-items: flex-end;
    }
    .goodspricespan{
        font-size:16px;
        color:#333333;
        font-weight: bold;
    }
    .pricetitle{
        font-size:14px;
        color:#999999;
        font-weight: bold;
    }
    .goodssjprice{
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 15px;
    }
    .sjpricetitle{
        font-size:14px;
        color:#333333;
        font-weight: bold;
    }
    .sjprice{
        font-size:16px;
        color:#F7263C;
        font-weight: bold;
    }
    .order2first{
        font-size:14px;
        color:#999999;
        font-weight: bold;
    }
    .order2second{
        font-size:14px;
        color:#999999;
        margin-top: 10px;
        font-weight: bold;
    }
    .order2three{
        font-size:14px;
        color:#999999;
        margin-top: 10px;
        font-weight: bold;
    }
    .fubtn{
        float:right;
        width: 42.5px;
        height: 20.5px;
        border: 1px solid #999999;
        border-radius: 3.5px;
        text-align: center;
        line-height: 20.5px;
        font-size:12px;
        color:#666666;
        margin-top: -3.5px;
    }
    .bottombtn{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        height:44.5px;
        width: 375px;

    }
    .tkbtn{
        width:130px;
        height:32.5px;
        border-radius: 16.5px;
        border: 1px solid #999999;
        text-align: center;
        line-height:32.5px;
        color:#999999;
        float: left;
        margin-top: 7px;
        margin-left: 115px;
    }
    .buybtn{
        width: 130px;
        height: 32.5px;
        background: #f7263c;
        border-radius: 16.5px;
        color:#fff;
        text-align: center;
        line-height:32.5px;
        float: left;
        margin-top: 7px;
        margin-left: 30px;
    }
    .paybtn{
        width: 130px;
        height: 32.5px;
        background: #f7263c;
        border-radius: 16.5px;
        color:#fff;
        text-align: center;
        line-height:32.5px;
        float: left;
        margin-top: 12px;
        margin-left: 200px;
    }

    // 红包
    .shade{
        width:100%;
        height:100%;
        opacity: 0.6;
        background: #000000;
        position: fixed;
        left: 0;
        top:0;
        z-index:1000;
    }
    .redbagdiv{
        position: fixed;
        left:50px;
        top:180px;
        z-index: 10000;
        width:273.5px;

    }
    .closehbimg{
        width:28.5px;
        height:28.5px;
        float:right;
        margin-right:15px;
    }
    .redbagimg{
        width:273.5px;
        height:313.5px;
    }
    .redbag{
        position: relative;
    }
    .redbagcontent{
        position: absolute;
        left:0;
        top:0;
        width: 273.5px;
        text-align: center;
    }
    .hbprice{
        font-size:44px;
        color:#EC1A17;
        font-weight: bold;
        margin-top: 100px;
        padding-left: 30px;
    }
    .hbtime{
        color:#E7353C;
        font-size:12px;
        width: 130.5px;
        height: 21.5px;
        border: 1px solid #eb323a;
        border-radius: 10.5px;
        text-align: center;
        line-height: 21.5px;
        margin-left:80px;
    }
    .gethb{
        width: 152px;
        height: 39.5px;
        background: #fff4cc;
        border-radius: 19.5px;
        margin-left: 75px;
        margin-top: 60px;
        font-size:14.5px;
        color:#CB0000;
        font-weight: bold;
        line-height: 39.5px;
        text-align: center;
    }
    .hbprice .danwei{
        font-size: 18px;
        color:#EC1A17;
    }
    // 公众号/app下载 弹窗
    .gzhhead{
        width: 100%;
        height: 103.5px;
        background: linear-gradient(90deg,#ff6f29, #f7263c, #ff5c57);
        border-radius:10px 10px 0 0;
        font-size:20px;
        color:#FFFFFF;
        text-align: center;
        font-weight: bold;
    }
    .gzhfirst{
        padding-top: 30px;
    }
    .gzhsecond{
        margin-top: 15px;
    }
    .gzhbottom{
        background: #fff;
        height: 100%;
        text-align: center;
        padding-top: 40px;
        border-radius: 0 0 10px 10px;
    }
    .ewmicon{
        width:123.5px;
        height:123.5px;
        display: block;
        margin-left: 75px;
        border-radius: 10px;
    }
    .downapp{
        font-size:12.5px;
        color:#333333;
        padding-top:20px;
        padding-bottom:20px;
    }
    .closehbimg2{
        width:28.5px;
        height:28.5px;
        float:right;
        margin-right:5px;
        margin-bottom: 15px;
    }
    .gzhthree{
        font-size:18px;
        color:#fff;
        text-align: center;
        padding-top: 40px;
        position: relative;
    }
    .gzhtip{
        position: absolute;
        top: 15px;
        left:175px;
        background:#FBE344;
        border-radius: 15px 15px 15px 0px;
        text-align: center;
        color:#E90921;
        font-size:9px;
        width: 79px;
        height: 20px;
        line-height: 20px;
    }
</style>