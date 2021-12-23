<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Types :value.sync="record.type" />
        <Notes file-name="备注" placeholder="在这里输入备注..." @update:value="onUpdateNotes"/>
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
import model from '@/Models/recordList'
import tagListModel from '@/Models/tagListModel'



const recordList = model.fetch();
const tagList = tagListModel.fetch();


//const version = window.localStorage.getItem('version') || '0';
// const recordList: RecordItem[] = JSON.parse(window.localStorage.getItem ('recordList')||'[]');

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


@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue {   
    tags = tagList;
    //recordList: RecordItem[] = [];
    //读取localStorage数据
    /* @ts-ignore */
    recordList: RecordItem[] = recordList;
    /* @ts-ignore */
    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
        this.record.tags = value;
        // console.log(value);
        
    }
    onUpdateNotes(value: string){
        this.record.notes = value;
        // console.log(value);
        
    }
    saveRecord(){
        //this.recodList.push(this.record);
        //该代码会出错，push的是引用，不是值，需要拷贝
        /* @ts-ignore */
        const record2: RecordItem = model.clone(this.record);
        /* @ts-ignore */
        record2.createAt = new Date();
        this.recordList.push(record2);

        
    }
    @Watch('recordList')
    onRecordListChange(){
        model.save(this.recordList);
        
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