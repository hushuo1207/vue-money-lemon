<template>
  <Layout class-prefix="layout">
    <div class="tabs-wrapper" @click="toDay">
      <TabsTest
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="type"
      />

    </div>

    <div class="title-content" @click.capture="toDay">
      <TabsTest
        class-prefix="record"
        :data-source="intervalList"
        :value.sync="interval"
      />
    </div>

    <div class="interval-wrapper">
      <ul class="interval"  >
        <li class="interval-list" :class="{selected: today === item.value}" v-for="(item, index) in chooseDate" :key="index"
              @click="toogle(item.value)">
              {{item.text}}
        </li>
      </ul>
    </div>
    <div class="total-wraper">
      <div class="total-wraper-money">总{{type === '-' ? '支出': '收入'}}: {{totalAverage.total}}</div>
      <div class="total-wraper-average">平均值: {{totalAverage.average}}</div>
      <!-- <div class="maxValues">{{maxValues}}</div>  -->
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions" />
    </div>
    <div class="list">
      <div class="list-title">{{type === '-' ? '支出': '收入'}}排行榜</div>
      <div class="list-content" v-if="itemsList.length !==0">
        <ul class="items-wrapper">
          <li class="item"  v-for="(item, index) in itemsList" :key="index">
            <div class="svg">
              <div class="wrapper-icon">
                <Icon :name="itemsList[index].iconName"></Icon>
              </div>
            </div>
            <div class="proportion">
              <div class="proportion-content">
                <div class="max-proportion">{{itemsList[index].name}} {{itemsList[index].proportion/100}}%</div>
                <div class="max-value">{{itemsList[index].amount}}</div>
              </div>
              <div class="proportion-line">
                <div class="line" ref="lineproportion" :style="`width: ${itemsList[index].proportionWidth+2}vw;`"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-content no-message" v-else>
        <div class="icon-wrapper">
          <div class="svg">
            <svg class="icon" aria-hidden="true"> 
                <use xlink:href="#icon-nomessage"/>
            </svg>
          </div>
          <div class="svg-content">暂无数据</div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import TabsTest from "@/components/Money/TabsTest.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import clone from "@/lib/clone";

import dayjs from "dayjs";
var weekOfYear = require("dayjs/plugin/weekOfYear");
var isLeapYear = require("dayjs/plugin/isLeapYear"); // 导入插件
import "dayjs/locale/zh-cn"; // 导入本地化语言
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale("zh-cn"); // 使用本地化语言
dayjs.extend(weekOfYear);

import Chart from "@/components/Chart.vue";
import '@/assets/icon.js'

