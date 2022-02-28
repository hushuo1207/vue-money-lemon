<template>
  <div>
    <div class="title-wrapper">
      <div class="title">
        <div class="go-back" @click="goBack">
          <Icon name="back"></Icon>
        </div>
        <div class="title-name">类别设置</div>
      </div>

      <div class="title-content">
        <TabsTest
          class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"
        />
      </div>
    </div>

    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag.id">
        <div class="svg">
          <Icon :name="tag.iconName" />
        </div>
        <div class="content-wrapper">
          <div class="delete">{{ tag.name }}</div>
          <div class="delete svg" @click="deleteLabel(tag.id)">
            <Icon name="deletes" />
          </div>
        </div>
      </div>
    </div>
    <router-link class="createTag-wrapper" :to="`/xxx?q=${type}`">
      <Icon name= "plus"/>
      <button class="createTag">新建标签</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHelper";
import recordTypeList from "@/constants/recordTypeList";
import TabsTest from "@/components/Money/Tabs.vue";

@Component({
  components: { Button, TabsTest },
})
export default class LabelsTest extends mixins(TagHelper) {
  type = "-";
  recordTypeList = recordTypeList;
  
  get tags() {
    if(this.type === '-'){return this.$store.state.paymentList;}
    return  this.$store.state.incomeList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
    // this.$store.commit("fetchTagsIncome");
  }
  goBack() {
    this.$router.back();
  }
  deleteLabel(id: string) {
    this.$store.commit('removeTag', {id, type: this.type});
    // return id;
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
.title-wrapper {
  display: flex;
  flex-direction: column;
  height: 11.3vh;
  .title {
    display: flex;
    height: 5.8vh;
    justify-content: center;
    align-items: center;
    background: #fddb44;
    font-size: 16px;
    .go-back {
      width: 13vw;
      // padding: 0 8px;
      > .icon{
        width: 24px;
        height: 24px;

      }
    }
    .title-name {
      width: 87vw;
      margin-left: -8vw;
      text-align: center;
    }
  }
  .title-content {
    display: flex;
    height: 5.8vh;
    background: #fddb44;
    justify-content: center;
    align-items: center;
    ::v-deep .type-tabs {
      width: 80vw;
      // justify-content: center;
      // align-items: center;
      border: 1px solid black;
      border-radius: 4px;

      &-item {
        height: 4vh;
        width: 40vw;
        line-height: 1;
        font-size: 12px;
        background: #fddb44;
        &:nth-child(1) {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
        }
        &:nth-child(2) {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
        .span {
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // border: 1px solid red;
        }
        &.selected {
          // background: white;
          background: black;
          color: #fddb44;
          // border-bottom: none;
          // &::before &::after{
          //   content: '';
          //   display:none;
          // }
        }
      }
    }
  }
}

.tags {
  background: white;
  font-size: 16px;
  // padding-left: 16px;
  height: 82vh; //TODO
  overflow: auto;
  > .tag {
    height: 6.4vh;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .content-wrapper {
      width: 88vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      > .delete {
        display: flex;
      }
          > .svg {
      padding: 0 3.2vw;
      width: 12vw;
      color: #666;
      svg {
        width: 5.4vw;
        height: 5.4vw;
        color: rgb(201, 35, 35);
      }
      // margin-right: 16px;
    }
    }
    > .svg {
      padding: 0 3.2vw;
      width: 12vw;
      color: #666;
      svg {
        width: 5.4vw;
        height: 5.4vw;
      }
      // margin-right: 16px;
    }
  }
}
.createTag-wrapper {
  height: 6.4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #767676;
  > svg{
    width: 4vw;
    height: 4vw;
  }
  .createTag {
     background: transparent;
    // color: white;
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
}
</style>
