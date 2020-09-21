import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { withTheme } from "../../theme"
import FormContainer, { FormContainerInner } from '../../containers/FormContainer';
import I18n from '../../i18n';
import OTPInputView from "@twotalltotems/react-native-otp-input"
import { themes } from '../../constants/colors';
import { getOTP, verifyOTP } from "../../lib/api"
import { connect } from 'react-redux'
import { loginRequest as loginRequestAction } from '../../actions/login';

const styles = StyleSheet.create({
  loading: {

  },
  underlineStyleBase: {
    width: 40,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    borderColor: "#ccc"

  },
  underlineStyleHighLighted: {
    borderColor: "black"

  },
  resend: { alignSelf: "center", paddingVertical: 8, paddingHorizontal: 24, borderRadius: 4 },
  resendText: { color: "white" },
  otpDescription: { textAlign: "center", paddingTop: 36 }
});




const OTPView = ({ theme, route, navigation, loginRequest }) => {
  const { phone } = route.params;
  const [loading, setLoading] = useState(false)
  const reSend = async () => {
    try {
      await getOTP()
      setCode('')
    } catch (error) {
      alert(error)
    }
  }

  const onCodeFilled = async (code) => {
    setLoading(true)
    const result = await verifyOTP({ phone, otp: code })
    if (result?.data) {
      const { name } = result?.data?.user
      try {
        await loginRequest({ user: `${name}@gmail.com`, password: name });
      } catch (error) {
        setLoading(false)
        console.info(error)
      }
    }

  }

  const LoadingView = () => {
    return (
      <ActivityIndicator size="large" color={themes[theme].headerBackground} style={styles.loading} />
    )
  }


  const ResendButton = () => {
    return (
      <TouchableOpacity style={[styles.resend, { backgroundColor: themes[theme].headerBackground }]}
        onPress={reSend}>
        <Text style={styles.resendText}>{I18n.t('Resend')}</Text>
      </TouchableOpacity>
    )
  }

  return (

    <FormContainer theme={theme} testID='otp-view'>
      <FormContainerInner>
        <Text style={styles.otpDescription}>{I18n.t('otpDescription', { phone })}</Text>
        <OTPInputView
          style={{ height: 150, paddingHorizontal: 30 }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onCodeFilled}
        />
        {loading ? <LoadingView /> : <ResendButton />}
      </FormContainerInner>
    </FormContainer>

  )
}




const mapDispatchToProps = dispatch => ({
  loginRequest: params => dispatch(loginRequestAction(params))
});

const mapStateToProps = state => ({
});




export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OTPView));
