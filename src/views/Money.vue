<template>
    <Layout class-prefix="layout">
        <NumberPad />
        <Types  />
        <Notes />
        <Tags :data-source.sync="tags" @xxx="yyy" />
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import Component from 'vue-property-decorator';

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue {   
    tags = ['衣','食','住','行','hehda'];
        
}


</script>

<style lang="scss">
  .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
</style>