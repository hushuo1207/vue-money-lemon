<template>
  <Layout class-prefix="layout">
    <div class="account">
      <div class="account-myself">
        <img src="@/assets/lemon.png" alt="lemon">
      </div>
      <div class="account-production">柠檬记账</div>
    </div>
    <div class="content">
      <div class="content-month" @click="handleClick">
          <DatePicker
            placement="left-end"
            :open="open"
            :value.sync="month"
            type="month"
            @on-change="handleChange"
        @on-clickoutside="handleAuthors"
              >
            <div class="abc">
              <div class="abc-year">{{ month.split("-")[0] }}年</div>
              <div class="abc-wrapper">
                <div class="month">
                  <span>{{ month.split("-")[1] }}</span
                  >月
                </div>
                  <div class="svg">
                    <Icon name="down"></Icon>
                  </div>

              </div>  
              
            </div>
        </DatePicker>
      </div>
      <div class="content-total">
        <div class="content-total-type">
          <div class="content-total-type-title">收入</div>
          <div class="content-total-type-amount">
            {{ amountTotal.incomeRecord }}
          </div>
        </div>
        <div class="content-total-type">
          <div class="content-total-type-title">支出</div>
          <div class="content-total-type-amount">
            {{ amountTotal.paymentRecord }}
          </div>
        </div>
      </div>
    </div>
    <div class="message" v-if="totalList.length !== 0">
      <div
        class="message-wrapper"
        v-for="(groupsList, index) in totalList"
        :key="index"
      >
        <div class="message-wrapper-date">
          <div class="date">
            {{ groupsList.title }} {{ weekDay(groupsList.title) }}
          </div>
          <div class="totals">
            <div class="payment" v-if="groupsList.paymentRecord !== 0">支出: {{ groupsList.paymentRecord }}</div>
            <div class="income" v-if="groupsList.incomeRecord !== 0">
              收入: {{ groupsList.incomeRecord }}
            </div>
          </div>
        </div>
        <router-link
          :to="{name: 'editrecord', params: {createdAt: item.createdAt}}"
          class="message-wrapper-content"
          v-for="(item, index) in groupsList.items"
          :key="index"
        >
          <div class="svg">
            <div class="wrapper-icon">
              <Icon :name="item.tags.iconName"></Icon>
            </div>
          </div>
          <div class="notes">{{ item.notes || item.tags.name }}</div>
          <div class="money">
            {{ item.type === "-" ? "-" : "" }} {{ item.amount }}
          </div>
        </router-link>
      </div>
    </div>
    <div class="message no-message" v-else>
      <div class="icon-wrapper">
          <div class="svg">
            <svg class="icon" aria-hidden="true"> 
                <use xlink:href="#icon-nomessage"/>
            </svg>
          </div>
          <div class="svg-content">暂无数据</div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
// import _, { keys } from "lodash";
import '@/assets/icon.js';

const { DatePicker } = require("view-design");

@Component({
  components: { DatePicker },
})
export default class DetailAccount extends Vue {
  type = "-";
  month = dayjs(new Date()).format("YYYY-MM-DD");
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  // created() {
  //   // let mon = dayjs(new Date());
  // }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  weekDay(date: string) {
    const week = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];

    return week[dayjs(date).day()];
  }
  get totalList() {
    // const today = new Date();
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
    if (newList.length === 0) {
      return [];
    }
    type Result = {
      title: string;
      paymentRecord?: number;
      incomeRecord?: number;
      items: RecordItem[];
    }[];
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
        return item.type === "-" ? sum + item.amount : sum;
      }, 0);
    });
    result.map((group) => {
      group.incomeRecord = group.items.reduce((sum, item) => {
        return item.type === "+" ? sum + item.amount : sum;
      }, 0);
    });
    return result;
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
  get amountTotal() {
    const payment = this.totalList.reduce((sum, a) => {
      return sum + (a.paymentRecord || 0);
    }, 0);
    const income = this.totalList.reduce((sum, a) => {
      return sum + (a.incomeRecord || 0);
    }, 0);
    const paymentRecord = this.dealData(payment) 
    const incomeRecord= this.dealData(income)

    return {paymentRecord, incomeRecord};
  }

  open = false;
  handleClick() {
    this.open = !this.open;
    if(!this.open) this.open = true;
  }
  handleChange(date: string) {
    this.month = date + "-01";
    this.open = !this.open;
  }
  handleAuthors () {
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
  background: #fddb44;
  height: 6vh;
  &-myself {
    height: 4vh;
    width: 18.4vw;
    padding: 1vh 5.2vw;
    img {
      height: 24px;
      width: 24px;
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
  // border: 1px solid red;
  background: #fddb44;
  overflow: hidden;
  &-month {
    // border: 1px solid red;
    width: 21.6vw;
    height: 11.7vh;
    .abc {
      height: 11.7vh;
      width: 21.6vw;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      &:after{
        content: '';
        display: block;
        width: 1px;
        height: 24px;
        background: #333;
        position: absolute;
        top: 50%;
        right: 0;
        // z-index: 1;
      }
      &-year {
        height: 3.1vh;
        width: 18vw;
        text-align: center;
        color: #696868;
        padding-top: 1.6vh;
      }
      &-wrapper {
        height: 7vh;
        width: 20vw;
        padding: 0 0.8vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .month {
          width: 13vw;
          font-size: 12px;
          padding-right: 4px;
          span {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .svg {
          width: 20px;
          height: 20px;
          padding: 0 0.3vw;
          > .icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  &-total {
    display: flex;
    justify-self: center;
    align-items: center;
    // border: 1px solid green;
    height: 11.7vh;
    width: 78.4vw;
    &-type {
      width: 39.2vw;
      &-title {
        width: 39.2vw;
        padding-left: 5.4vw;
        color: #696868;
      }
      &-amount {
        width: 39.2vw;
        padding-left: 5.4vw;
        font-size: 20px;
      }
    }
  }
}
.message {
  display: flex;
  flex-direction: column;
  height: 74.3vh; //  75.9
  // margin-top: 2vh;
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
        font-size: 12px;
        color: #858585;
      }
      > .totals {
        display: flex;
        flex-direction: row-reverse;
        text-align: right;
        width: 64vw;
        padding-right: 2vw;
        font-size: 12px;
        color: #858585;
        > .payment {
          width: 30vw;
          padding-right: 2vw;
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
      color: #000;
      > .svg {
        width: 56px;
        height: 56px;
        padding: 8px;
        > .wrapper-icon {
          padding: 5px;
          width: 40px;
          height: 40px;
          background: #f6f6f4;
          border-radius: 50%;
          .icon {
            width: 30px;
            height: 30px;
          }
        }
      }
      > .notes {
        width: 42.5vw;
        padding-left: 2vw;
      }
      > .money {
        width: 40.5vw;
        padding-right: 4vw;
        text-align: right;
      }
    }
  }
  &.no-message{
    justify-content: center;
    align-items: center;
    .icon-wrapper{
      .svg{
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

</style>
