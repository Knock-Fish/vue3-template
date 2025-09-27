<template>
    <el-aside class="aside" :width="width">
        <el-menu background-color="#545c64" text-color="#fff" :collapse="isCollapse" :collapse-transition="false"
            :default-active='activeMenu'>
            <h3 v-show="!isCollapse && width == '180px'">通用后台管理系统</h3>
            <h3 v-show="isCollapse">后台</h3>

            <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="handleMenu(item)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>

            <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path" @click="handleMenu(subItem)">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem, subIndex) in hasChildren" :index="subItem.path" :key="subItem.path">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            
        </el-menu>
    </el-aside>
</template>
<script setup>
import { computed } from 'vue'
import { useAllDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
const store = useAllDataStore()
const { isCollapse } = storeToRefs(store)
const { menuList } = storeToRefs(store)
const noChildren = computed(() => menuList.value.filter(item => !item.children))
const hasChildren = computed(() => menuList.value.filter(item => item.children))
// width
const width = computed(() => isCollapse.value ? '64px' : '180px')
const router = useRouter()
const route = useRoute()
const activeMenu = computed(() => route.path)
const { selectMenu } = store
const handleMenu = (item) => {
    router.push(item.path)
    selectMenu(item)
}
</script>
<style lang="less" scoped>
.aside {
    transition: all .3s;
}

.icons {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.el-menu {
    border-right: none;

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}

.el-aside {
    height: 100vh;
    background-color: #545c64;
}
</style>