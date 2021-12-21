<template>
    <div>
        <div>
            404 NotFound
            <hr>
            当前页面不存在，请检查网址是否正确!
        </div>
        <div>
            <router-link to="/">
            <button>返回首页</button>
            </router-link>
            <!-- <a href="#/">也能返回</a>
            一般使用上面那种 -->
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'NotFound'
    }
</script>

<style scoped="scss">

</style>