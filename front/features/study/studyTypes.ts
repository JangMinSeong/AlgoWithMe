export interface IChart {
  tag: string
  count: number
}

export interface IProblemPage {
  pageId: number
  problemId: number
  url: string
  provider: string
  number: number
  name: string
  level: string
}

export interface IProblemInfo {
  id: number
  problemId: number
  url: string
  provider: string
  number: number
  name: string
  level: string
}

export interface IRanking {
  id: number
  nickname: string
  imageUrl: string
  solvedCount: number
}

export interface IStudyState {
  teamId: number
  name: string
  imageUrl: string
  joinDay: number
  chart: Array<IChart> | []
  solvedProblems: Array<IProblemPage> | []
  candidateProblems: Array<IProblemInfo> | []
  ranking: Array<IRanking> | []
}
