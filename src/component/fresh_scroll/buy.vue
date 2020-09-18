<template>
  <div>
    <div class="buy_list wid">
      <div class="often_buy_listf flx">
        <h1><img src="../../assets/images/fresh_icon2.png">常买清单</h1>
        <p class="desc">特价优惠 买到就是赚到</p>
        <ul>
          <li>
            <img src="../../assets/images/fresh_img.png"
                 alt="">
            <span>优惠特价</span>
          </li>
          <li>
            <img src="../../assets/images/fresh_img.png"
                 alt="">
            <span>热卖爆款</span>
          </li>
        </ul>
      </div>
      <div class="Strict_buy flx">
        <h1><img src="../../assets/images/fresh_icon1.png">常买清单</h1>
        <p class="desc">特价优惠 买到就是赚到</p>
        <ul>
          <li>
            <img src="../../assets/images/fresh_img.png"
                 alt="">
            <span>优惠特价</span>
          </li>
          <li>
            <img src="../../assets/images/fresh_img.png"
                 alt="">
            <span>热卖爆款</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buy',
  components: {
  },
}
</script>

<style lang="less" scoped>
.wid {
  width: 351px;
  margin: 8.5px auto 7.5px;
  border-radius: 9px;
  background: #fff;
  width: 351px;
}

.buy_list {
  padding: 15px 10px;
  display: flex;
  div.flx {
    flex-direction: column;
    flex: 1;
    h1 {
      font-size: 16px;
      color: #333;
      line-height: 18px;
      text-align: left;
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 6px;
        margin-top: -2px;
      }
    }
    p.desc {
      font-size: 12px;
      color: #999;
      text-align: left;
    }
    ul {
      padding-top: 16px;
      display: flex;
      flex-direction: row;
      li {
        position: relative;
        padding-bottom: 9px;
        margin-right: 8px;
        img {
          width: 75px;
          height: 75px;
          display: block;
        }
        span {
          font-size: 10px;
          color: #fff;
          padding: 0 4px;
          background: #c82519;
          border-radius: 3px;
          font-weight: bold;
          position: absolute;
          bottom: 0;
          height: 18px;
          line-height: 18px;
          display: block;
          left: 12px;
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
  .Strict_buy {
    padding-left: 13px;
  }
}
</style>