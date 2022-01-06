<template>
<Layout class-prefix="layout">
    <div class="wrapper">
        <div class="title">
            <div>back</div>
            <div>添加支出类别</div>
            <div>完成</div>
        </div>
        <div class="name">输入类别名称</div>
        <div class="content">
            <ul>
                <li>
                    <div>娱乐</div>
                    <div>
                        <Icon name="add"></Icon>
                        <Icon name="add"></Icon>
                        <Icon name="add"></Icon>
                        <Icon name="add"></Icon>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';


@Component
export default class Xxx extends Vue {   

        
}
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    > .title{
        display: flex;
        height: 6vh;

    }
    > .name{
        display: flex;
        height: 12vh;
        
    }
    > .content{
        display: flex;
        height: 60vh;
        
    }
}
</style>