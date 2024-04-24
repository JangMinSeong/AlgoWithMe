'use client'
import store from '@/store/timerStore'
import { Provider } from 'react-redux'

type Props = {
  children: React.ReactNode
}

export default function TimerProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
