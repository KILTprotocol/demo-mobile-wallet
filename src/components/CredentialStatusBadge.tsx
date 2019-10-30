import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { flexRowLayout } from '../sharedStyles/styles.layout'
import {
  ATT_PENDING_CLR,
  ATT_VALID_CLR,
  ATT_REVOKED_CLR,
  TXT_INVERTED_CLR,
} from '../sharedStyles/styles.consts.colors'
import { CredentialStatus } from '../_enums'
import { TXT_XS_SIZE } from '../sharedStyles/styles.consts.typography'

type Props = {
  status: CredentialStatus
}

const badgeDefaultStyle: ViewStyle = {
  paddingVertical: 2,
  paddingHorizontal: 10,
  borderRadius: 25,
}

const badgeTxtStyle: TextStyle = {
  textTransform: 'uppercase',
  color: TXT_INVERTED_CLR,
  fontSize: TXT_XS_SIZE,
  fontWeight: '600',
}

const txtStyles = StyleSheet.create({
  pending: {
    backgroundColor: ATT_PENDING_CLR,
  },
  valid: {
    backgroundColor: ATT_VALID_CLR,
  },
  revoked: {
    backgroundColor: ATT_REVOKED_CLR,
  },
})

const statusToUiMapping = {
  [CredentialStatus.AttestationPending]: {
    txt: 'pending',
    style: txtStyles.pending,
  },
  [CredentialStatus.Valid]: {
    txt: 'valid',
    style: txtStyles.valid,
  },
  [CredentialStatus.Revoked]: {
    txt: 'revoked',
    style: txtStyles.revoked,
  },
}

const CredentialStatusBadge: React.FunctionComponent<Props> = ({
  status,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <View style={[badgeDefaultStyle, statusToUiMapping[status].style]}>
      <Text style={badgeTxtStyle}>{statusToUiMapping[status].txt}</Text>
    </View>
  </View>
)

export default CredentialStatusBadge
