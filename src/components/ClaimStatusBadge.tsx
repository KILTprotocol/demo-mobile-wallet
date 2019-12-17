import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { flexRow } from '../sharedStyles/styles.layout'
import {
  CLR_CLAIM_PENDING,
  CLR_CLAIM_VALID,
  CLR_CLAIM_REVOKED,
  CLR_TXT_INVERTED,
} from '../sharedStyles/styles.consts.colors'
import { ClaimStatus } from '../_enums'
import { TXT_XXS_SIZE } from '../sharedStyles/styles.consts.typography'

type Props = {
  status: ClaimStatus
}

const badge: ViewStyle = {
  paddingVertical: 2,
  paddingHorizontal: 10,
  borderRadius: 25,
}

const badgeTxt: TextStyle = {
  textTransform: 'uppercase',
  color: CLR_TXT_INVERTED,
  fontSize: TXT_XXS_SIZE,
  fontWeight: '600',
}

const txtStyles = StyleSheet.create({
  pending: {
    backgroundColor: CLR_CLAIM_PENDING,
  },
  valid: {
    backgroundColor: CLR_CLAIM_VALID,
  },
  revoked: {
    backgroundColor: CLR_CLAIM_REVOKED,
  },
})

const statusToUiMapping = {
  [ClaimStatus.AttestationPending]: {
    txt: 'pending',
    style: txtStyles.pending,
  },
  [ClaimStatus.Valid]: {
    txt: 'valid',
    style: txtStyles.valid,
  },
  [ClaimStatus.Revoked]: {
    txt: 'revoked',
    style: txtStyles.revoked,
  },
}

const ClaimStatusBadge: React.FunctionComponent<Props> = ({
  status,
}): JSX.Element => (
  <View style={flexRow}>
    <View style={[badge, statusToUiMapping[status].style]}>
      <Text style={badgeTxt}>{statusToUiMapping[status].txt}</Text>
    </View>
  </View>
)

export default ClaimStatusBadge
