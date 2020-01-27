import React from 'react'
import { Text, View, TextStyle, Picker } from 'react-native'
import Dialog from 'react-native-dialog'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dialogSection } from '../sharedStyles/styles.dialog'
import { CLR_KILT_0 } from '../sharedStyles/styles.consts.colors'
import { bodyTxt, disabledTxt } from '../sharedStyles/styles.typography'
import { BIRTHDAY, NAME, PREMIUM } from '../data/claimProperties'
import { sPicker, lPicker } from '../sharedStyles/styles.pickers'

type Props = {
  nameDefaultValue: string
  birthdayValueAsNumber: number
  premiumValue: boolean
  onChangeValue: (value: any, claimPropertyId: string) => void
}

const labelTxt: TextStyle = {
  paddingLeft: 10,
}

const ClaimForm: React.FunctionComponent<Props> = ({
  nameDefaultValue,
  birthdayValueAsNumber,
  premiumValue,
  onChangeValue,
}): JSX.Element => {
  return (
    <>
      <View style={dialogSection}>
        <Dialog.Input
          returnKeyType="done"
          label="Name"
          // editable only if no default value
          editable={!nameDefaultValue}
          onChangeText={name => onChangeValue(name, NAME)}
          style={nameDefaultValue ? [bodyTxt, disabledTxt] : bodyTxt}
          defaultValue={nameDefaultValue}
          selectionColor={CLR_KILT_0}
        />
      </View>
      <View style={dialogSection}>
        <Text style={labelTxt}>Birthday:</Text>
        <DateTimePicker
          mode="date"
          value={new Date(birthdayValueAsNumber)}
          onChange={(event, date) => {
            onChangeValue(date, BIRTHDAY)
          }}
          style={lPicker}
        />
      </View>
      <View style={dialogSection}>
        <Text style={labelTxt}>Premium:</Text>
        <Picker
          itemStyle={sPicker}
          style={sPicker}
          selectedValue={premiumValue}
          onValueChange={isPremium => onChangeValue(isPremium, PREMIUM)}>
          <Picker.Item label="yes" value={true} />
          <Picker.Item label="no" value={false} />
        </Picker>
      </View>
    </>
  )
}

export default ClaimForm
