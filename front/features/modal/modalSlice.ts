import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  isOpen: boolean
}

const initialState: IModalState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state: IModalState) => {
      state.isOpen = false
    },
    openModal: (state: IModalState) => {
      state.isOpen = true
    },
  },
})

export const { closeModal, openModal } = modalSlice.actions
export default modalSlice.reducer
