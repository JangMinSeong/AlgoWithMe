import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStudyState } from './studyTypes'

const initialState: IStudyState = {
  teamId: 0,
  name: '',
  imageUrl: '',
  joinDay: 0,
  chart: [],
  solvedProblems: [],
  candidateProblems: [],
  ranking: [],
}

const studyState = createSlice({
  name: 'study',
  initialState,
  reducers: {
    viewStudyInfo: (state: IStudyState, action: PayloadAction<IStudyState>) => {
      state.teamId = action.payload.teamId
      state.name = action.payload.name
      state.imageUrl = action.payload.imageUrl
      state.joinDay = action.payload.joinDay
      state.chart = [...action.payload.chart]
      state.solvedProblems = [...action.payload.solvedProblems]
      state.candidateProblems = [...action.payload.candidateProblems]
      state.ranking = [...action.payload.ranking]
    },
    editImage: (state: IStudyState, action: PayloadAction<string>) => {
      state.imageUrl = action.payload
    },
    editName: (state: IStudyState, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { viewStudyInfo, editImage, editName } = studyState.actions

export default studyState.reducer
