<template>
  <div class="tags">
    <ul class="current">
      <li
        class="labels"
        v-for="tag in taglist"
        :key="tag.id"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
        @click="toggleTag(tag)"
      >
        <div class="iconRadius">
          <Icon :name="tag.iconName" />
        </div>
        {{ tag.name }}
      </li>
      <router-link to="/labels" class="labels">
        <div class="iconRadius">
          <Icon name="add" />
        </div>
        add
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import Icon from "../Icon.vue";

@Component({
  components: { Icon },
})
export default class TagsTest extends mixins(TagHelper) {
   @Prop({required: true}) readonly type!: string;
  //为了保证在本组件下不修改其他组件传来的值

  get taglist() {
    if (this.type === '-'){
      return this.$store.state.paymentList;
      }
    else{
      return this.$store.state.incomeList;
      }
  }
  get tagType() {
    return this.type;
  }
  // get type() {
  //   return this.type;
  // }
  created() {
    this.$store.commit("fetchTags");
    // this.$store.commit("fetchTagsIncome");
    // console.log(this.type);
    
    //console.log(this.$store.state.paymentList);
  }
  selectedTag: Tag[] = [];
  previousTag: Tag = { id: "", name: "" , iconName: ""};
  // id: string = '';
  //indexPreivous: number = -1;

  toggleTag(tag: Tag) {
    //const index = this.selectedTag.indexOf(tag);
    // console.log(index);
    if (this.previousTag.id === '') {
      this.selectedTag.push(tag);
      this.previousTag = tag;
      this.$emit("update:value", this.selectedTag);
      return;
    }
    if (this.previousTag !== tag) {
      this.selectedTag.splice(0, 1);
      this.selectedTag.push(tag);
      this.previousTag = tag;
      this.$emit("update:value", this.selectedTag);
      return;
    }

    // if (index >= 0) {
    //   this.selectedTag.splice(index, 1);
    // } else {
    //   this.selectedTag.push(tag);
    // }
    // this.$emit("update:value", this.selectedTag);
    // console.log('1');
    // console.log(this.selectedTags);
  }
  createTag(){
    //TODO 后期标签可选
      const name = window.prompt('请输入标签名')
      if (!name){
         return window.alert('标签不能为空');
      }
      this.$store.commit('createTag', {name,iconName:'add'});

  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: white;
  flex-grow: 1;
  font-size: 14px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  > .current {
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
      &.selected {
        // background: #fff177;
        // color: black;
        .iconRadius {
          background: #fff177;
          color: black;
        }
      }
      .iconRadius {
        background: #f6f6f4;

        width: 48px;
        height: 48px;
        border-radius: 50%;
        .icon {
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
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
