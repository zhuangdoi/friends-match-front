import axios from "axios";
import {showToast} from "vant";

//自定义实例默认值
const myAxious = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

myAxious.defaults.withCredentials = true;

// 添加请求拦截器
myAxious.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //未登录则跳转到登录页
    console.log("请求发送了",config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxious.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //未登录则跳转到登录页
    if (response?.data?.code === 40100 || response?.data?.code === 40101){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxious;