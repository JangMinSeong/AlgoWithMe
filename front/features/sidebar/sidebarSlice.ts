import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sidebarState {
  isOpen: boolean
  groupId: number
  pageId: number
}

const initialState: sidebarState = {
  isOpen: true,
  groupId: 0,
  pageId: 0,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    closeSidebar: (state: sidebarState) => {
      state.isOpen = false
    },
    openSidebar: (state: sidebarState) => {
      state.isOpen = true
    },
    setGroupId: (state: sidebarState, action: PayloadAction<number>) => {
      state.groupId = action.payload
    },
    setPageId: (state: sidebarState, action: PayloadAction<number>) => {
      state.pageId = action.payload
    },
  },
})

export const { closeSidebar, openSidebar, setGroupId, setPageId } =
  sidebarSlice.actions
export default sidebarSlice.reducer
