<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type" />
        <div class="createdAt">
            <Notes file-name="日期"
                type = "datetime-local"
                
                placeholder="在这里输入日期..."
               
                :value.sync="record.createdAt"/>
        </div>
        
        
        <div class="notes">
            <Notes file-name="备注" placeholder="在这里输入备注..."
                 
                 :value.sync="record.notes"/>
        </div>
        <Tags @update:value = "record.tags = $event" />
        <!-- {{nas}} -->
   </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
// import Types from '@/components/Money/Types.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '../components/Tabs.vue';
import clone from '@/lib/clone';
// import store from '@/store/index2'

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
    components: { NumberPad, Notes, Tags, Tabs },
    computed:{
        recordList() {
            
            return this.$store.state.recordList;
        } 
    }
})
export default class Money extends Vue {   
    // tags = store.tagList;
    //recordList: RecordItem[] = [];
    //读取localStorage数据
    // recordList = store.recordList;
    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };
    // a: any = navigator;
    // console.log('a');
    recordTypeList = recordTypeList
    created(){
        
        
        this.$store.commit('fetchRecords');
        // this.$store.commit('fetchTags');

    }

    // onUpdateTags(value: string[]) {
    //     this.record.tags = value;
    //     // console.log(value);
        
    // }
    // onUpdateNotes(value: string){
    //     this.record.notes = value;
    //     // console.log(value);
    //     //  console.log(this.$store.state);
        
    // }
    saveRecord(){
        //this.recodList.push(this.record);
        //该代码会出错，push的是引用，不是值，需要拷贝
        // console.log('222');
        
        // console.log(this.record); 
        if(!this.record.tags || this.record.tags.length === 0){
            return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord', this.record);
        if(this.$store.state.createRecordError === null) {
            window.alert('创建成功')
            this.record.notes = '';
        }

        
    }
    // @Watch('recordList')
    // onRecordListChange(){
    //     recordListModel.save();
        
    // }
}


</script>

<style lang="scss" scoped>
  ::v-deep .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
  .notes{
      padding: 6px 0;
  }
</style>