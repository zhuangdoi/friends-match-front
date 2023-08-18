<template>
    <div
            id="teamCardList">
        <van-card
                v-for="team in props.teamList"
                :desc="team.description"
                thumb="https://img1.baidu.com/it/u=898692534,2766260827&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                :title="`${team.name} `"
        >
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px" >
                    {{
                        teamStatusEnum[team.status]
                    }}
                </van-tag>
            </template>
            <template #bottom>
                <div>
                    {{`队伍人数 : ${team.hasJoinNum}/${team.maxNum}`}}
                </div>
                <div>
                    {{'过期时间' + team.expireTime}}
                </div>
                <div>
                    {{'创建时间' + team.createTime}}
                </div>
            </template>
            <template #footer>

                <!--        加入队伍： 仅非队伍创建人、且未加入队伍的人可见-->
                <!--        更新队伍：仅创建人可见-->
                <!--        解散队伍：仅创建人可见-->
                <!--        退出队伍：创建人不可见，仅已加入队伍的人可见-->
                <van-button size="mini" plain type="primary"  v-if="team.userId !== currentUser?.id && !team.hasJoin"
                            @click="preJoinTeam(team)">加入队伍
                </van-button>
                <van-button v-if="team.userId === currentUser?.id" size="mini"
                            @click="doUpdateTeam(team.id)">更新队伍
                </van-button>

                <!--       todo 仅加入的用户可见-->
                <van-button v-if=" team.userId !== currentUser?.id && team.hasJoin" size="mini"
                            @click="doQuitTeam(team.id)">退出队伍
                </van-button>

                <van-button v-if=" team.userId == currentUser?.id " size="mini"  plain type="primary"
                            @click="doDeleteTeam(team.id)">解散队伍
                </van-button>
            </template>
        </van-card>
    </div>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
</template>

<script setup lang="ts">


import {Dialog, showToast} from "vant";
import myAxious from "../plugins/myAxious";
import {teamStatusEnum} from "../constants/team";
import {TeamType} from "../assets/team";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../servcies/user";
import {useRouter} from "vue-router";

const router = useRouter();
interface TeamCardListProps{
    teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
    //@ts-ignore
    teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();

// const VanDialog = Dialog.Component;

//获取用户信息
onMounted(async () =>{
    currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0) {
        doJoinTeam()
    } else {
        showPasswordDialog.value = true;
    }
}

const doJoinCancel = () => {
    joinTeamId.value = 0;
    password.value = '';
}

//队伍列表加入队伍
const doJoinTeam = async() =>{
    if (!joinTeamId.value){
        return;
    }
    const res = await myAxious.post("/team/join",{
        teamId : joinTeamId.value,
        password: password.value
    });
    if (res?.code === 0){
        showToast("加入成功")
        doJoinCancel();
    }else {
        showToast("加入失败")
    }
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async(id: number) =>{
    const res = await myAxious.post("/team/quit",{
        teamId : id
    });
    if (res?.code === 0){
        showToast("操作成功")
    }else{
        showToast("操作失败")
    }
}


/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async(id: number) =>{
    const res = await myAxious.post("/team/delete",{
        id
    });
    if (res?.code === 0){
        showToast("操作成功")
    }else{
        showToast("操作失败")
    }
}




//doUpdateTeam()
const doUpdateTeam = (id:number)=>{
    router.push({
        path: "/team/update",
        query:{
            id,
        }
    })
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img){
    height: 128px;
    object-fit: unset;
}
</style>