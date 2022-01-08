<template>
  <Layout class-prefix="layout">
    <div class="account">
      <div class="account-myself">
        <Icon name="add" />
      </div>
      <div class="account-production">柠檬记账</div>
    </div>
    <div class="content">
      <div class="content-month" @click="selectMonth">
        <DatePicker
          placement="left-end"
          :open="open"
          :value.sync="month"
          confirm
          type="month"
          @on-change="handleChange"
          @on-clear="handleClear"
          @on-ok="handleOk"
        >
          <div class="abc" @click="handleClick">
            <div class="abc-year">2021</div>
            <div class="abc-wrapper">
              <div class="month">
                <span>01</span> 月
              </div>
              <div class="svg">
                <Icon name="day" ></Icon></div>
              
            </div>
            
          </div>
        </DatePicker>
      </div>
      <div class="content-total">
        <div class="content-total-type">
          <div class="content-total-type-title">收入</div>
          <div class="content-total-type-amount">{{ amountTotal.paymentRecord }}</div>
        </div>
        <div class="content-total-type">
          <div class="content-total-type-title">支出</div>
          <div class="content-total-type-amount">{{ amountTotal.incomeRecord }}</div>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="message-wrapper" v-for="(groupsList, index) in totalList" :key="index">
        <div class="message-wrapper-date">
          <div class="date">{{ groupsList.title }} sunday</div>
          <div class="totals">
            <div class="payment">支出: {{ groupsList.paymentRecord }}</div>
            <div class="income">收入: {{ groupsList.incomeRecord }}</div>
          </div>
        </div>
        <div class="message-wrapper-content" v-for="(item, index) in groupsList.items" :key="index">
          <div class="svg">
            <div class="wrapper-icon">
              <Icon :name="item.tags[0].iconName"></Icon>
            </div>
          </div>

          <div class="notes">{{item.notes || item.tags[0].name}}</div>
          <div class="money">{{item.type === '-' ? '-' : ''}} {{item.amount}}</div>
        </div>
      </div>
    </div>
    <!-- <div>{{groupedList}}</div> -->
  </Layout>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
const { DatePicker } = require("view-design");
import _ from "lodash";

@Component({
  components: { DatePicker },
})
export default class KeepingAccount extends Vue {
  // value =  '';
  type = "-";
  month = new Date().toISOString().split("T")[0];
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  selectMonth() {
    // console.log("month");
  }
  created() {
    // console.log('1');
    // console.log(this.paymentRecordList);
    // console.log('2');
    // console.log(this.incomeRecordList);
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get paymentRecordList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === "-")
      .sort(
        (a, b) =>
          dayjs(b.createdAt as string).valueOf() -
          dayjs(a.createdAt as string).valueOf()
      );
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
    //    console.log('result');
    //  console.log(result);

    return result;
  }
  get incomeRecordList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === "+")
      .sort(
        (a, b) =>
          dayjs(b.createdAt as string).valueOf() -
          dayjs(a.createdAt as string).valueOf()
      );
      
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
    //    console.log('result');
    //  console.log(result);

    return result;
  }
  get totalList() {
    // const paymentRecord = this.paymentRecordList;
    // const incomeRecord = this.incomeRecordList;
    // if  (paymentRecord === [] || incomeRecord === []){return [];}
    // console.log(paymentRecord);
    // console.log(incomeRecord);
    const today = new Date();
    // const array = [];
    // const index = parseInt(dayjs(today).format("D"));
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
     console.log(result[0].paymentRecord);
     console.log(result[0].incomeRecord);
     console.log(result);
    return result;
  }
  get amountTotal() {
    const paymentRecord = this.totalList.reduce((sum, a) => {
        return sum + (a.paymentRecord || 0);

      }, 0);
       console.log(paymentRecord);
      
    const incomeRecord = this.totalList.reduce((sum, a) => {
        return sum + (a.incomeRecord || 0);
    }, 0);
    console.log(incomeRecord);
    const amountTotal = {paymentRecord, incomeRecord}
    return amountTotal;
  }

  open: boolean = false;
  // value3: string = '';
  handleClick() {
    // console.log(this.value);
    this.open = !this.open;
  }
  handleChange(date: string) {
    //this.record.createdAt = date;
    // this.value = date;
    this.month = date + "-01";
    console.log(this.month);
    this.open = !this.open;
  }
  handleClear() {
    this.open = false;
  }
  handleOk() {
    this.open = false;
  }
}
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: row;
  background: yellow;
  height: 6vh;
  &-myself {
    height: 6vh;
    width: 18.4vw;
    padding: 2vw 5.2vw;
    .icon {
      height: 8vw;
      width: 8vw;
    }
  }
  &-production {
    font-size: 20px;
    width: 90.2vw;
    padding-left: 20vw;
  }
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 11.7vh;
  width: 100vw;
  // border-bottom: 1px solid red;
  background: yellow;

  &-month {
    width: 21.6vw;
    height: 11.7vh;
    .abc{
    height: 11.7vh;
    width: 21.6vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
      &-year{
    height: 4.7vh;
    width: 18vw;

padding-top: 2vh;
      }
      &-wrapper{
    height: 7vh;
    width: 18vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

        .month{
    width: 12vw;
          
          font-size: 14px;
          padding-right: 4px;
          span{
          font-size: 20px;

          }
        }
        .svg{
    width: 6vw;
          height: 6vw;
          padding: 0.3vw;
          > .icon{
    width: 5.4vw;
          height: 5.4vw;
          }
        }
      }
    }
  }
  &-total {
    display: flex;
    justify-self: center;
    align-items: center;
    width: 78.4vw;
    &-type {
      width: 39.2vw;
      &-title {
        width: 39.2vw;
    padding-left: 5.4vw;

      }
      &-amount {
        width: 39.2vw;
    padding-left: 5.4vw;
      }
    }
  }
}
.message {
  display: flex;
  flex-direction: column;
  height: 68vh; //  75.9
  margin-top: 2vh;
  overflow: auto;
  &-wrapper {
    &-date {
      display: flex;
      justify-self: center;
      align-items: center;
      height: 4.6vh;
      //   border: 1px solid red;

      > .date {
        width: 36vw;
        padding-left: 2vw;
      }
      > .totals {
        display: flex;
        flex-direction: row-reverse;
        text-align: right;
        width: 64vw;
        padding-right: 2vw;

        > .payment {
          width: 32vw;
        }
        > .income {
          width: 32vw;
        }
      }
    }
    &-content {
      display: flex;
      justify-self: center;
      align-items: center;
      height: 7.1vh;
      //   width: 100vw;
      //   border: 1px solid red;
      border-top: 1px solid #f6f6f4;
      > .svg {
        width: 15vw;
        height: 15vw;
        padding: 1.5vw;
        > .wrapper-icon {
          padding: 2vw;
          width: 12vw;
          height: 12vw;
          background: #f6f6f4;
          border-radius: 50%;
          .icon {
            width: 8vw;
            height: 8vw;
          }
        }
      }
      > .notes {
        width: 42.5vw;
        padding-left: 2vw;
      }
      > .money {
        width: 42.5vw;
        padding-right: 2vw;
        text-align: right;
      }
    }
  }
}
</style>