@Component({
  components: { TabsTest, Chart },
  computed:{
    lineproportion(){

    }
  }
})
export default class Statistics extends Vue {
  updated() {
    // const div = (this.$refs.chartWrapper as HTMLDivElement);
    // div.scrollLeft = div.scrollWidth;
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  intervalList = intervalList;
  interval: "week"| "month"| "year" = "week";
  recordTypeList = recordTypeList;
  today = dayjs(new Date()).format("YYYY-MM-DD"); //由第二个子选项改变值
  get groupsList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [
      {
        title: dayjs().format("YYYY-MM-DD"),
        items: [],
        total: 0
      },
    ];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) =>
          dayjs(b.createdAt as string).valueOf() -
          dayjs(a.createdAt as string).valueOf()
      );
    if (newList.length === 0) {
      return [{
        title: dayjs().format("YYYY-MM-DD"),
        items: [],
        total: 0
      },];
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
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  get items(): Map<string, number> {
    if(this.groupsList[0].items === [] ) return new Map;
    const interval = this.interval

    const resultList = new Map<string, number>();
    for(let i=0; i < this.groupsList.length;i++){
      if(dayjs(this.today).isSame(dayjs(this.groupsList[i].title), interval)){
        for(let item of this.groupsList[i].items){
          const a = item.tags.name + '-' + item.tags.iconName;
          resultList.set(a, item.amount + (resultList.get(a) || 0));
        }
      }
    }
    
    return resultList;
  }
  get itemsList () {
    type ItemList = {
      name: string;
      iconName: string;
      amount: number;
      proportion: number;
      proportionWidth: number;
    }
    const keys = [...this.items.keys()];
    const values = [...this.items.values()];
    
    if(keys.length === 0){return []}
    const item:ItemList = ({} as ItemList);
    const itemList:ItemList[] = [];
    let total = 0;
    for(let i=0;i < keys.length;i++){
      const a = keys[i].split('-');
      item.name = a[0];
      item.iconName = a[1];
      item.amount = values[i];
      item.proportion = 0;
      total += values[i];
      
      itemList[i] = clone(item);
    }
    let total2=0;
    itemList.map((group) => {
      group.proportion =  this.decimals(group.amount / total);
      total2 += group.proportion;
    });
    itemList[keys.length-1].proportion +=(10000-total2);
    const newList = clone(itemList)
      .sort((a, b) =>b.amount - a.amount);
    const width=newList[0].amount;
    newList.map((group) => {
      group.proportionWidth =  (this.decimals(group.amount / width)*82)/10000;
    });
    return newList;
  }
  decimals(average: number){
    if(average === 0) return 0;
    let c = parseInt((average*10000).toString().split('.')[0]);
    return c;
  }
  get days() {
    const [year, month] = [dayjs(this.today).year(), dayjs(this.today).month()];
    const d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (
      (year % 4 === 0 && year % 100 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      if (month === 1) {
        return 29;
      } else {
        return d[month];
      }
    } else {
      return d[month];
    }
  }
  get groupByInterval(): Map<string, number> {
    let result = new Map<string, number>();
    switch (this.interval) {
      case "week":
        result = this.groupByWeek;
        break;
      case "month":
        result = this.groupByMonth;
        break;
      case "year":
        result = this.groupByYear;
        break;
    }
      console.log('2');
      console.log(result);
      

    return result;
  }
  weekKeyList(key: number){
    switch (key) {
      case 0:
        return 6;
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 5;
    }
    return 0;
  }
  get groupByWeek(): Map<string, number> {
    const keys = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const result = new Map<string, number>();
    let i: number;
    // 初始化
    for (i = 0; i < keys.length; i++) {
      result.set(keys[i], 0);
    }
    let r;
    for (r of this.groupsList) {
      if (!dayjs(this.today).isSame(r.title, "week")) {
        continue;
      }
      const key = keys[this.weekKeyList(dayjs(r.title).day())];
      const amount = result.get(key) as number;
      result.set(key, amount + (r.total || 0));
    }
    return result;
  }
  get groupByMonth(): Map<string, number> {
    const keys: string[] = [];
    const result = new Map<string, number>();
    let i: number;
    // 初始化
    for (i = 1; i <= this.days; i++) {
      keys.push(i.toString());
    }
    for (i = 0; i < keys.length; i++) {
      result.set(keys[i], 0);
    }
    let r;
    for (r of this.groupsList) {
      if (!dayjs(this.today).isSame(r.title, "month")) {
        continue;
      }
      const key = dayjs(r.title).date().toString();
      const amount = result.get(key) as number;
      result.set(key, amount + (r.total || 0));
    }
      console.log('3');
      console.log(result);

    return result;
  }
  get groupByYear(): Map<string, number> {
    const keys = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    const result = new Map<string, number>();
    let i: number;
    for (i = 0; i < keys.length; i++) {
      result.set(keys[i], 0);
    }
    let r;
    for (r of this.groupsList) {
      if (!dayjs(this.today).isSame(r.title, "year")) {
        continue;
      }
      const key = keys[dayjs(r.title).month()];
      const amount = result.get(key) as number;
      result.set(key, amount + (r.total || 0));
    }

    return result;
  }
  get chooseDate() {
    let result  ;
    switch (this.interval) {
      case "week":
        result = this.weeks;
        break;
      case "month":
        result = this.months;
        break;
      case "year":
        result = this.years;
        break;
    }
    console.log(result);
    
    return result;
  }
  yearString(a: string) {
    return dayjs(a).year().toString();
  }
  yearTitltText(a: string){
    return dayjs(a).year() + '年'
  }
  get years() {
    const index = this.groupsList.length;
    const toYear = dayjs(new Date()).format("YYYY-MM-DD");

    type Result = { text: string; value: string }[];
    const result: Result = [
      {
        text: '今年',
        value: toYear,
      },
    ];
    const index2 =
      dayjs(toYear).year() - dayjs(this.groupsList[index - 1].title).year();
    if (index2 > 0) {
      for (let i = 1; i <= index2; i++) {
        let a = dayjs(toYear).subtract(i, "year").format("YYYY-MM-DD");
        result.push({ text: this.yearTitltText(a), value: a });
      }
    }
    return result;
  }
  monthString(a: string, b: string) {
    return dayjs(a).month() - dayjs(b).month();
  }
  monthDay(a: string){
    return dayjs(a).year() + "-" + (dayjs(a).month() + 1) + "月";
  }
  get months() {
    const index = this.groupsList.length;
    const toYear = dayjs(new Date()).format("YYYY-MM-DD");

    type Result = { text: string; value: string }[];
    const result: Result = [
      {
        text: '本月',
        value: toYear,
      },
    ];
    const index2 =
      dayjs(toYear).year() - dayjs(this.groupsList[index - 1].title).year();
    const index3 = this.monthString(toYear, this.groupsList[index - 1].title);
    const monthIndex = index2 * 12 + index3;
    if (monthIndex > 0) {
      for (let i = 1; i <= monthIndex; i++) {
        let a = dayjs(toYear).subtract(i, "month").format("YYYY-MM-DD");
        result.push({ text: this.monthDay(a), value: a });
      }
    }
    return result;
  }
  weekDay(a: string) {
    //@ts-ignore
    return dayjs(a).year() + "-" + dayjs(a).week() + "周";
  }
  get weeks() {
    const index = this.groupsList.length;
    const toYear = dayjs(new Date()).format("YYYY-MM-DD");
    type Result = { text: string; value: string }[];
    const result: Result = [{ text: "本周", value: toYear }];
    const yyy = dayjs(toYear).year() - dayjs(this.groupsList[index-1].title).year();
    const mmm= dayjs(toYear).month() - dayjs(this.groupsList[index-1].title).month();
    const ddd= dayjs(toYear).date() - dayjs(this.groupsList[index-1].title).date();
    const monthIndex = yyy * 365 + mmm * 12 + ddd;
   
    if(monthIndex < 7 && monthIndex > -7) return result;
    if (monthIndex > 0) {
      for (let i = 1; i <= monthIndex; i++) {

        let a = dayjs(toYear).subtract(i, "week").format("YYYY-MM-DD");
        result.push({ text: this.weekDay(a), value: a });
        if (dayjs(a).isSame(dayjs(this.groupsList[index - 1].title), "week")) {
          break;
        }
      }
    }
    return result;
  }
  toogle(date: string){
    this.today = date;
    console.log(date);
    
  }
  toDay(){
    
    // setTimeout(()=>{
      console.log('1');
      
      this.today = dayjs(new Date()).format("YYYY-MM-DD");
      // this.updated();
    // }, 1000)
    
  }
  dealData(number:number){
    const aa = number.toString().split('.');
    if(aa[1]){
      if(aa[1].length === 1){
        aa[1] = aa[1] + '0'
      }
      const d = aa[1].split('');
      return aa[0] + '.' + d[0] + d[1];
    }else{
      return aa[0] + '.00';

    }
  }
  get totalAverage() {
    const keys = [...this.groupByInterval.keys()];
    const values = [...this.groupByInterval.values()];
    let amount = 0;
    for(let i=0; i < keys.length ;i++){
      amount += values[i];
    }
    let average = this.dealData(amount / keys.length);
    let total = this.dealData(amount);
    
    return {total, average}
  }
  toArray(value: number, length: number): number[] {
      const result: number[] = [];
      for (let i = 0; i < length; i++) {
          result.push(value);
      }
      return result;
  }
  get maxValues(){
    const values = [...this.groupByInterval.values()];
    return Math.max(...values);
  }
  get chartOptions() {
    const keys = [...this.groupByInterval.keys()];
    const values = [...this.groupByInterval.values()];
    return {
      grid: {

        top: '5%',
        bottom: '10%'
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
        {
          name: '平均线',
          type: 'line',
          data: this.toArray(parseFloat(this.totalAverage.average), keys.length),
          symbol: 'none',
          lineStyle: {
              type: 'dashed',
              color: '#999999',
              width: 1,
              opacity: 0.5
          }
        }, 
        {
          name: '最大值',
          type: 'line',
          data: this.toArray(this.maxValues, keys.length),
          symbol: 'none',
          lineStyle: {
              color: '#999999',
              width: 1,
              opacity: 0.5
          }
        }
      ],
    };
  }

  // @Watch('recordList.tags')
  // onRecordListChange(){
  //     recordListModel.save();

  // }
}
</script>

<style scoped lang="scss">
.tabs-wrapper{
  height: 5.8vh;
  ::v-deep .type-tabs {
    position:relative;
  }
  ::v-deep .type-tabs-item {
    height: 5.8vh;
    font-size: 18px;
    background: #fddb44;
    &.selected {
      // border-bottom: 1px solid black;
      // background: white;
      // background: darken(#fff177, 3%);
      &::after{           
          content: '';
          position: absolute;
          width: 50%;
          height: 2px;
          bottom: 0;
          background: black;
       }
    }
  } 
}
.title-content {
  display: flex;
  height: 5.8vh;
  background: #fddb44;
  justify-content: center;
  align-items: center;
  ::v-deep .record-tabs {
    width: 90vw;
    // justify-content: center;
    // align-items: center;
    border: 1px solid black;
    border-radius: 4px;

    &-item {
      height: 4vh;
      width: 30vw;
      line-height: 1;
      font-size: 12px;
      background: #fddb44;
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
      }
      &.selected {
        // background: white;
        background: black;
        color: #fddb44;
        // border-bottom: none;
        // &::before &::after{
        //   content: '';
        //   display:none;
        // }
      }
    }
  }
}
.interval-wrapper {
  height:4.6vh;
  width: 100vw;
  .interval {
    height: 4.6vh;
    width: 100vw;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    overflow:auto;

    &-list {
      height: 4.6vh;
      align-items: center;

      display: flex;
      flex-shrink: 0;
      padding: 0 4vw;
      line-height: 1.25;
      font-size: 12px;
      color: #858585;
      &.selected {
        border-bottom: 1px solid black;
        color: black;
      }
    }
  }
}
.total-wraper{
  height: 7.4vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #696868;
  padding: 0.6vh 0 0 2vw;
  position: relative;
  &-money{
    height: 3.4vh;
  }
  &-average{
    height: 3.4vh;

  }
  // > .maxValues{
  // position: absolute;
  // right: 4vw;
  // bottom: 0;

  // }
}
.chart-wrapper {
  // max-width: 100%;
    // height: 20.8vh;
  .chart {
    width: 100%;
    &-wrapper {
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

}

.list{
  height: 48vh;
  &-title{
    height: 5.6vh;
    font-size: 16px;
    font-weight: bolder;
    padding-top: 1.6vh;
    padding-left: 4vw;
  }
  &-content{
    height: 42.4vh;
    overflow:auto;
     .items-wrapper{
      height: 7vh;
      // display: flex;
      // flex-direction: row;
       .item {
        height: 7vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
        .svg{
          height: 44px;
          width: 44px;
          padding: 7px;
          > .wrapper-icon {
            padding: 5px;
            width: 30px;
            height: 30px;
            background: #f2f4f3;
            border-radius: 50%;
            .icon {
              width: 20px;
              height: 20px;
            }
          }
        }
        .proportion{
          height: 7vh;
          width: 88vw;
          &-content{
            height: 3.5vh;
            width: 84vw;
            padding-right: 4vw;
            display: flex;
            align-content: space-between;
            .max-proportion{
              width: 42vw;

            }
            .max-value{
              width: 42vw;
              text-align: right;
              
            }
          }
          &-line{
            height: 3.5vh;
            width: 84vw;
            padding: 0 4vw 2vh 0;
            .line{
              height: 1.5vh;
              width: 40vw; //TODO宽度可以改 
              background: #fdd844;
              border-radius: 0.75vh;

            }
          }
        }
        
      }
    }
    &.no-message{
      // border: 1px solid red;
      .icon-wrapper{
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .svg{
          // top: 25%;
          // left: 25%;
          width: 80px;
          height: 80px;
              
          > .icon {
            width: 80px;
            height: 80px;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
      
          }
          &-content{
            color: #7a7a7a;
            text-align: center;
          }
        }
      }
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
  // border: 1px solid red;
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
.interval {
  font-size: 14px;
  height: 48px;
}
// ::v-deep .interval-tabs-item {
//   height: 48px;
// }
</style>
