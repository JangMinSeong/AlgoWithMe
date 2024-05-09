import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ILevelState {
  selected: Array<string | null>
}

const initialState: ILevelState = {
  selected: [],
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    addSelected: (state: ILevelState, action: PayloadAction<string>) => {
      state.selected.push(action.payload)
    },
    removeSelected: (state: ILevelState, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((item) => item !== action.payload)
    },
    emptySelected: () => initialState,
  },
})

export const { addSelected, removeSelected, emptySelected } = levelSlice.actions
export default levelSlice.reducer
