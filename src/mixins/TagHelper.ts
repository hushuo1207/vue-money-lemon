import clone from "@/lib/clone";
import Vue from "vue";
import Component from "vue-class-component";

const map: { [key: string]: string } = {
  "tag name duplicated.": "标签名重复了",
};
//     console.log(uaString);
//     console.log(clone(uaString));
// if(uaString){
//     alert('kanwenxin');
// }

const ua = clone(navigator.userAgent);
//   console.log(navigator);
//   console.log('--------------');

//   console.log(ua);
//   console.log('--------------');

const uaString = ua.match(/WeChat/);

@Component
export class TagHelper extends Vue {
  createTag(aaa: { name: string; iconName: string }) {
    // if(name === null) return;
    this.$store.commit("createTag", aaa);
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || "未知错误");
    }
  }
}
