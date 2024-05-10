import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: number
    nickname: string
    imageUrl: string
}

interface usersState {
    curUserId : number
    myId : number
    userList : User[]
}

const initialState: usersState = {
    curUserId : 0,
    myId: 0,
    userList : []
}

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setCurUserId: (state: usersState, action: PayloadAction<number>) => {
            state.curUserId = action.payload
        },
        setMyId: (state: usersState, action: PayloadAction<number>) => {
            state.myId = action.payload
        },
        setUserList: (state: usersState, action: PayloadAction<User[]>) => {
            state.userList = action.payload
        },
    },
})

export const {
    setCurUserId,
    setMyId,
    setUserList
} = codeSlice.actions
export default codeSlice.reducer
