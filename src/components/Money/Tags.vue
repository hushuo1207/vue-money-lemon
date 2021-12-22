<template>
    <div class="tags">
            <div class="new">
                <button>新增标签</button>
            </div>
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
        </div>
</template>

<script lang="ts">
    export default {
        name: 'Tags',
        
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.tags{
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    > .current{
        display: flex;
        flex-wrap: wrap;
        > li {
            background: #d9d9d9;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            padding: 0 16px;
            margin-right: 12px;
        }
    }
    > .new{
        padding-top: 16px;
        button{
            background: transparent;
            border: none;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px; 
        }
    }
}
</style>