import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppStore, makeStore } from '@/lib/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<{
    store: ReturnType<typeof makeStore>['store']
    persistor: ReturnType<typeof makeStore>['persistor']
  }>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
