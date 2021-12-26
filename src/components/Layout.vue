<template>
    <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
            <slot></slot>
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Layout extends Vue{
    @Prop() readonly classPrefix!: string ;
        
}
</script>


<style lang="scss" scoped>
    .layout-wrapper{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        //TODO 会产生页面滑动
    }
    .content{
        overflow: auto;//让手机超出长度是显示滚动条
        flex-grow: 1;

    }
</style>