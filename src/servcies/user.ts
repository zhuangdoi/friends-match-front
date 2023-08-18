import myAxious from "../plugins/myAxious.ts";
import {setCurrentUserStates} from "../states/user.ts";


export const getCurrentUser = async ()=>{
    const res = await myAxious.get('/user/current');
    if (res.code === 0){
        setCurrentUserStates(res.data);
        return res.data;
    }
    return null;
}