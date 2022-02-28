<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav />
    <div class="logo-wrapper" v-if="visiable" @click="log">
      <div class="logo-title">柠檬记账</div>
      <div class="logo-main">
          <img src="@/assets/images/qrcode.png" alt="柠檬记账二维码">
      </div>
      <div class="logo-footer">
          扫描二维码
          <br>
          在手机上使用体验更佳
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  @Prop() readonly classPrefix!: string;
  visiable: boolean = false;
  created() {
    if(this.width > 500){
        this.visiable = true;
    }
  }
  get width() {
      return document.documentElement.clientWidth;
  }
  log(){

      this.visiable = false;
  }

}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  //TODO 会产生页面滑动
  .logo-wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 100vh;
      width: 100vw;
      background: rgba(0,0,0,.5);
      z-index: 1;
      .logo-title{
          text-align: center;
          height: 48px;
          width: 360px;
          color: #000;
          line-height: 2;
          font-size: 24px;
          font-weight: bolder;
          background: #fdd844;

      }
      .logo-main{
            width: 360px;
            height: 360px;
          > img{
            width: 360px;
            height: 360px;
          }
        z-index: 2;
      }
      .logo-footer{
          text-align: center;
          width: 360px;
          height: 48px;
          color: #000;
          font-size: 16px;
          font-weight: bolder;
          background: #fdd844;
    }
  }
  .content {
    overflow: auto; //让手机超出长度是显示滚动条
    flex-grow: 1;
  }
}
</style>
