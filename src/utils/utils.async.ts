const DEFAULT_TIMEOUT = 800

// used for UI, to prevent rendering flashes
async function callWithDelay<T>(
  func: (...args: any[]) => T,
  params: any[] = [],
  timeout = DEFAULT_TIMEOUT
): Promise<T> {
  return new Promise(resolve =>
    setTimeout(() => resolve(func(...params)), timeout)
  )
}

const delay = (timeout: number): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, timeout))

export { callWithDelay, delay }
