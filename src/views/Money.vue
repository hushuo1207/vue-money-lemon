<template>
    <Layout class-prefix="layout">
        <NumberPad />
        <Types />
        <Notes />
        <Tags />
    </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue'
import Notes from '@/components/Money/Notes.vue'
import Tags from '@/components/Money/Tags.vue'
import Types from '@/components/Money/Types.vue'
 export default {
    name: "Money",
    components: { NumberPad, Notes, Tags, Types }
}


</script>
<style lang="scss">
  .layout-content{
    //   border: 1px solid red;
      display: flex;
      flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>

</style>