<template>
  <van-form @submit="register">
    <van-cell-group inset>
      <van-field
          v-model="userAccout"
          name="userAccout"
          label="账户"
          placeholder="账户"
          :rules="[{ required: true, message: '请填写账户' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
        <van-field
                v-model="checkPassword"
                type="password"
                name="checkPassword"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '确认密码' }]"
        />
        <van-field
                v-model="planetCode"
                name="planetCode"
                label="星球编号"
                placeholder="星球编号"
                :rules="[{ required: true, message: '请输入星球编号' }]"
        />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxious";
import {showToast, Toast} from "vant";
import {route} from "vant/es/composables/use-route";

const router = useRouter();

const userAccout = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');


const register = async () => {
  const res = await myAxios.post('/user/register',{
    userAccount: userAccout.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
  })
  console.log(res,'用户注册');
  if (res.code == 0 && res.data){
      //跳转回之前的页面
      console.log(route.query?.redirect)
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    console.log('注册失败');
    showToast('注册失败');
  }
};

</script>

<style scoped>

</style>