import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import FormContainer, { FormContainerInner } from "../containers/FormContainer"
import { withTheme } from '../theme'
import TextInput from '../containers/TextInput';
import I18n from "../i18n"
import sharedStyles from './Styles';
// import { themes } from '../constants/colors';
import Button from '../containers/Button';
import { createUser } from '../lib/api'
import { connect } from 'react-redux'
import { loginRequest as loginRequestAction } from '../actions/login';

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
        marginVertical: 16,
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

const RegisterPasswordView = ({ theme, loginRequest, route }) => {
    const errorInitital = { username: {}, password: {}, confirmPassword: {} }
    const { phone } = route.params;
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(errorInitital)

    const onSubmit = async () => {
        if (!username || !password || !confirmPassword) {
            const errParams = { error: true, reason: "Missing field required" }
            setError({ username: errParams, password: errParams, confirmPassword: errParams })
            // alert('Missing field required')
            return
        }

        else if (confirmPassword !== password) {
            const errParams = { error: true, reason: "The password confirmation does not match." }
            setError(err => ({ ...err, password: errParams, confirmPassword: errParams }))
            // alert("The password confirmation does not match.")
        }

        else if (confirmPassword === password) {
            setError(errorInitital)
            try {
                setLoading(true)
                const result = await createUser({ phone, username, password })
                console.info(result)
                if (result) {
                    const param = {
                        user: `${phone}@gmail.com`,
                        password
                    }
                    const login = await loginRequest(param)
                    console.info(login)
                    if (login) {
                        setLoading(false)
                    }
                }

            } catch (error) {
                console.info(error)
            }
            setLoading(false)

        }

    }

    const containerStyle = [styles.inputContainer, { borderColor: "red" }]
    return (
        <FormContainer theme={theme}>
            <FormContainerInner>
                <TextInput
                    error={error.username}
                    label='Username: '
                    containerStyle={[containerStyle, {}]}
                    placeholder={I18n.t('Username')}
                    returnKeyType='next'
                    onChangeText={value => setUsername(value)}
                    onSubmitEditing={() => { this.newPassword.focus(); }}
                    testID='login-view-username'
                    textContentType='username'
                    autoCompleteType='username'
                    theme={theme}
                />
                <TextInput
                    error={error.password}
                    label='New Password:'
                    containerStyle={containerStyle}
                    inputRef={(e) => { this.newPassword = e; }}
                    placeholder={I18n.t('Password')}
                    returnKeyType='send'
                    secureTextEntry
                    onSubmitEditing={() => { this.confirmPassword.focus(); }}
                    onChangeText={value => setPassword(value)}
                    testID='RegisterPasswordView-new-password'
                    textContentType='password'
                    autoCompleteType='password'
                    theme={theme}
                />
                <TextInput
                    error={error.confirmPassword}
                    label='Confirm Password:'
                    containerStyle={containerStyle}
                    inputRef={(e) => { this.confirmPassword = e; }}
                    placeholder={I18n.t('Password')}
                    returnKeyType='send'
                    secureTextEntry
                    onChangeText={value => setConfirmPassword(value)}
                    testID='RegisterPasswordView-confirm-password'
                    textContentType='password'
                    autoCompleteType='password'
                    theme={theme}
                />
                <Button
                    title={I18n.t('Register')}
                    type='primary'
                    onPress={onSubmit}
                    testID='login-view-submit'
                    loading={loading}
                    theme={theme}
                    style={styles.loginButton}
                />
            </FormContainerInner>
        </FormContainer>

    )

}

const mapDispatchToProps = dispatch => ({
    loginRequest: params => dispatch(loginRequestAction(params))
});

const mapStateToProps = state => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(RegisterPasswordView));

