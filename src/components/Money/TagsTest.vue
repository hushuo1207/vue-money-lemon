<template>
    <div class="tags">
        <ul class="current">
            <li class="labels" v-for="tag in taglist" :key="tag.id"
                :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggleTag(tag)">
                <div class="iconRadius">
                    <Icon name = 'foods' />
                </div>
                {{tag.name}}
            </li>
            
        </ul>
    </div>
</template>

<script lang="ts">
// import store from "@/store/index2";
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import {Component, Prop} from "vue-property-decorator";
import Icon from "../Icon.vue";

@Component({
    components: {Icon}
})
export default class TagsTest extends mixins(TagHelper) {
    // @Prop({required: true}) readonly dataSource!: string[];
    //为了保证在本组件下不修改其他组件传来的值

    get taglist(){
        
        return this.$store.state.tagList;
    }
    created(){
        this.$store.commit('fetchTags');
         //console.log(this.$store.state.tagList);
    }
    selectedTags: string[] = [];

    toggleTag(tag: string){
        const index = this.selectedTags.indexOf(tag);
        if(index >= 0){
            this.selectedTags.splice(index, 1);
        }else {
            this.selectedTags.push(tag);
            
        }
         this.$emit('update:value', this.selectedTags);
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
    padding: 0px;
    display: flex;
    flex-direction: column;
    > .current{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        > .labels {
            background: #fffffd;
            width: 25%;
            height: 80px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            // border-radius: 50%;
            padding-top: 12px;
            // margin-top: 4px;
            // margin-right: 12px;
            &.selected{
                // background: #fff177;
                // color: black;
                .iconRadius{
                    background: #fff177;
                    color: black;
                
                }
            }
            .iconRadius{
                background: #f6f6f4;

                width: 48px;
                height: 48px;
                border-radius: 50%;
                .icon{
                    // margin: auto;
                    // background: ;
                    // 
                    margin-left: 6px;
                    margin-top: 6px;
                    width: 36px;
                    height: 36px;
                }
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