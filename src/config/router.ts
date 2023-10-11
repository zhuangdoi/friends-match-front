//  定义一些路由
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import IndexPage from "../pages/IndexPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import TeamJoinPage from "../pages/TeamJoinPage.vue";
import TeamCreatePage from "../pages/TeamCreatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserRegistPage from "../pages/UserRegistPage.vue";


const routes = [
    { path: '/', component: IndexPage },
    { path: '/team',title:'找队伍', component: TeamPage },
    { path: '/team/add',title:'创建队伍', component: TeamAddPage },
    { path: '/team/update',title:'更新队伍', component: TeamUpdatePage },
    { path: '/team/join', title:'加入队伍',component: TeamJoinPage },
    { path: '/team/create', title:'创建队伍',component: TeamCreatePage },
    { path: '/user',title:'个人信息', component: UserPage },
    { path: '/search',title:'找伙伴', component: SearchPage },
    { path: '/user/edit', title:'编辑个人信息',component: UserEditPage },
    { path: '/user/list', title:'用户列表',component: SearchResultPage },
    { path: '/user/login', title:'用户登录',component: UserLoginPage },
    { path: '/user/update', title:'用户更新',component: UserUpdatePage },
    { path: '/user/regist', title:'用户注册',component: UserRegistPage },
]

export default routes;