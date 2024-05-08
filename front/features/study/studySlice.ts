import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStudyState {
  id: number
  name: string
  ranking: []
  problems: []
  statistics: []
  joindate: string
  callSessionId: string
}


const initialState: IStudyState = {
  id: 0,
  name: '',
  ranking: [],
  problems: [],
  statistics: [],
  joindate: '',
  callSessionId: '',
}

const studyState = createSlice({
  name: 'study',
  initialState,
  reducers: {
    viewStudyInfo: (state: IStudyState, action: PayloadAction<IStudyState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.ranking = action.payload.ranking
      state.problems = action.payload.problems
      state.statistics = action.payload.statistics
      state.joindate = action.payload.joindate
    },
    setCallSessionId: (state: IStudyState, action: PayloadAction<string>) => {
      state.callSessionId = action.payload
    },
  },
})

export const { viewStudyInfo, setCallSessionId } = studyState.actions

export default studyState.reducer
