<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money" />
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label" />
            标签
        </router-link>
        <router-link to="/account" class="item" active-class="selected">
            <Icon name="add" />
            添加
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
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
@import "~@/assets/style/helper.scss";

nav{
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    > .item {
        padding: 2px 0;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;//align-content: center,只有内容显示居中
        flex-direction: column;
        .icon{
            // margin-left: calc(50% - 16px);
            width: 32px;
            height: 32px;
        }
    }
    > .item.selected{
        color: $color-highlight;
        //选中底部框颜色
    }
    
}
</style>