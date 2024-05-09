import { interceptor } from '@/hooks/useInterceptor'

export default async function fetch(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const interceptedRequest = interceptor.onRequest(
    url,
    options,
    interceptor.configs!,
  )
  const response = await window.fetch(
    interceptedRequest.url,
    interceptedRequest.options,
  )

  if (response.ok) {
    return interceptor.onSuccess(response)
  }

  throw new Error(interceptor.onError(response))
}
