import React from 'react'
import { Text, View, TextStyle, Picker } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CLR_TXT_MEDIUM } from '../sharedStyles/styles.consts.colors'
import { sPicker, lPicker } from '../sharedStyles/styles.form'
import { paddedBottomS } from '../sharedStyles/styles.layout'
import { TXT_XS_SIZE } from '../sharedStyles/styles.consts.typography'
import StyledTextInput from './StyledTextInput'

type Props = {
  onChangeValue: (value: any, claimPropertyId: string) => void
  claimContents: object
  claimProperties: object
}

const labelTxt: TextStyle = {
  textTransform: 'capitalize',
  color: CLR_TXT_MEDIUM,
  fontSize: TXT_XS_SIZE,
  paddingBottom: 4,
}

const claimFormItemMap = {
  string: (propertyName: string, onChangeValue) => (
    <>
      <Text style={labelTxt}>{propertyName}:</Text>
      <StyledTextInput
        returnKeyType="done"
        onChangeText={txt => onChangeValue(txt, propertyName)}
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
        onValueChange={bool => onChangeValue(bool, propertyName)}
      >
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
        const { format, type } = claimProperties[propertyName]
        const componentFunction =
          claimFormItemMap[`${type}${format ? format : ''}`]
        const value = claimContents[propertyName]
        return (
          <View style={paddedBottomS} key={propertyName}>
            {componentFunction(propertyName, onChangeValue, value)}
          </View>
        )
      })}
    </>
  )
}

export default ClaimForm
