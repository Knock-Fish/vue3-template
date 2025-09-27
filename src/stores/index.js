import { defineStore } from "pinia";
export const useAllDataStore = defineStore("allData", {
    state: () => ({
        isCollapse: false,
        currentMenu: null,
        menuList: [],
        token: "",
        routerList: [],
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            },
        ],
    }),
    actions: {
        // import.meta 元属性将特定上下文的元数据暴露给 JavaScript 模块。它包含了这个模块的信息，例如这个模块的 URL
        getImageUrl: user => new URL(`../assets/images/${user}.png`, import.meta.url).href,
        selectMenu(val) {
            if (val.name === "home") {
                this.currentMenu = null
            } else {
                this.currentMenu = val
                let index = this.tags.findIndex((item) => item.name === val.name)
                index === -1 ? this.tags.push(val) : ""
            }
        },
        undataTages(tag) {
            let index = this.tags.findIndex(item => item.name === tag.name)
            this.tags.splice(index, 1);
        },
        updateMenuList(val) {
            this.menuList = val
        },
        addMenu(router) {
            const menu = this.menuList
            const module = import.meta.glob('../views/**/*.vue')
            const routeArr = []
            menu.forEach(item => {
                if (item.children) {
                    item.children.forEach((val) => {
                        let url = `../views/${val.url}.vue`
                        val.component = module[url]
                        routeArr.push(...item.children)
                    })
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = module[url]
                    routeArr.push(item)
                }
            })
            this.routerList = []
            let routers = router.getRoutes()
            routers.forEach(item => {
                if (item.name == 'main' || item.name == 'login' || item.name == "404") {
                    return
                } else {
                    router.removeRoute(item.name)
                }
            })
            routeArr.forEach(item => {
                this.routerList.push(router.addRoute("main", item))
            })
        },
        clean() {
            this.routerList.forEach((item) => {
                if (item) item()
            })
            localStorage.removeItem('allData');
        }
    },
    persist: true
})