'use client'
import store from '@/store/studyroomStore'
import { Provider } from 'react-redux'

type Props = {
  children: React.ReactNode
}

export default function StudyroomProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
