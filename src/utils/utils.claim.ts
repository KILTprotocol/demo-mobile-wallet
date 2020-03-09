import { ClaimPropertyType, ClaimPropertyFormat } from '../enums'

const getDefaultClaimPropertyValue = (type: string, format: string): any => {
  if (type === ClaimPropertyType.Integer) {
    return 0
  } else if (type === ClaimPropertyType.Boolean) {
    return false
  } else if (
    type === ClaimPropertyType.String &&
    format === ClaimPropertyFormat.Date
  ) {
    return Date.now()
  }
  return ''
}

// todo simplify
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
