'use client'
import sidebarStore from '@/store/sidebarStore'
import { Provider } from 'react-redux'

type Props = {
  children: React.ReactNode
}

export default function SidebarProvider({ children }: Props) {
  return <Provider store={sidebarStore}>{children}</Provider>
}
