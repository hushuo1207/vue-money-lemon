<template>
<header class="headerTab">
    <div class="tabsCenter">
        <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
            <li v-for="item in dataSource" :key="item.value"
                @click="select(item)"
                class="tabs-item"
                 :class="liClass(item)">
                <div class="span">{{item.text}}</div>
            </li>
        </ul>
    </div>
</header>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

type DataSouceItem = {text: string, value: string};
@Component
export default class Tabs extends Vue {
    // item:DataSouceItem = {text: '', value: ''}
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

.headerTab{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fdd844;
          border-radius: 4px;
    .tabsCenter{
        display: block;
        // width: 50vh;
        .tabs{
            
            // background: #c4c4c4;
            display: flex;
            flex-direction: row;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            font-size: 14px;
            &-item{
                // width: 25vh;
                // line-height: 48px;
                padding:  0 16px;
                
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid transparent;
                &.selected{
                    // border-bottom: 1px solid black;
                //     content: '';
                //     position: absolute;
                //     bottom: 0;
                //     left: 0;
                //     width: 100%;
                //     height: 4px;
                //     background: #333;
                }
                
            }
        }
    }
}


</style>