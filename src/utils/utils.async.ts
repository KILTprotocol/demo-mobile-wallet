const DEFAULT_DELAY = 100

// Used for UI, to prevent rendering flashes
async function callWithDelay<T>(
  func: (...args: any[]) => T,
  params: any[] = [],
  delay = DEFAULT_DELAY
): Promise<T> {
  return new Promise(resolve =>
    setTimeout(() => resolve(func(...params)), delay)
  )
}

export { callWithDelay }
