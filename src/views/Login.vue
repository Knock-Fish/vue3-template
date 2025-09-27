<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useAllDataStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const store = useAllDataStore()
const router = useRouter()
const { updateMenuList,addMenu } = store
let { token } = storeToRefs(store)
const loginForm = reactive({
    username: '',
    password: ''
})
const { proxy } = getCurrentInstance()
const handleLogin = async () => {
    const res = await proxy.$api.getMenu(loginForm)
    updateMenuList(res.menuList)
    token = res.token
    router.push('/home')
    addMenu(router)
}
</script>
<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h1>欢迎登录</h1>
            <el-form-item>
                <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped lang="less">
.body-login {
    width: 100%;
    height: 100vh;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: cover;
    overflow: hidden;
}

.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 250px auto;

    h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>