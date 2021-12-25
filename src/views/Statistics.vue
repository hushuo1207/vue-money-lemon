<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart class="chart" :options="chartOptions"/>
        </div>
        <!--  TODO 按每周，每日，每月显示   <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" /> -->
          <ol v-if="groupedList.length">
              <li v-for="(group, index) in groupedList" :key="index">
                <h3 class="title">{{beautyfy(group.title)}} <span>{{group.total}}</span></h3>
                <ol>
                    <li class="record" v-for="(item, index) in group.items" :key="index">
                       <span>{{tagString(item.tags)}}</span>
                       <span class="notes">{{item.notes}}</span>
                       <!-- TODO 过长增加省略号 -->
                      <span>￥{{item.amount}}</span>
                    </li>
                </ol>
              </li>
          </ol>
          <div v-else class="noResult">
              目前没有相关记录
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
import clone from "@/lib/clone";

import Chart from '@/components/Chart.vue';

// const ECharts: any = require('vue-echarts').default;
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

// console.log('Echarts');
// console.log(Echarts);


@Component({
    components: { Tabs, Chart}
})
export default class Statistics extends Vue {

    get chartOptions () {
        let data =[];
        for (let i = 0; i <= 360; i++) {
            let t =i/180 * Math.PI;        ;
            let r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i])
        }
        return{
            grid: {
                left: 0,
                right: 0,
            },
            xAxis: {
                type: 'category',
                data: [
                    '1', '2', '3', '4', '5', '6', '7',
                    '1', '2', '3', '4', '5', '6', '7',
                    '1', '2', '3', '4', '5', '6', '7',
                    '1', '2', '3', '4', '5', '6', '7',
                    '29', '30'
                    ],
                    axisTick: {alignWithLabel: true},
                    axisLine: {lineStyle: {color:'#666'}}
            },
            yAxis: {
                type: 'value',
                show: false
            },
            tooltip: {
                show: true,
                triggerOn: 'click',
                formatter: '{c}',
                position: 'top'
            },
            series: [
                {
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
                    data: [
                        150, 230, 224, 218, 135, 147, 260,
                        150, 230, 224, 218, 135, 147, 260,
                        150, 230, 224, 218, 135, 147, 260,
                        150, 230, 224, 218, 135, 147, 260,
                        1, 2
                    ],
                    type: 'line'
                }
            ]

        };
    }
    mounted(){
        const div = (this.$refs.chartWrapper as HTMLDivElement);
        div.scrollLeft = div.scrollWidth;
    }
    tagString(tags: Tag[]){
        // console.log(tags.length);
        
        return tags.length === 0 ? '无': tags.map(t => t.name).join('、');
    }
    beautyfy(string: string){
        const day = dayjs(string);
        const now = dayjs();
        // console.log(dayjs(string).isSame(now.subtract(1 , 'day'), 'day'));
        
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
    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt as string).valueOf() - dayjs(a.createdAt as string).valueOf());

      if (newList.length === 0) {return [];}
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt as string).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt as string), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt as string).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
        //   console.log(sum);
        //   console.log(item);
          return sum + item.amount;
        }, 0);
      });
    //   console.log(result);
      
      return result;
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
    .echarts{
        max-width: 100%;
        height: 400px
    }
    .chart {
        width: 430%;
        &-wrapper {
            overflow: auto; 
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
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
    .noResult{
        padding: 16px;
        text-align: center;
    }
    ::v-deep .type-tabs-item{
        background: #c4c4c4;
        // border: 1px solid red;
        &.selected{
            background: white;
            &::after{
                display:none;
            }
        }
        
    }
    ::v-deep .interval-tabs-item{
        height: 48px
    }
</style>