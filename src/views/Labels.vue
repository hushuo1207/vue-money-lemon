<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id"
              :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script  lang="ts">
// import tagListModel from "@/Models/tagListModel";
import Vue from "vue";
import { Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/Button.vue'
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHelper";


@Component({
  components: {Button}
})
 export default class Labels extends mixins(TagHelper){
   get tags() {
            return this.$store.state.paymentList;
    }

    beforeCreate() {
      this.$store.commit('fetchTags');
    }
    // createTag(){
    //     const name = window.prompt('请输入标签名');
    //     if(name) {
    //         this.$store.commit('createTag',name);
    //     }
    // }
}
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    height: 50vh;//TODO 
    overflow: auto;
    > .tag {
       min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  .createTag {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 28px;
    }
  }


</style>