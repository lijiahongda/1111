<template>
  <div class="pages_navdiv">
    <div class="navdiv">
      <router-link class="link "
                   :to="{name:'recommend'}">精选推荐</router-link>
      <router-link class="link"
                   :class="{current : hover=='fresh'} "
                   :to="{name:'fresh'}">食品生鲜</router-link>
      <router-link class="link"
                   :class="{current : hover=='house'} "
                   :to="{name:'house'}">日用家居</router-link>
      <router-link class="link"
                   :class="{current : hover=='beauty'} "
                   :to="{name:'beauty'}">美妆个护</router-link>
    </div>
  </div>
</template>
      <script>
export default {
  name: 'nav',
  props: [
    'hover'
  ],
  data () {
    return {

    }
  },
  mounted () {
    console.log(this)
  }
}
</script>
<style lang="less" scoped>
.pages_navdiv {
  width: 375px;
  padding: 0 12px;
  box-sizing: border-box;
}
.navdiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
}
.link {
  width: 60px;
  color: #141414;
  font-size: 14.5px;
  position: relative;
}
.current {
  color: #ff0000;
  font-weight: bold;
}
.link.current::after {
  position: absolute;
  content: "";
  height: 4px;
  width: 60px;
  left: 0;
  bottom: -10px;
  border-radius: 2px;
  background: #ff0000;
}
</style>