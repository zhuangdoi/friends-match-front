import { createApp } from 'vue'
import App from './App.vue'
import  {Icon,Button, NavBar,Tabbar,TabbarItem,Toast} from "vant";

// @ts-ignore
import * as VueRouter from 'vue-router';
import routes from "./config/router";

//引入所有组件Vant
import Vant from "vant";
//引入所有样式
import 'vant/lib/index.css'


const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Toast);
app.use(Vant);


const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)


app.mount('#app')