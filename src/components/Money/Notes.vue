<template>
    <div>
        <label class="notes">
            <span class="name">
            </span>
            <input  type="text" placeholder="在此输入备注..."
              :value="value" @input="onInput">
        </label>
            
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
    value = '';
    onInput(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
    }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.notes{
    font-size: 14px;
    background: #f5f5f5;
    display: flex;
    padding-left: 16px;
    align-items: center;
    .name{
        padding-right: 16px;

    }
    input{
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>