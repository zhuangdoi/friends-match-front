import {userType} from "../assets/user";


let currentUser : userType;

const setCurrentUserStates = (user: userType) => {
    currentUser = user;
}

const getCurrentUserStates = () :userType =>{
    return currentUser;
}

export {
    setCurrentUserStates,
    getCurrentUserStates,
}