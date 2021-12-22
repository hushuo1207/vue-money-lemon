<template>
    <Layout>
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="new">
                <button>新增标签</button>
            </div>
        </div>
        <div>
            <label class="notes">
                <span class="name">
                    备注
                </span>
                <input class="value" type="text" placeholder="在此输入备注...">
            </label>
            
        </div>
        <div>
            <ul class="types">
                <li class="selected">支出</li>
                <li>收入</li>
            </ul>
        </div>
        <div class="numberPad">
            <div class="output">100</div>
            <div class="buttons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>OK</button>
                <button>0</button>
                <button>.</button>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
 export default {
     name: 'Money'
 }


</script>

<style lang="scss" scoped>
//   .layout-content {
//     display: flex;
//     flex-direction: column-reverse;
//   }
.types{
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li{
        width: 50%;
        line-height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
        }
        
    }
}

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


.tags{
    font-size: 14px;
    padding: 16px;
    > .current{
        display: flex;

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