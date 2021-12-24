<template>
        <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
            <li v-for="item in dataSource" :key="item.value"
                @click="select(item)"
                class="tabs-item"
                 :class="liClass(item)">
                {{item.text}}</li>
        </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

type DataSouceItem = {text: string, value: string};
@Component
export default class Tabs extends Vue {
    
    @Prop({required: true, type: Array}) readonly dataSource!: DataSouceItem;
    
    @Prop() readonly value!: string ;
    @Prop() readonly classPrefix!: string ;

    liClass(item: DataSouceItem){
        return {[this.classPrefix+'-tabs-item']: this.classPrefix, selected: item.value === this.value};
    }
    select(item: DataSouceItem){
        this.$emit('update:value', item.value);
    }
}
</script>

<style lang="scss" scoped>
.tabs{
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    &-item{
        width: 50%;
        line-height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
        }
        
    }
}
</style>