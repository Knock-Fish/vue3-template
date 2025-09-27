<template>
    <div class="exception">
        404
        <el-button class="btn-home" @click="goHome">回到上一个页面</el-button>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const goHome=()=>{
    router.go(-2)
}
</script>
<style></style>