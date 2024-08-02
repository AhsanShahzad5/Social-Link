// this will keep context if user is loggged in or not

import { atom } from "recoil";

const userAtom = atom({
    key: 'userAtom',
    default : JSON.parse(localStorage.getItem('user-threads'))
})

export default userAtom;