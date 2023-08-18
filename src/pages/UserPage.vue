<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账户" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>

    <van-cell title="修改个人信息" is-link to="/user/update"></van-cell>
    <van-cell title="我创建的队伍" is-link to="/team/create"></van-cell>
    <van-cell title="我加入的队伍" is-link to="/team/join"></van-cell>

  </template>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {getCurrentUser} from "../servcies/user";

// const user = {
//   id : 9527,
//   username : 'shayu',
//   userAccount : '931',
//   avatarUrl : 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
//   gender : '男',
//   phone : '430821',
//   email : 'shayu-yusha@qq.com',
//   planetCode : '931',
//   createTime : new Date(),
// }
const user =ref();
const router = useRouter();

onMounted(async () =>{
  //获取用户信息
  const res = await getCurrentUser();
  if (res){
    user.value = res;
    console.log('获取用户信息成功');
  } else {
    console.log('获取用户信息失败')
  }
})

const toEdit = (editKey: string,editName: string,currentValue: string) =>{
  router.push({
    path:'/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<style scoped>

</style>