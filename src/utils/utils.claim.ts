const getDefaultClaimPropertyValue = (type: string, format: string): any => {
  if (type === 'boolean') {
    return false
  } else if (type === 'string' && format === 'date') {
    return Date.now()
  }
  return ''
}

const getClaimContentsDefault = (claimProperties: object): object => {
  const propertiesNames = Object.keys(claimProperties)
  return propertiesNames.reduce(
    (acc, claimPropertyName) => ({
      ...acc,
      [claimPropertyName]: getDefaultClaimPropertyValue(
        claimProperties[claimPropertyName].type,
        claimProperties[claimPropertyName].format
      ),
    }),
    {}
  )
}

export { getDefaultClaimPropertyValue, getClaimContentsDefault }
