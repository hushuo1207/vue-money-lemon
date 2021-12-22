<template>
    <div class="tags">
            <div class="new">
                <button @click="createTag">新增标签</button>
            </div>
            <ul class="current">
                <li v-for="tag in dataSource" :key="tag"
                    :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggleTag(tag)">
                    {{tag}}
                </li>
            </ul>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Tags extends Vue {
    @Prop() readonly dataSource: string[] | undefined;
    //为了保证在本组件下不修改其他组件传来的值
    selectedTags: string[] = [];

    toggleTag(tag: string){
        const index = this.selectedTags.indexOf(tag);
        if(index >= 0){
            this.selectedTags.splice(index, 1);
        }else {
            this.selectedTags.push(tag);
        }
    }
    createTag(){
        const name = window.prompt('请输入标签名')
        // console.log(name);
        if (name === ''){
            window.alert('标签不能为空');
        }else if(this.dataSource){
            console.log(this.dataSource);
            
            this.$emit('update:dataSource', [...this.dataSource, name]);
            console.log(this.dataSource);

        }
        
    }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.tags{
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    > .current{
        display: flex;
        flex-wrap: wrap;
        > li {
            background: #d9d9d9;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            padding: 0 16px;
            margin-top: 4px;
            margin-right: 12px;
            &.selected{
                background: #15a19a;
                color: white;
            }
        }
    }
    > .new{
        padding-top: 16px;
        button{
            background: transparent;
            border: none;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px; 
        }
    }
}
</style>