<template>
    <div>
        <label class="notes">
            <span class="name">
                备注
            </span>
            <input class="value" type="text" placeholder="在此输入备注...">
        </label>
            
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Notes',
        
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