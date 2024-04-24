import { createSlice } from '@reduxjs/toolkit'

interface sidebarState {
  isOpen: boolean
}

const initialState: sidebarState = {
  isOpen: true,
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
  },
})

export const { closeSidebar, openSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
