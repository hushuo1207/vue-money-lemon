<template>
    <Layout class-prefix="layout">
        <div class="account">
            <div class="account-myself">链接</div>
            <div class="account-production">柠檬记账</div>
        </div>
        <div class="content">
            <div class="content-month" @click="selectMonth">月份</div>
            <div class="content-total">
                <div class="content-type">收入</div>
                <div class="content-amount">6000</div>
            </div>
                <div>
                    
                <div>支出</div>
                <div>300</div>
                </div>
        </div>
        <div class="message">
            <div class="message-date"> 12-30  sunday</div>
            <div class="message-content">
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
    selectMonth () {
        console.log('month');
        
    }
}


</script>

<style lang="scss" scoped>


</style>