import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "@/api/mock.js"
import api from "@/api/api"
import { createPinia, storeToRefs } from "pinia"
import { useAllDataStore } from './stores'
function isRoute(to) {
    return router.getRoutes().filter(item => item.path === to.path).length > 0
}
router.beforeEach((to, from) => {
    if (to.path !== "login" && !token) {
        return { name: "login" }
    }
    if (!isRoute(to)) {
        return { name: "404" }
    }
})
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.config.globalProperties.$api = api

app.use(ElementPlus)
app.use(router).mount('#app')
const store = useAllDataStore()
const { token } = storeToRefs(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
