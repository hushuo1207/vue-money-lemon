<template>
    <div class="numberPad">
      <div class="notes-output">
        <div class="noteIcon"><Icon name ="add" /></div>
        <div class="notes">备注:</div>
        <div class="notesInput">
            <NotesTest placeholder="在这里输入备注..."/>
        </div>
        <div class="output">{{output}}</div>
      </div>
      <div class="buttons">
          <div class="button" @click="inputContent">7</div>
          <div class="button" @click="inputContent">8</div>
          <div class="button" @click="inputContent">9</div>
          <div class="button date" @click="remove">
            <NotesTest
                type = "date"

                placeholder="jt"
                
                />
          </div>
          <div class="button" @click="inputContent">4</div>
          <div class="button" @click="inputContent">5</div>
          <div class="button" @click="inputContent">6</div>
          <div class="button" @click="clear">+</div>
          <div class="button" @click="inputContent">1</div>
          <div class="button" @click="inputContent">2</div>
          <div class="button" @click="inputContent">3</div>
          <div class="button" @click="yyyy">-</div>
          <div class="button" @click="inputContent">.</div>
          <div class="button" @click="inputContent">0</div>
          <div class="button delete" @click="remove">
            <Icon name='delete' />
          </div>
          <div class="button ok" @click="ok" >OK</div>
      </div>  

      <!-- <div class="createdAt">
            <NotesTest file-name="日期"
                type = "date"
                
                placeholder="在这里输入日期..."
               
                />
        </div>
         :value.sync="record.createdAt" 
                 :value.sync="record.notes"
        <div class="notes">
            <NotesTest file-name="备注" placeholder="在这里输入备注..."
                />
        </div> -->

    </div>
    
    
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import NotesTest from '@/components/Money/NotesTest.vue';
import Icon from '../Icon.vue';
import dayjs from 'dayjs'
@Component({
    components: { NumberPadTest, NotesTest, Icon}
})
export default class NumberPadTest extends Vue {
    @Prop(Number) readonly value!: number ;


    output: string = this.value.toString();
    // i: number =  0;
    inputContent(event: MouseEvent){
        const div = (event.target as HTMLDivElement);
        const input = div.textContent as string;
        
        if (this.output.length === 8){return;}
        if (this.output === '0'){
            if('0123456789'.indexOf(input) >= 0){
               this.output = input;
               
           }else{
               this.output += input;
               
           }
           return;
        }
        // if (this.output.indexOf('.') >= 0 && input === '.'){
        //   i++
        //     return;
        // }else if(i==2) {
        //   i = 0;
        //    return;
            
        // }
        if (this.output.indexOf('.') >= 0 && input === '.'){
          console.log(this.output.split('.'));
          
          return;
        }
        if (this.output.indexOf('.') >= 0){
          let arr = this.output.split('.');
          if( arr[1].length >= 2){return;}
          
          //return;
        }

        // console.log(this.i);
        // if(this.i >= 2){
        //   return;
        // }
        this.output += input;
    }
    remove() {
        if(this.output.length <= 1){this.output = '0';return;}
        this.output = this.output.slice(0, -1);
    }
    clear() {
        this.output = '0';
    }
    yyyy(){
      const input = document.createElement('input');
      console.dir(input);
      
    }
    ok () {
      const number = parseFloat(this.output)
        this.$emit('update:value', number);
        this.$emit('submit', number);
        this.output = '0';
    
    }

}


</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';


  // .notes{
  //     padding: 6px 0;
  // }
  // .createdAt{
  //   background: transparent;
  //   color: red;
  // }
.numberPad{
  height: 33vh;
    .notes-output{
        // @extend %clearFix;
        @extend %innerShadow;
        line-height: 1;
        // font-size: 20px;
        font-family: Consolas, monospace;
        padding: 0 1vh;
        // text-align: right;
        height: 6vh;
        display: flex;
        flex-direction: row;
        // flex-;
        // @extend %clearFix;
        > .noteIcon{
          display: flex;
          align-items: center;
          justify-content: center;
          width:10vh;
          > .icon{
            width: 24px;
            height: 24px
          }

        }
        > .notes{
          
          display: flex;
          align-items: center;
          justify-content: center;
          width:16vh;
          line-height: 1;
          font-size: 16px;
          padding: 6px 0;
        }
        > .notesInput{
          display: flex;
          width: 40vh;
          //line-height: 1;
          // font-size: 20px;


        }
        > .output{
          
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          //justify-content: center;
          width: 32vh;
          // text-align: right;
          // align-content: center;
          line-height: 1;
          font-size: 24px;
          padding: 6px;
          margin:auto;

        }
    }
    .buttons{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      > .button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        height: 7vh;
        background: transparent;
        border: none;
        //  &.ok{
            //  height: 64px;
        //     float: right;
        //  }
        // &.zero{
        // width: 25%*2;
        // }
        &.delete{
        height: 7vh;

          > .icon{
            width: 24px;
            height: 24px;
            //TODO 为什么会撑高元素？
          }
        }
        &.date{
        height: 7vh;
        width: 24px;
        
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
          background: darken($bg, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(14) {
          background: darken($bg, 4*4%);
        }
        &:nth-child(12), &:nth-child(15){
          background: darken($bg, 4*5%);
        }
        &:nth-child(16) {
          background: darken($bg, 4*6%);
        }
        }
        
    }
}
</style>