<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
        <div>
            type:   {{type}}<br/>
            interval: {{interval}}
        </div>
    
    </Layout>
</template>

<script  lang="ts">
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component({
    components: { Tabs}
})
export default class Statistics extends Vue {
    type = '-'
    intervalList = intervalList
    interval = 'day'
    recordTypeList = recordTypeList
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
    ::v-deep .interval-tabs-item{
        height: 48px
    }
</style>