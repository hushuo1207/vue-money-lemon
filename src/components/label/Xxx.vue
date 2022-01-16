<template>
  <div class="wrapper">
    <div class="title">
      <div class="back" @click="goBack">
          <Icon name="back"></Icon>
        </div>
      <div class="title-name">添加{{ typeText }}类别</div>
      <div class="finish" @click="finish">完成</div>
    </div>
    <div class="name">
      <div class="name-icon">
        <Icon :name="currentName || 'add'" />
      </div>
      <div class="input">
        <input v-model="value" type="text" placeholder="请输入类别名称..." />
      </div>
    </div>
    <div class="content">
      <div class="groups-label">
        <div class="groups-name">娱乐</div>
        <div class="groups">
          <div
            class="groups-icon"
            v-for="(item, index) in paymentList"
            :key="index"
            :class="{ selected: currentName === item.name }"
            @click="toggleTag(item.name)"
          >
            <div class="icon-bgd">
              <Icon :name="item.name" />
            </div>
          </div>
        </div>
      </div>
      <div class="groups-label">
        <div class="groups-name">娱乐</div>
        <div class="groups">
          <div
            class="groups-icon"
            v-for="(item, index) in paymentList"
            :key="index"
            :class="{ selected: currentName === item.name }"
            @click="toggleTag(item.name)"
          >
            <div class="icon-bgd">
              <Icon :name="item.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import paymentList from "@/constants/paymentList";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHelper";

@Component
export default class Xxx extends mixins(TagHelper) {
  paymentList = paymentList;
  currentName = "";
  value = "";
  creared() {
    // console.log(this.$route);
  }
  get type() {
    return this.$route.query.q;
  }
  get typeText() {
    if (this.type === "-") {
      return "支出";
    }
    return "收入";
  }
  toggleTag(name: string) {
    this.currentName = name;
  }
  goBack() {
    this.$router.back();
  }
  finish() {
    if (!this.value) {
      alert("类别名称不能为空");
      return;
    }
    if (!this.currentName) {
      alert("请选择一个图标");
      return;
    }
    this.createTag({
      type: (this.type as string),
      name: this.value,
      iconName: this.currentName,
    });

    if (this.$store.state.createTagError === null) {
      this.$router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  > .title {
    display: flex;
    height: 6vh;
    justify-content: center;
    align-items: center;
    background: #fddb44;

    .back {
      display: flex;
      width: 13vw;
      justify-content: center;
      align-items: center;
      > .icon{
        width: 24px;
        height: 24px;

      }
      //   padding: 0 4px;
    }
    .title-name {
      display: flex;
      width: 74vw;
      justify-content: center;
      align-items: center;
    }
    .finish {
      display: flex;
      width: 13vw;
      justify-content: center;
      align-items: center;
    }
  }
  .name {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
    width: 100vw;
    height: 8.4vh;
    border-bottom: 1px solid #b6b6b6;
    &-icon {
      margin: 0 4vw;
      padding: 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fddb44;
      > .icon {
        // margin: 2vw;
        width: 30px;
        height: 30px;
        color: black;
      }
    }
    .input{
        
      input {
        width: 80vw;
        border: none;
        background: transparent;
        // background: #f5f5f5;

      }
    }
  }
  > .content {
    display: flex;
    flex-direction: column;
    height: 85.6vh;
    // border: 1px solid red ;
    overflow: auto;
    > .groups-label {
      display: flex;
      flex-direction: column;
      //   height: 68vw;
      // height: 50vh;
      // border: 1px solid red ;
      // flex-wrap: wrap;
      > .groups-name {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8vh;
        width: 100vw;
      }
      > .groups {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        // justify-items: center;
        align-items: center;
        // height: 85.6vh;
        > .groups-icon {
          width: 20vw;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-bgd {
            width: 40px;
            height: 40px;
            padding: 5px;
            border-radius: 50%;
            background: #f6f6f4;
            .icon {
              width: 30px;
              height: 30px;
              color: #636060;
            }
          }
          &.selected {
            .icon-bgd {
              background: #fddb44;
              .icon{
              color: black;

              }
            }
          }
        }
      }
    }
  }
}
</style>
