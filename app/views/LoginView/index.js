import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { withTheme } from "../../theme"
import FormContainer, { FormContainerInner } from '../../containers/FormContainer';
import { themes } from '../../constants/colors';
import sharedStyles from '../Styles';
import I18n from '../../i18n';
import TextInput from '../../containers/TextInput';
import Button from '../../containers/Button';

const styles = StyleSheet.create({
  registerDisabled: {
    ...sharedStyles.textRegular,
    ...sharedStyles.textAlignCenter,
    fontSize: 16
  },
  title: {
    ...sharedStyles.textBold,
    fontSize: 22
  },
  inputContainer: {
    marginVertical: 16
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 32
  },
  bottomContainerText: {
    ...sharedStyles.textRegular,
    fontSize: 13
  },
  bottomContainerTextBold: {
    ...sharedStyles.textSemibold,
    fontSize: 13
  },
  loginButton: {
    marginTop: 16
  }
});


const LoginView = ({ theme }) => {
  return (

    <FormContainer theme={theme} testID='otp-view'>
      <FormContainerInner>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={{ flex: 1 }}>
            <TextInput
              label='Phone'
              containerStyle={styles.inputContainer}
              placeholder={I18n.t('PhonePlaceholder')}
              keyboardType="number-pad"
              returnKeyType='next'
              onChangeText={value => this.setState({ user: value })}
              onSubmitEditing={() => { this.passwordInput.focus(); }}
              testID='otp-view-otp'
              theme={theme}
            />
            <Button
              title={I18n.t('sendOTP')}
              type='primary'
              testID='login-view-submit'
              // disabled={!this.valid()}
              theme={theme}
              style={styles.loginButton}
            />
          </View>
        </TouchableWithoutFeedback>

      </FormContainerInner>
    </FormContainer>


  )

}

export default (withTheme(LoginView));