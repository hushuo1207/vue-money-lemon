<template>
    <div class="tags">
            <div class="new">
                <button @click="createTag">新增标签</button>
            </div>
            <ul class="current">
                
                <li v-for="tag in $store.state.tagList" :key="tag.id"
                    :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggleTag(tag)">
                    {{tag.name}}
                </li>
                <!-- <li>{{$store.state.taglist.name[0]}}</li> -->
            </ul>
        </div>
</template>

<script lang="ts">
// import store from "@/store/index2";
import { TagHelper } from "@/mixins/TagHelper";
import Vue from "vue";
import { mixins } from "vue-class-component";
import {Component, Prop} from "vue-property-decorator";

@Component({
    computed: {
        taglist(){
            
            return this.$store.state.taglist;
        }
    }
})
export default class Tags extends mixins(TagHelper) {
    // @Prop({required: true}) readonly dataSource!: string[];
    //为了保证在本组件下不修改其他组件传来的值

    created(){
        this.$store.commit('fetchTags');
        // console.log(typeof this.$store.state.tagList);
    }
    selectedTags: string[] = [];

    toggleTag(tag: string){
        const index = this.selectedTags.indexOf(tag);
        if(index >= 0){
            this.selectedTags.splice(index, 1);
        }else {
            this.selectedTags.push(tag);
            
        }
        // this.$emit('update:value', this.selectedTags);
        // console.log('1');
        // console.log(this.selectedTags);
        
    }
    // createTag(){
    //     const name = window.prompt('请输入标签名')
    //     if (!name){
    //        return window.alert('标签不能为空');
    //     }
    //     this.$store.commit('createTag', name);
        
    // }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.tags{
    background: white;
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