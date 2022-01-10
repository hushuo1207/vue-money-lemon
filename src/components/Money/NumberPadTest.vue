<template>
  <div class="layout"  :style="{height: `${h}` + 'px'}">
    <div class="cancel" @click="$router.back()">取消</div>
    <TabsTest
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="record.type"
    />
    <TagsTest
      :type.sync="record.type"
      class="tagArea"
      @update:value="record.tags = $event"
    />

    <div class="numberPad">
      <div class="notes-output">
        <div class="noteIcon"><Icon name="remark" /></div>
        <div class="notes">备注:</div>
        <div class="notesInput">
          <NotesTest
            class-prefix="notes"
            :value.sync="record.notes"
            placeholder="在这里输入备注..."
          />
        </div>
        <div class="output">{{ output }}</div>
      </div>
      <div class="buttons">
        <div class="button" @click="inputContent">7</div>
        <div class="button" @click="inputContent">8</div>
        <div class="button" @click="inputContent">9</div>
        <div class="button date">
          <DatePicker
            placement="left-end"
            :open="open"
            :value.sync="record.createdAt"
            type="date"
            @on-change="handleChange"
          >
            <a class="abc" href="javascript:void(0)" @click="handleClick">
              <Icon v-if="record.createdAt === day(new Date().toISOString()).format('YYYY-MM-DD')"
                 name="day"
              ></Icon>
              <template
                v-if="
                  record.createdAt ===
                  day(new Date().toISOString()).format('YYYY-MM-DD')
                ">
                今天<!--  TODO 有八小时误差-->
                </template>
              <template v-else>{{ record.createdAt }}</template>
            </a>
          </DatePicker>
        </div>
        <div class="button" @click="inputContent">4</div>
        <div class="button" @click="inputContent">5</div>
        <div class="button" @click="inputContent">6</div>
        <div class="button" @click="increase">
          <Icon name="plus" />
        </div>
        <div class="button" @click="inputContent">1</div>
        <div class="button" @click="inputContent">2</div>
        <div class="button" @click="inputContent">3</div>
        <div class="button" @click="decrease">
          <Icon name="minus" />
        </div>
        <div class="button" @click="inputContent">.</div>
        <div class="button" @click="inputContent">0</div>
        <div class="button delete" @click="remove">
          <Icon name="delete" />
        </div>

        <div v-if="equalSymbol" class="button ok" @click="saveRecord">OK</div>
        <div v-else class="button" @click="equalOutput">
          <Icon name="equal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import NotesTest from "@/components/Money/NotesTest.vue";
import TagsTest from "@/components/Money/TagsTest.vue";
import TabsTest from "@/components/Money/TabsTest.vue";
import recordTypeList from "@/constants/recordTypeList";
const { DatePicker } = require("view-design");
import day from "dayjs";

// console.log('DatePicker');
// console.log(DatePicker);

@Component({
  components: { NumberPadTest, NotesTest, DatePicker, TabsTest, TagsTest },
})
export default class NumberPadTest extends Vue {
  record: RecordItem = {
    tags: ({} as Tag),
    notes: "",
    type: "-",
    amount: 0,
    createdAt: day(new Date().toISOString()).format('YYYY-MM-DD'),
  };
  recordTypeList = recordTypeList;
  day = day;
  h = 0;
  created() {
    this.$store.commit("fetchRecords");
    console.log(this.h); 
    // this.$store.commit('fetchTags');
  }
  mounted() {
    console.log(this.h);
    this.h = document.body.clientHeight;
    console.log(this.h);
  }

