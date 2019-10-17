const DEFAULT_DELAY = 2000

// Used for UI, to prevent rendering flashes
async function callWithDelay(
  func: (...args: any[]) => any,
  params: [any],
  delay = DEFAULT_DELAY
): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => resolve(func(...params)), delay)
  )
}

export { callWithDelay }
