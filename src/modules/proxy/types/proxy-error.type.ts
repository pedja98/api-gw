export type ProxyError = {
  response?: {
    data?: string | Record<string, unknown>
    status?: number
  }
}
