<template>
  <Layout>
    <TabsTest class-prefix="type"
                :data-source="recordTypeList"
                :value.sync="type"/>
    <div class="title-content" @click="log">
    <TabsTest class-prefix="record"
                :data-source="intervalList"
                
                :value.sync="interval"/>
    </div>

    <div class="interval">本周，本月，本年---待添加</div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions" />
    </div>
    <!--  TODO 按每周，每日，每月显示   <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" /> -->
    <div>
      <div>支出排行榜</div>
      <div>
        <ul>
          <li>
            <div><Icon name ='add' ></Icon></div>
            <div>
              <div><span>餐饮 75.7%</span><span>560</span></div>
              <div class="line"></div>
            </div>
          </li>
          <li>{{reverse}}2</li>
        </ul>
      </div>

    </div>
    
    <!-- <ol v-if="groupedList.length" class="totalwww">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautyfy(group.title) }} <span>{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
             TODO 过长增加省略号 
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div> -->
  </Layout>
</template>

<script lang="ts">
import TabsTest from "@/components/Money/TabsTest.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";

import Chart from "@/components/Chart.vue";
import _ from "lodash";
import day from "dayjs";
// const ECharts: any = require('vue-echarts').default;
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

// console.log('Echarts');
// console.log(Echarts); 

@Component({
  components: { TabsTest, Chart },
})
export default class Statistics extends Vue {


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

    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt as string).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt as string), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt as string).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
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
    this.$store.commit("fetchRecords");
  }
  get reverseArray() {
    const today = new Date();
    const array = [];
    const reverseArray = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupedList, {
        title: dateString,
      });
      array.push({ date: dateString, value: found ? found.total : 0 });
      reverseArray[29 - i] = array[i];
    }
  return reverseArray;
  }
  monthData = {
    '01': 31,
    '02': 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  }
  // yearData = {
  //   '01': 31,
  //   '02': 28,
  //   '03': 31,
  //   '04': 30,
  //   '05': 31,
  //   '06': 30,
  //   '07': 31,
  //   '08': 31,
  //   '09': 30,
  //   '10': 31,
  //   '11': 30,
  //   '12': 31,
  // }
  month=dayjs(new Date()).format("YYYY-MM-DD")
  get totalList() {
    const today = new Date();
    console.log(dayjs(today).isSame(this.month, "month"));

    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => dayjs(r.createdAt).isSame(this.month, "month"))
      .sort(
        (a, b) =>
          dayjs(b.createdAt as string).valueOf() -
          dayjs(a.createdAt as string).valueOf()
      );
      
      // console.log(newList);
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; paymentRecord?: number; incomeRecord?: number;items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt as string).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt as string), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt as string).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.paymentRecord = group.items.reduce((sum, item) => {
        return item.type === '-' ? sum + item.amount : sum + 0;
        
      }, 0);
    });
    result.map((group) => {
      group.incomeRecord = group.items.reduce((sum, item) => {
        return item.type === '+' ? sum + item.amount : sum + 0;

      }, 0);
    });
    return result;
  }
  get reverse() {
    const array = [];
    const reverseArray = [];
    const aa = this.month.split('-');
    const a = aa[1];
    //@ts-ignore
    const index = this.monthData[a];
    console.log(index);
    const today = aa[0] + '-' + aa[1] + '-' + index;
    console.log(today);
    
    for (let i = 0; i < index; i++) {
      const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupedList, {
        title: dateString,
      });
      array.push({ date: day(dateString).format("D"), value: found ? found.total : 0 });
      reverseArray[index - i - 1] = array[i];
    }
    console.log(reverseArray);
    
  return reverseArray;
  }
  get surce(){

    return ''
  }
  get chartOptions() {
    const keys = this.reverse.map((item) => item.date);
    const values = this.reverse.map((item) => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
        // height: 160
      },
      xAxis: {
        type: "category",
        data: keys,

        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: "#666" } },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(0);
            // TODO 已经弃用的api
          },
          fontSize: 8,
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        show: true,
        triggerOn: "click",
        formatter: "{c}",
        position: "top",
      },
      series: [
        {
          // symbol: "emptyCircle",
          // symbolSize: 4,
          // itemStyle: {  opacity: 0 },
          type: "line",
          data: values,

          
        },
      ],
    };
  }
  type = "-";
  intervalList = intervalList;
  interval = "week";
  recordTypeList = recordTypeList;
  log(){
    console.log(this.interval);
    
  }

  // @Watch('recordList.tags')
  // onRecordListChange(){
  //     recordListModel.save();

  // }
}
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  height: 6vh;
  font-size: 18px;
  background: #fff177;
  // border: 1px solid red;
  &.selected {
    // background: white;
    background: darken(#fff177, 3%);
    // &::before &::after{
    //   content: '';
    //   display:none;
    // }
  }
}
.title-content {
  display: flex;
  height: 5.8vh;
  background: yellow;
  justify-content: center;
  align-items: center;
   ::v-deep .record-tabs {
    width: 75vw;
    // justify-content: center;
    // align-items: center;
    border: 1px solid black;
    border-radius: 4px;

    &-item {
      height: 4vh;
      width: 25vw;
      line-height: 1;
      font-size: 16px;
      background: yellow;
      // border: 1px solid black;
      &:nth-child(1) {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
      &:nth-child(2) {
        border-left: 1px solid black;
        border-right: 1px solid black;
      }
      &:nth-child(3) {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
      .span {
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // border: 1px solid red;
      }
      &.selected {
        // background: white;
        background: black;
        color: yellow;
        // border-bottom: none;
        // &::before &::after{
        //   content: '';
        //   display:none;
        // }
      }
    }
  }
}
.echarts {
  max-width: 100%;
  height: 400px;
}
.chart {
  width: 100%;
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
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.noResult {
  padding: 16px;
  text-align: center;
}
.interval{
    font-size: 14px;
    height: 48px;
}
// ::v-deep .interval-tabs-item {
//   height: 48px;
// }
.totalwww{
  overflow: auto;
}
</style>
