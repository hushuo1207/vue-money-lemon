<template>
    <div class="nav">
    <router-link to="/money">记账</router-link>|
    <router-link to="/labels">标签</router-link>|
    <router-link to="/statistics">统计</router-link>
    <!-- <hr>
    <router-link to="/error"><button>测试路由 </button></router-link> -->
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
// scoped有什么用，将组建的范围固定在当前组建 vue会帮你加一个属性data-v-x1
//并在属性选择器上也添加此属性.nav[data-v-x1]
.nav{border: 1px solid red;}
</style>