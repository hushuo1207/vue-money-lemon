<template>
    <Layout>
        <Tabs class-prefix="account" :data-source="recordTypeList" :value.sync="record.type" />
        <ol class="morney">
          <li  class="label" v-for="item in tags" :key="item.id"
           >
            <Icon name = "foods" />
            {{item.name}}
          </li>
        </ol>

    </Layout>
</template>

<script  lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/Button.vue'
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHelper";
import recordTypeList from '@/constants/recordTypeList'
import Tabs from '@/components/Tabs.vue'
import Icon from '../components/Icon.vue'

// console.log('1');
@Component({
  components: {Button, Tabs}
})
 export default class KeepAccount extends mixins(TagHelper){
   record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };
   recordTypeList = recordTypeList
   
   
   get tags() {
      return this.$store.state.tagList;
    }

    beforeCreate() {
      this.$store.commit('fetchTags');
    }
}
</script>

<style lang="scss" scoped>

  ::v-deep .account-tabs-item{
    line-height: 48px;
  }
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
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
  .morney{
    display: flex;
    flex-direction: row;
    font-size: 12px;
    flex-wrap: wrap;
      > .label {
        padding: 16px 0;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;//align-content: center,只有内容显示居中
        flex-direction: column;
        .icon{
            // margin-left: calc(50% - 16px);
            width: 32px;
            height: 32px;
      }
    }
  }

</style>