<template>
    <Layout>
        <!-- <Types class-prefix="xxx" :value.sync="type" /> -->
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
        <div>
            type:   {{type}}<br/>
            interval: {{interval}}
        </div>
    
    </Layout>
</template>

<script  lang="ts">
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component({
    components: {Types, Tabs}
})
export default class Statistics extends Vue {
    type = '-'
    intervalList = [
        {text: '按天', value: 'day'},
        {text: '按周', value: 'week'},
        {text: '按月', value: 'month'}
    ]
    interval = 'day'
    typeList = [
        {text: '支出', value: '-'},
        {text: '收入', value: '+'}
    ]
}
</script>

<style scoped lang="scss">
    ::v-deep .type-tabs-item{
        border: 1px solid red;
        &.selected{
            background: white;
        }
        &::after{
            display:none;
        }
    }
</style>