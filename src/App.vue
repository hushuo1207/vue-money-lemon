<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default class App extends Vue {

}


</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;

  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: white;
}
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #333;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: rgb(122, 122, 122);
    &.router-link-exact-active {
      color: #f0e14c;
    }
  }
}
</style>
