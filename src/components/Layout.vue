<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Layout'
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper{
        border: 1px solid green;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        overflow: auto;//让手机超出长度是显示滚动条
        flex-grow: 1;

    }
</style>