  // } this.number.toString() ||''
  output: string = "0";
  // i: number =  0;
  inputContent(event: MouseEvent) {
    const div = event.target as HTMLDivElement;
    const input = div.textContent as string;

    if (this.output.length === 10) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      //console.log(this.output.split('.'));

      return;
    }
    if (this.output.indexOf(".") >= 0) {
      let arr = this.output.split(".");
      if (arr[1].length >= 2) {
        return;
      }
    }
    this.output += input;
  }
  remove() {
    if (this.output.length <= 1) {
      this.output = "0";
      return;
    }
    this.output = this.output.slice(0, -1);
  }
  clear() {
    this.output = "0";
  }
  equalNumber = 0;
  symbol = true;
  equalSymbol = true;//TODO 可优化
  increase() {
    this.equalNumber = parseFloat(this.output);
    this.output = "0";
    this.symbol = true;
    this.equalSymbol = false;
  }

  decrease() {
    this.equalNumber = parseFloat(this.output);
    this.output = "0";
    this.symbol = false;
    this.equalSymbol = false;
  }
  equalOutput() {
    if (this.symbol) {
      this.output = (this.equalNumber + parseFloat(this.output)).toString();

      let arr = this.output.split(".");
      if (arr[1] && arr[1].length > 2) {
        let array2 = arr[1].split("");
        this.output = arr[0] + "." + array2[0] + array2[1];
        //TODO  30.4+0.2 =30.59
      }

      this.equalSymbol = true;

      return;
    }
    const a = this.equalNumber - parseFloat(this.output);

    if (a < 0) {
      alert("不支持负数哦");
      this.output = "0";
    } else {
      this.output = a.toString();
      let arr = this.output.split(".");
      if (arr[1] && arr[1].length > 2) {
        let array2 = arr[1].split("");
        this.output = arr[0] + "." + array2[0] + array2[1];
      }
    }
    this.equalSymbol = true;
  }
  saveRecord() {
    this.record.amount = parseFloat(this.output);
    if (!this.record.tags || !this.record.tags) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("创建成功");
      this.record.notes = "";
    }
    this.output='0';
  }

  open: boolean = false;
  // value3: string = '';
  handleClick() {
    this.open = !this.open;
  }
  handleChange(date: string) {
    this.record.createdAt = date;
    this.open = false;
    // console.log(typeof date);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.layout{
  position: relative;
  // max-height: 600px;
  > .cancel{
  position: absolute;
  top: 4vw;
  right: 4vw;

  height: 24px;
  width: 48px;
  line-height: 1;
  font-size: 14px;
  text-align: right;
  // border: 1px solid red;
  }
  ::v-deep .type-tabs-item {
    height: 6vh;
    font-size: 18px;
    background: #fdd844;
    // border: 1px solid red;
    &.selected {
      background: #fdd844;
      // background: darken(yellow, 3%);
      border-bottom: 1px solid black;
      // &::before &::after{
      //   content: '';
      //   display:none;
      // }
    }
  }
  .tagArea {
    height: 61vh;
  }
  .numberPad {
    height: 33vh;
    .notes-output {
      // @extend %innerShadow;
      line-height: 1;
      font-family: Consolas, monospace;
      padding: 0 1vh;
      height: 5vh;
      display: flex;
      flex-direction: row;
      background: #f7f5f6;
      > .noteIcon {
        display: flex;
        align-items: center;
        justify-content: center;
      height: 5vh;
        width: 8vw;
        > .icon {
          width: 18px;
          height: 18px;
        }
      }
      > .notes {
        display: flex;
        align-items: center;
        justify-content: center;
      height: 5vh;
        width: 12vw;
        line-height: 1;
        font-size: 12px;
        padding:  0 0.5vw;
      }
      > .notesInput {
        display: flex;
        ::v-deep .notes-tabs{
          height: 5vh;
          width: 40vw;
          font-size: 12px;
          // border: 1px solid red;
        // overflow: hidden;
        } 

        //line-height: 1;
        // font-size: 20px;
      }
      > .output {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        //justify-content: center;
        height: 5vh;
        width: 38vw;
        // text-align: right;
        // align-content: center;
        line-height: 1;
        font-size: 24px;
        padding-right: 2vw;
        margin: auto;
      }
    }
    .buttons {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      > .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        height: 7vh;
        // background: transparent;
        border: none;
        //  &.ok{
        //  height: 64px;
        //     float: right;
        //  }
        // &.zero{
        // width: 25%*2;
        // }
        &.delete {
          height: 7vh;

          > .icon {
            width: 24px;
            height: 24px;
            //TODO 为什么会撑高元素？
          }
        }
        &.date {
          height: 7vh;
          // background: #fff177;
          //width: 24px;
        }
        background: #f7f5f6;
        border: 0.5px solid rgb(231, 230, 230);
        // &:nth-child(1) {
        //   background: $bg;
        // }
        // &:nth-child(2),
        // &:nth-child(5) {
        //   background: darken($bg, 4%);
        // }
        // &:nth-child(3),
        // &:nth-child(6),
        // &:nth-child(9) {
        //   background: darken($bg, 4 * 2%);
        // }
        // &:nth-child(4),
        // &:nth-child(7),
        // &:nth-child(10),
        // &:nth-child(13) {
        //   background: darken($bg, 4 * 3%);
        // }
        // &:nth-child(8),
        // &:nth-child(11),
        // &:nth-child(14) {
        //   background: darken($bg, 4 * 4%);
        // }
        // &:nth-child(12),
        // &:nth-child(15) {
        //   background: darken($bg, 4 * 5%);
        // }
        // &:nth-child(16) {
        //   background: darken($bg, 4 * 6%);
        // }
      }
    }
  }
  .abc {
    color: black;
  }
}

</style>
