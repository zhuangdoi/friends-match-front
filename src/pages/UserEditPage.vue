<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router"


import {getCurrentUser} from "../servcies/user";
import {ref} from "vue";
import myAxious from "../plugins/myAxious.ts";


const router = useRouter();
const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})



const onSubmit = async () => {
  //获取用户信息
  const currentUser = await getCurrentUser();

  if (!currentUser){
    console.log('用户未登录')
    return;
  }

  const res = await  myAxious.post('/user/update',{
    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue
  })
  console.log(res,'更新请求')
  if (res.code === 0 && res.data >0){
    console.log('修改成功');
    router.back();
  } else {
    console.log('修改错误');
  }

};
</script>

<style scoped>

</style>