import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
  id: number
  nickname: string
}

const initialState: IUserState = {
  id: 0,
  nickname: '',
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserId: (state: IUserState, action: PayloadAction<number>) => {
      state.id = action.payload
    },
    setUserNickname: (state: IUserState, action: PayloadAction<string>) => {
      state.nickname = action.payload
    },
  },
})

export const { setUserId, setUserNickname } = userSlice.actions
export default userSlice.reducer
