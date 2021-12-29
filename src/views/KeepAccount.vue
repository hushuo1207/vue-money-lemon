<template>
    <Layout class-prefix="layout">
        <NumberPadTest :value.sync="record.amount" @submit="saveRecord" />

        <TagsTest @update:value = "record.tags = $event" />
        <TabsTest class-prefix="type" :data-source="recordTypeList" :value.sync="record.type" />
        <!-- {{nas}} -->
   </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import NumberPadTest from '@/components/Money/NumberPadTest.vue';
import NotesTest from '@/components/Money/NotesTest.vue';
import TagsTest from '@/components/Money/TagsTest.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import TabsTest from '@/components/Money/TabsTest.vue';
import clone from '@/lib/clone';


@Component({
    components: { NumberPadTest, NotesTest, TagsTest, TabsTest },
    computed:{
        recordList() {
            
            return this.$store.state.recordList;
        } 
    }
})
export default class KeepingAccount extends Vue {   
    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };
    recordTypeList = recordTypeList
    created(){
        
        
        this.$store.commit('fetchRecords');
        // this.$store.commit('fetchTags');

    }
    saveRecord(){
        if(!this.record.tags || this.record.tags.length === 0){
            return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord', this.record);
        if(this.$store.state.createRecordError === null) {
            window.alert('创建成功')
            this.record.notes = '';
        }

        
    }
}


</script>

<style lang="scss" scoped>

::v-deep .type-tabs-item{
    height: 48px;
    font-size: 24px;
    background: #fff177;
    // border: 1px solid red;
    &.selected{
        // background: white;
        background: darken(#fff177, 3%);
        // &::before &::after{
        //   content: '';
        //   display:none;
        // }
    }
    
}
::v-deep .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
  .notes{
      padding: 6px 0;
  }
  .createdAt{
    background: transparent;
    color: red;
  }
//   <div>input[type="date"]::-webkit-calendar-picker-indicator {
//     color: rgba(0, 0, 0, 0);
//     opacity: 1;
//     display: block;
//     background: url(https://mywildalberta.ca/images/GFX-MWA-Parks-Reservations.png) no-repeat;
//     width: 20px;
//     height: 20px;
//     border-width: thin;
// }
// </div>
</style>