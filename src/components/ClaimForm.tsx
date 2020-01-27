import React from 'react'
import { Text, View, TextStyle, Picker } from 'react-native'
import Dialog from 'react-native-dialog'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  CLR_KILT_0,
  CLR_TXT_MEDIUM,
} from '../sharedStyles/styles.consts.colors'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { sPicker, lPicker } from '../sharedStyles/styles.pickers'
import { paddedSection } from '../sharedStyles/styles.layout'
import { TXT_XS_SIZE } from '../sharedStyles/styles.consts.typography'

type Props = {
  onChangeValue: (value: any, claimPropertyId: string) => void
  claimContents: object
  claimProperties: object
}

const labelTxt: TextStyle = {
  textTransform: 'capitalize',
  color: CLR_TXT_MEDIUM,
  fontSize: TXT_XS_SIZE,
}

const claimFormItemMap = {
  string: (propertyName: string, onChangeValue) => (
    <>
      <Dialog.Input
        returnKeyType="done"
        label={propertyName}
        onChangeText={txt => onChangeValue(txt, propertyName)}
        style={bodyTxt}
        selectionColor={CLR_KILT_0}
      />
    </>
  ),
  stringdate: (propertyName: string, onChangeValue, value) => (
    <>
      <Text style={labelTxt}>{propertyName}:</Text>
      <DateTimePicker
        mode="date"
        value={new Date(value)}
        onChange={(event, date) => {
          onChangeValue(date, propertyName)
        }}
        style={lPicker}
      />
    </>
  ),
  boolean: (propertyName: string, onChangeValue, value) => (
    <>
      <Text style={labelTxt}>{propertyName}:</Text>
      <Picker
        itemStyle={sPicker}
        style={sPicker}
        selectedValue={value}
        onValueChange={bool => onChangeValue(bool, propertyName)}>
        <Picker.Item label="yes" value={true} />
        <Picker.Item label="no" value={false} />
      </Picker>
    </>
  ),
}

const ClaimForm: React.FunctionComponent<Props> = ({
  claimContents,
  claimProperties,
  onChangeValue,
}): JSX.Element => {
  return (
    <>
      {Object.keys(claimProperties).map(propertyName => {
        const type = claimProperties[propertyName].type
        const format = claimProperties[propertyName].format
        const func = claimFormItemMap[`${type}${format ? format : ''}`]
        const value = claimContents[propertyName]
        return (
          <View style={paddedSection}>
            {func(propertyName, onChangeValue, value)}
          </View>
        )
      })}
    </>
  )
}

export default ClaimForm
