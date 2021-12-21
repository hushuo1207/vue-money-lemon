<template>
    <div>
        <hr>
    <router-link to="/money"><button>记账 </button></router-link>
    <router-link to="/labels"><button>标签 </button></router-link>
    <router-link to="/statistics"><button>统计 </button></router-link>
    <hr>
    <router-link to="/error"><button>测试路由 </button></router-link>
    </div>
</template>

<script>
    export default {
        name: 'Nav'
    }
</script>

<style scoped>

</style>