<template>
  <div class="wrapper">
    <div class="title">
      <div class="back" @click="goBack">back</div>
      <div class="title-name">添加支出类别</div>
      <div class="finish" @click="finish">完成</div>
    </div>
    <div class="name">
      <div class="name-icon">
        <Icon :name="currentName || 'add'" />
      </div>
      <div>
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
        <!-- <ul class="groups">
            <li v-for="tag in paymentList" :key="tag.name">
              <div class="gropus-icon" >
                <Icon name="tag.name"></Icon>
              </div>
            </li>
          </ul> -->
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

  toggleTag(name: string) {
    console.log("1");

    this.currentName = name;
    console.log(this.currentName);
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
    this.createTag({ name: this.value, iconName: this.currentName });

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
    height: 5.1vh;
    justify-content: center;
    align-items: center;
    background: yellow;

    .back {
      display: flex;
      width: 13vw;
      justify-content: center;
      align-items: center;
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
    border-bottom: 1px solid grey;
    &-icon {
      margin: 0 2.5vw;
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
      background: yellow;
      > .icon {
        margin: 2vw;
        width: 8vw;
        height: 8vw;
        color: black;
      }
    }
    input {
      border: none;
    }
  }
  > .content {
    display: flex;

    height: 60vh;
    > .groups-label {
      display: flex;
      flex-direction: column;
      //   height: 68vw;
      height: 50vh;
      flex-wrap: wrap;
      > .groups-name {
        display: flex;

        height: 8vh;
        width: 100vw;
      }
      > .groups {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-items: center;
        align-items: center;

        > .groups-icon {
          width: 20vw;
          height: 20vw;
          .icon-bgd {
            margin: 4vw 0 0 4vw;
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
            background: #f6f6f4;
            .icon {
              margin: 2vw 0 0 2vw;
              width: 8vw;
              height: 8vw;
              color: black;
            }
          }
          &.selected {
            .icon-bgd {
              background: yellow;
            }
          }
        }
      }
    }
  }
}
</style>
