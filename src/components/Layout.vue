<template>
    <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
            <slot></slot>
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        props: ['classPrefix'],
        name: 'Layout'
    }
</script>


<style lang="scss" scoped>
    .layout-wrapper{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        overflow: auto;//让手机超出长度是显示滚动条
        flex-grow: 1;

    }
</style>