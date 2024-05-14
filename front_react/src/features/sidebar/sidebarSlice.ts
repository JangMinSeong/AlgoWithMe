import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Study {
  id: number
  name: string
  imageUrl: string
  visitedAt: string
}

interface Page {
  pageId: number
  title: string
  docs: boolean
  provider: string
  children: Page[]
}

interface sidebarState {
  isOpen: boolean
  groupId: number
  pageId: number
  studyList: Study[]
  pageList: Page[]
}

const initialState: sidebarState = {
  isOpen: true,
  groupId: 0,
  pageId: 0,
  studyList: [],
  pageList: [],
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
    setStudyList: (state: sidebarState, action: PayloadAction<Study[]>) => {
      state.studyList = action.payload
    },
    setPageList: (state: sidebarState, action: PayloadAction<Page[]>) => {
      state.pageList = action.payload
    },
  },
})

export const {
  closeSidebar,
  openSidebar,
  setGroupId,
  setPageId,
  setStudyList,
  setPageList,
} = sidebarSlice.actions
export default sidebarSlice.reducer
