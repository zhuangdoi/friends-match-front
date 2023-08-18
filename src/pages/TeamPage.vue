<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" clearable="true" @search="onSearch"/>

    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="private"></van-tab>
    </van-tabs>

    <div style="margin-bottom: 16px"></div>
    <van-button class="add-button" type="primary" icon="plus" @click="doCreateTeam">创建队伍</van-button>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length<1" description="数据为空"></van-empty>
  </div>
</template>

<script setup lang="ts">



//跳转加入队伍页
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxious from "../plugins/myAxious.ts";

const router = useRouter();

const active = ref('public')
const searchText = ref('');

/**
 * 切换查询状态
 */
const onTabChange = (name) => {
  //查公开
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else{
    listTeam(searchText.value,2);
  }
}

/**
 * 跳转加入队伍页
 */
const doCreateTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);
//队伍搜索方法
const listTeam = async (val = " ",status=0) => {
  const res = await  myAxious.get("/team/list",{
    params:{
      searchText : val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showPicker("加载队伍失败，请重新刷新")
  }
}

//页面加载时触发一次，查询队伍
onMounted( ()=>{
  listTeam()
})

//
const onSearch = (val) => {
  listTeam(val)
}

</script>

<style scoped>
</style>