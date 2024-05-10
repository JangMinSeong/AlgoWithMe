import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStudyState, IProblemInfo } from './studyTypes'

const initialState: IStudyState = {
  teamId: 0,
  name: '이름없는 스터디',
  imageUrl: '',
  joinDay: 1,
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
    addCandidateProblems: (
      state: IStudyState,
      action: PayloadAction<IProblemInfo>,
    ) => {
      state.candidateProblems = [...state.candidateProblems, action.payload]
    },
    deleteCandidateProblem: (
      state: IStudyState,
      action: PayloadAction<number>,
    ) => {
      state.candidateProblems = state.candidateProblems.filter(
        (item) => item.candidateId !== action.payload,
      )
    },
  },
})

export const {
  viewStudyInfo,
  editImage,
  editName,
  addCandidateProblems,
  deleteCandidateProblem,
} = studyState.actions

export default studyState.reducer
