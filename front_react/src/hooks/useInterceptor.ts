import { useEffect } from 'react'

interface Configs {
  baseUrl: string
  accessToken: string
}

interface Interceptor {
  configs: Configs | null
  onRequest: (
    url: string,
    options: RequestInit,
    configs: Configs,
  ) => { url: string; options: RequestInit }
  onSuccess: (response: any) => any
  onError: (response: any) => any
  set: (settings: Partial<UseInterceptor>) => void
}

export const interceptor: Interceptor = {
  configs: null,
  onRequest: (url, options) => ({ url, options }),
  onSuccess: (response) => response,
  onError: (response) => response,
  set: ({ configs, onRequest, onSuccess, onError }) => {
    if (configs) interceptor.configs = configs
    if (onRequest) interceptor.onRequest = onRequest
    if (onSuccess) interceptor.onSuccess = onSuccess
    if (onError) interceptor.onError = onError
  },
}

interface UseInterceptor {
  configs: Configs
  onRequest: (
    url: string,
    options: RequestInit,
    configs: Configs,
  ) => { url: string; options: RequestInit }
  onSuccess: (response: any) => any
  onError: (response: any) => any
}

const useInterceptor = ({
  configs,
  onRequest,
  onSuccess,
  onError,
}: Partial<UseInterceptor>) => {
  useEffect(() => {
    interceptor.set({ configs, onRequest, onSuccess, onError })
  }, [configs, onRequest, onSuccess, onError])
}

export default useInterceptor
