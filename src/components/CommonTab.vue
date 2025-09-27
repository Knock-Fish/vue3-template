<script setup>
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAllDataStore } from '@/stores'
const store = useAllDataStore()
const { tags } = storeToRefs(store)
const { selectMenu,undataTages } = store
const route = useRoute()
const router = useRouter()
const handleMenu = (tag) => {
    router.push(tag.name)
    selectMenu(tag)
}
const handleClose = (tag,index)=>{
    // 通过pinia管理的
    undataTages(tag)
    // 如果点击的关闭的tag 不是对应的当前页面
    if(tag.name !== route.name) return
    if(index === tags.value.length){
        selectMenu(tags.value[index-1])
        router.push(tags.value[index-1].name)
    }else{
        selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }
}
</script>

<template>
    <div class="tags">
        <el-tag 
        v-for="(tag, index) in tags" 
        :key="tag.name" 
        :closable="tag.name !== 'home'"
        :effect="route.name === tag.name ? 'dark' : 'plain'" 
        @click="handleMenu(tag)"
        @close="handleClose(tag,index)"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<style scoped>
.tags {
    margin: 20px 0 0 20px;
}

.el-tag {
    margin-right: 10px;
}
</style>
