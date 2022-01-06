<template>
    <Layout class-prefix="layout">
        <div>
            <div>链接</div>
            <div>柠檬记账</div>
        </div>
        <div>
            <div>月份</div>
            <div>
                <div>收入</div>
                <div>6000</div>
            </div>
            <div>支出</div>
            <div>300</div>
        </div>
        <div>
            <div> 12-30  sunday</div>
            <div>
                <Icon name="add" ></Icon>
                服装
            </div>
        </div>
   </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
 

@Component
export default class KeepingAccount extends Vue {   

}


</script>

<style lang="scss" scoped>


</style>