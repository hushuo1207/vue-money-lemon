<template>
  <div class="edit-wrapper">
    <header class="header">
      <div class="back" @click="goBack" >
        <Icon name="back"/>
      </div>
      <div class="title">
        <div class="title-svg" v-if="visiable">
          <div class="svg">
            <Icon :name="record.tags.iconName"/>
          </div>
          <div class="name">{{record.tags.name}}</div>
        </div>
        <div class="title-svg" v-else>
          <div class="svg">
            <Icon :name="recordDuplacation.tags.iconName"/>
          </div>
          <div class="name">{{recordDuplacation.tags.name}}</div>
        </div>
      </div>
      <div class="back back-hidden" >
        <Icon name="back"/>
      </div>
    </header>
    <main class="main">
      <div class="main-title"  v-if="visiable">
          <div class="main-title-name">类型</div>
          <div class="main-title-content">
            {{record.type === '+'? '收入' : '支出'}}
          </div>
      </div>
      <div class="main-title-type" v-else>
          <TabsTest
            class-prefix="type"
            :data-source="recordTypeList"
            :value.sync="recordDuplacation.type"
          />
      </div>
      <div class="main-title">
        <div class="main-title-name">金额</div>
        <div v-if="visiable" class="main-title-content">{{record.amount}}</div>
        <div v-else  class="main-title-content">
          <input type="text" :placeholder="recordDuplacation.amount" :value="recordDuplacation.amount" @input="onValueChanged($event.target.value)">
        </div>
      </div>
      <div class="main-title">
        <div class="main-title-name">日期</div>
        <div class="main-title-content">{{record.createdAt}}</div>
      </div>
      <div class="main-title">
        <div class="main-title-name">备注</div>
        <div v-if="visiable" class="main-title-content">{{record.notes || record.tags.name}}</div>
        <div v-else  class="main-title-content">
          <input type="text" :placeholder="recordDuplacation.notes || recordDuplacation.tags.name"  v-model="recordDuplacation.notes" >
        </div>
      </div>
    </main>
    <div class="tags" v-if="visiable">
    </div>
    <div class="tags" v-else>
      <TagsTest
        :type.sync="recordDuplacation.type"
        class="tagArea"
        @update:value="recordDuplacation.tags = $event"
      />
    </div>
    <footer v-if="visiable">
      <div class="footer">
        <button class="button" @click="updating">编辑</button>
        <button class="button" @click="deleteRecord">删除</button>
      </div>
    </footer>
    <footer  v-else>
      <div class="footer">
        <button class="button" @click="updateRecord">完成</button>
        <button class="button" @click="cancelEdit">取消</button>
      </div>
    </footer>
    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import TagsTest from "../Money/TagsTest.vue";
import TabsTest from "../Money/TabsTest.vue";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: {TagsTest, TabsTest}
})
export default class EditorRecord extends Vue {
  createdAt: string = '';
  visiable: boolean = true;
  recordTypeList = recordTypeList;
  // get show(){
  //   return this.visiable;
  // }
  recordDuplacation: RecordItem = {
    tags: ({} as Tag),
    notes: "",
    type: "-",
    amount: 0,
    createdAt: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
  };

  created(){
    this.createdAt = this.$route.params.createdAt || '';

    // const recordList = this.$store.state.recordList;
    // let index = -1;
    // for (let i = 0; i < recordList.length; i++) {
    //   if(this.createdAt === this.$store.state.recordList[i].createdAt){
    //     index = i;
    //     break;
    //   }
    // }
    if(this.createdAt){
      this.$store.commit('setCreatedAt', this.createdAt)
    }else{
      this.createdAt = this.$store.state.createdAt;
    }

  }
  get record(): RecordItem{
    const recordList = this.$store.state.recordList;
    let index = -1;
    for (let i = 0; i < recordList.length; i++) {
      if(this.createdAt === this.$store.state.recordList[i].createdAt){
        index = i;
        break;
      }
    }
    const record: RecordItem = clone(this.$store.state.recordList[index]);
    this.recordDuplacation = clone(this.$store.state.recordList[index]);
    return record;
    
  }
  goBack(){
    this.$router.back();
  }
  onValueChanged(value: string){
    this.record.amount = parseFloat(value);
    
  }
  updateRecord(){
    if(window.confirm("确定要删除吗？") === false){ 
      this.recordDuplacation = this.record;
      return;
      };
    
    this.$store.commit('updateRecord', this.recordDuplacation);
    this.updating();// && window.confirm("确定要更新记录吗？")
    
  }
  updating(){
    this.visiable = !this.visiable;
  }
  deleteRecord(){
    if(window.confirm("确定要删除吗？") === false){ return};
    this.$store.commit('removeRecord', this.createdAt);
    this.$router.replace('/');
  }
  cancelEdit(){
    this.recordDuplacation = this.record;
    this.updating();
  }
  // @Watch('recordDuplacation'){

  // }
}
</script>

<style lang="scss" scoped>
.edit-wrapper{
  display: flex;
  flex-direction: column;
  position: relative;
  .header{
    display: flex;
    flex-direction: row;
    background: #fddb44;;
    .back{
      padding: 20px;
      > .icon{
        width: 24px;
        height: 24px;
        color: black;
        font-family: blod;
      }
      &.back-hidden{
        visibility: hidden;
      }
    }
    .title{
      // width:
      display: flex;
      flex-grow: 1;
      height: 13vh; //TODO
      justify-content: center;
      // align-items: center;
      &-svg{
        .svg{
          margin-top: 4px;
          padding: 9px;
          
            width: 66px;
            height: 66px;
          background: white;
          border-radius: 50%;
          > .icon{
            width: 48px;
            height: 48px;
            
          }
        }
        .name{
          padding-top: 4px;
          text-align: center;
        }
      }
    }
  }
  .main{
    // height: ;
    &-title{
      height: 8.5vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #dddddd;
      &-name{
        width: 80px;
        text-align: center;
        color: #7e7e7e;
      }
      &-content{
        width: 240px;
        input{
          height: 4vh;
          width: 200px;
          background: transparent;
          border: none;
          border: 1px solid #dddddd;
          border-radius: 4px;


        }
      }
      &-type{  
        height: 8.5vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #dddddd;
              background: white;

        ::v-deep .type-tabs {
          width: 60vw;
          border: 1px solid black;
          border-radius: 4px;

          &-item {
            height: 4vh;
            width: 30vw;
            line-height: 1;
            font-size: 16px;
              background: white;
              color: black;
            &:nth-child(1) {
              border-bottom-left-radius: 4px;
              border-top-left-radius: 4px;
              border-right: 1px solid black;
            }
            &:nth-child(2) {
              border-bottom-right-radius: 4px;
              border-top-right-radius: 4px;
            }
            &.selected {
              border-bottom: none;
            background: #fddb44;
            color: black;
            }
          }
        }

      }  
    }
  }
  .tags{
    height: 45.5vh;
    display: flex;
    overflow: auto;
    // flex-grow: 1;
    
  }
  footer{
    .footer{
      height: 7.5vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      > .button{
        border: none;
        background: none;
        width: 50vw;
      }
    }
  }
  .bottom{
    height: 0;
    position: fixed;
    bottom: 0;//fixed 定位使得压缩不存在；
    
  }
}
</style>
