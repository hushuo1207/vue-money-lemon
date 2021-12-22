<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Types :value.sync="record.type" />
        <Notes @update:value="onUpdateNotes"/>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
        {{recordList}}
   </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

const version = window.localStorage.getItem('version') || '0';
// const recordList: Record[] = JSON.parse(window.localStorage.getItem ('recordList')||'[]');

// //数据库升级，也叫数据迁移
//     if (version ==='0.0.1'){
//         recordList.forEach(record => {
//             record.createAt  = new Date(2021, 0, 1);
//         });
//         //保存数据
//         window.localStorage.setItem('recordList', JSON.stringify(recordList))
//         //迁移
//     }

// window.localStorage.setItem('version', '0.0.2')
type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createAt?: Date
}

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue {   
    tags = ['衣','食','住','行','工资'];
    //recordList: Record[] = [];
    //读取localStorage数据
    recordList: Record[] = JSON.parse(window.localStorage.getItem ('recordList')||'[]');
    record: Record = {
        tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
        this.record.tags = value;
        console.log(value);
        
    }
    onUpdateNotes(value: string){
        this.record.notes = value;
        console.log(value);
        
    }
    onUpdateAmount(value: string){
        this.record.amount = parseFloat(value);
        console.log(value);

    }
    saveRecord(){
        //this.recodList.push(this.record);
        //该代码会出错，push的是引用，不是值，需要拷贝
        const record2: Record = JSON.parse(JSON.stringify(this.record))
        record2.createAt = new Date();
        this.recordList.push(record2);
        console.log(this.recordList);

        
    }
    @Watch('recordList')
    onRecordListChange(){
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
        console.log(this.recordList);
        
    }
}


</script>

<style lang="scss">
  .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
</style>