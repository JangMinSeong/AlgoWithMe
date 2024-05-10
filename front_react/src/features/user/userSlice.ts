import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
  id: number
}

const initialState: IUserState = {
  id: 0,
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserId: (state: IUserState, action: PayloadAction<number>) => {
      state.id = action.payload
    },
  },
})

export const { setUserId } = userSlice.actions
export default userSlice.reducer
