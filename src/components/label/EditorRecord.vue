<template>
  <div class="edit-wrapper">
    <header class="header">
      <div class="back" >back</div>
      <div class="title">
        <div class="svg">
          <Icon name="add"/>
        </div>
        <div class="svg-name">iconName</div>
      </div>
    </header>
    <main class="main">
      <div class="title">
          <div class="title-name">类型</div><div>----</div>
          <div class="title-name">金额</div><div>2000</div>
          <div class="title-name">日期</div><div>time</div>
          <div class="title-name">备注</div><div>beizhu</div>
      </div>
    </main>
    <footer>
      <button class="aaa">edit</button>
      <button class="aaa">delete</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class EditorRecord extends Vue {
  aaa='12';


  created(){
    console.log(this.$route.params);
  }
  // get router(){
  //   console.log('this.$route.paramsuserId');
  //   console.log(this.$route.params);
  //   return this.$route.params;
  // }
}
</script>

<style lang="scss" scoped>
</style>
