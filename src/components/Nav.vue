<template>
    <nav>
        <router-link to="/detail" class="item" active-class="selected">
            <Icon name="details" />
            <span>明细</span> 
        </router-link>
        <router-link to="/account" class="item account" active-class="selected">
            <Icon name="account" />
            <span>记账</span> 
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics" />
            <span>图表</span> 
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
    //@extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    height: 8vh;
    > .item {
        color: #6d6d6dd3;
        padding: 2px 0;
        width: 33.33%;
        display: flex;
        justify-content: center;
        align-items: center;//align-content: center,只有内容显示居中
        flex-direction: column;
        span {
          color: black;
            
        }
        .icon{
            // margin-left: calc(50% - 16px);
            
            width: 32px;
            height: 32px;
        }
    }
    > .account{
        color: #e85305;
    }
    > .item.selected{
        color: black;
        //选中底部框颜色
    }
    
}
</style>