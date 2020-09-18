<template>
    <div>
        <router-view />
        <Nav></Nav>
    </div>
</template>
<script>
import Nav from '@/component/Nav';

export default {
    components: {
        Nav
    },
    data() {
        return {
            
        };
    },
}
</script>
<style lang="less" rel="stylesheet/less" scoped >
// @import './index.less';
</style>