import React, { useState } from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { withTheme } from "../../theme"
import FormContainer, { FormContainerInner } from '../../containers/FormContainer';
import I18n from '../../i18n';
import TextInput from '../../containers/TextInput';
import Button from '../../containers/Button';

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 12,
    marginVertical: 16
  },
  sendOTPButton: {
    marginTop: 16,
    paddingHorizontal: 60
  }
});


const GetOTPView = ({ theme, navigation }) => {
  const [phone, setPhone] = useState()


  return (
    <FormContainer theme={theme} testID='otp-view'>
      <FormContainerInner>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={{ flex: 1 }}>
            <TextInput
              label='Phone number: '
              containerStyle={styles.inputContainer}
              placeholder={I18n.t('PhonePlaceholder')}
              keyboardType="number-pad"
              returnKeyType='next'
              onChangeText={e => setPhone(e)}
              testID='otp-view-otp'
              theme={theme}
            />
            <Button
              title={I18n.t('sendOTP')}
              type='primary'
              testID='login-view-submit'
              theme={theme}
              onPress={() => navigation.navigate('OTPView', { phone })}
              style={styles.sendOTPButton}
            />
          </View>
        </TouchableWithoutFeedback>

      </FormContainerInner>
    </FormContainer>


  )

}

export default (withTheme(GetOTPView));