<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Types :value.sync="record.type" />
        <div class="notes">
            <Notes file-name="备注" placeholder="在这里输入备注..." @update:value="onUpdateNotes"/>
        </div>
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
import store from '@/store/index2'

// import recordListModel from '@/Models/recordList'
// import tagListModel from '@/Models/tagListModel'

//const version = store.localStorage.getItem('version') || '0';
// const recordList: RecordItem[] = JSON.parse(store.localStorage.getItem ('recordList')||'[]');

// //数据库升级，也叫数据迁移
//     if (version ==='0.0.1'){
//         recordList.forEach(record => {
//             record.createAt  = new Date(2021, 0, 1);
//         });
//         //保存数据
//         store.localStorage.setItem('recordList', JSON.stringify(recordList))
//         //迁移
//     }

// store.localStorage.setItem('version', '0.0.2')


@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue {   
    tags = store.tagList;
    //recordList: RecordItem[] = [];
    //读取localStorage数据
    /* @ts-ignore */
    recordList = store.recordList;
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
        
        store.createRecord(this.record);

        
    }
    // @Watch('recordList')
    // onRecordListChange(){
    //     recordListModel.save();
        
    // }
}


</script>

<style lang="scss">
  .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
  .notes{
      padding: 6px 0;
  }
</style>