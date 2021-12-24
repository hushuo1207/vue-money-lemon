<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
        <div>
          <ol>
              <li v-for="(group, index) in result" :key="index">
                <h3 class="title">{{beautyfy(group.title)}}</h3>
                <ol>
                    <li class="record" v-for="(item, index) in group.item" :key="index">
                       <span>{{tagString(item.tags)}}</span>
                       <span class="notes">{{item.notes}}</span>
                       <!-- TODO 过长增加省略号 -->
                      <span>￥{{item.amount}}</span>
                    </li>
                </ol>
              </li>
          </ol>
        </div>
    </Layout>
</template>

<script  lang="ts">
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import dayjs from 'dayjs';
// const api = dayjs();
// console.log(api);


@Component({
    components: { Tabs}
})
export default class Statistics extends Vue {
    tagString(tags: string[]){
        console.log(tags.length);
        
        return tags.length === 0 ? '无': tags.join(',');
    }
    // TODO    tagString(tags: Tag[]){

    //     return tags.length === 0 ? '无': tags.join(',');
    // }
    beautyfy(string: string){
        const day = dayjs(string);
        const now = dayjs();
        console.log(dayjs(string).isSame(now.subtract(1 , 'day'), 'day'));
        
        if (dayjs(string).isSame(now, 'day')){
            return '今天';
        }else if (dayjs(string).isSame(now.subtract(1 , 'day'), 'day')){
            return '昨天';
        }else if(dayjs(string).isSame(now.subtract(2 , 'day'), 'day')){
            return '前天';
        }else if (dayjs(string).isSame(now, 'year')){
            return day.format('M月D日');
        }else {
            return string;
        }
        
    }
    get recordList () {
        return (this.$store.state as RootState).recordList;
    }
    get result () {
        const {recordList} = this;
        type HashTableValue = {title: string, item: RecordItem[]}

        const hashTable: {[key: string]: HashTableValue} = {};
        for (let i = 0; i < recordList.length; i++) {
            const [date, time] = recordList[i].createdAt!.split('T');
            hashTable[date] = hashTable[date] || {title: date, item: []};
             hashTable[date].item.push(recordList[i]);
        }


        return hashTable;
    }
    beforeCreate() {
        this.$store.commit('fetchRecords')
    }
    type = '-'
    intervalList = intervalList
    interval = 'day'
    recordTypeList = recordTypeList
}
</script>

<style scoped lang="scss">
    %item {
        padding: 0 16px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .title {
        @extend %item;
        border: 1px solid red;
    }
    .record {
        @extend %item;
        background: white;
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }

    ::v-deep .type-tabs-item{
        border: 1px solid red;
        &.selected{
            background: white;
        }
        &::after{
            display:none;
        }
    }
    ::v-deep .interval-tabs-item{
        height: 48px
    }
</style>