<template>
    <svg class="icon" @click="$emit('click', $event)"> 
        <use :xlink:href="'#icon-' + name" />
    </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import '../assets/icon.js'

// let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
// try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error)}
//
@Component    
export default class Icon extends Vue {
    @Prop() name!: any;

}
</script>

<style lang="scss" scoped>

.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>