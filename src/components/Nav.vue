<template>
    <nav>
        <router-link to="/money" class="item">
            <Icon name="money" />
            记账
        </router-link>
        <router-link to="/labels" class="item">
            <Icon name="label" />
            标签
        </router-link>
        <router-link to="/statistics" class="item">
            <Icon name="statistics" />
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
// scoped有什么用，将组建的范围固定在当前组建 vue会帮你加一个属性data-v-x1
//并在属性选择器上也添加此属性.nav[data-v-x1]

nav{
    display: flex;
    box-shadow: 0 0 3px rgba(0 ,0 , 0, 0.85);
    flex-direction: row;
    font-size: 12px;
    > .item {
        padding: 2px 0;
        width: 33.33333%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        .icon{
            margin-left: calc(50% - 16px);
            width: 32px;
            height: 32px;
        }
    }
    
}
</style>