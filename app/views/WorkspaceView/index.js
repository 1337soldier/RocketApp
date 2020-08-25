import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import I18n from "../../i18n";
import Button from "../../containers/Button";
import styles from "./styles";
import { themes } from "../../constants/colors";
import { withTheme } from "../../theme";
import FormContainer, {
  FormContainerInner,
} from "../../containers/FormContainer";
import ServerAvatar from "./ServerAvatar";
import { getShowLoginButton } from "../../selectors/login";
import RNUserDefaults from "rn-user-defaults";
import { setBasicAuth } from "../../utils/fetch";
import { Base64 } from "js-base64";
import parse from "url-parse";
import { serverRequest } from "../../actions/server";
import * as Progress from "react-native-progress";

class WorkspaceView extends React.Component {
  static navigationOptions = () => ({
    title: I18n.t("Your_workspace"),
  });

  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.string,
    Site_Name: PropTypes.string,
    Site_Url: PropTypes.string,
    server: PropTypes.string,
    Assets_favicon_512: PropTypes.object,
    registrationForm: PropTypes.string,
    registrationText: PropTypes.string,
    showLoginButton: PropTypes.bool,
    Accounts_iframe_enabled: PropTypes.bool,
    inviteLinkToken: PropTypes.string,
  };

  get showRegistrationButton() {
    const {
      registrationForm,
      inviteLinkToken,
      Accounts_iframe_enabled,
    } = this.props;
    return (
      !Accounts_iframe_enabled &&
      (registrationForm === "Public" ||
        (registrationForm === "Secret URL" && inviteLinkToken?.length))
    );
  }

  completeUrl = (url) => {
    const parsedUrl = parse(url, true);
    if (parsedUrl.auth.length) {
      url = parsedUrl.origin;
    }

    url = url && url.replace(/\s/g, "");

    if (
      /^(\w|[0-9-_]){3,}$/.test(url) &&
      /^(htt(ps?)?)|(loca((l)?|(lh)?|(lho)?|(lhos)?|(lhost:?\d*)?)$)/.test(
        url
      ) === false
    ) {
      url = `${url}.rocket.chat`;
    }

    if (
      /^(https?:\/\/)?(((\w|[0-9-_])+(\.(\w|[0-9-_])+)+)|localhost)(:\d+)?$/.test(
        url
      )
    ) {
      if (/^localhost(:\d+)?/.test(url)) {
        url = `http://${url}`;
      } else if (/^https?:\/\//.test(url) === false) {
        url = `https://${url}`;
      }
    }

    return url.replace(/\/+$/, "").replace(/\\/g, "/");
  };

  basicAuth = async (server, text) => {
    try {
      const parsedUrl = parse(text, true);
      if (parsedUrl.auth.length) {
        const credentials = Base64.encode(parsedUrl.auth);
        await RNUserDefaults.set(`${BASIC_AUTH_KEY}-${server}`, credentials);
        setBasicAuth(credentials);
      }
    } catch {
      // do nothing
    }
  };

  async componentDidMount() {
    const text = "https://dongbat.rocket.chat/";

    const server = this.completeUrl(text);
    await this.basicAuth(server, text);
    try {
      const result = await this.props.connectServer(server, null);
    } catch (error) {
      console.log(error);
    }
  }

  login = () => {
    const {
      navigation,
      server,
      Site_Name,
      Accounts_iframe_enabled,
    } = this.props;
    if (Accounts_iframe_enabled) {
      navigation.navigate("AuthenticationWebView", {
        url: server,
        authType: "iframe",
      });
      return;
    }
    navigation.navigate("LoginView", { title: Site_Name });
  };

  register = () => {
    const { navigation, Site_Name } = this.props;
    navigation.navigate("RegisterView", { title: Site_Name });
  };

  renderRegisterDisabled = () => {
    const { Accounts_iframe_enabled, registrationText, theme } = this.props;
    if (Accounts_iframe_enabled) {
      return null;
    }

    return (
      <Text
        style={[
          styles.registrationText,
          { color: themes[theme].auxiliaryText },
        ]}
      >
        {registrationText}
      </Text>
    );
  };

  render() {
    const {
      theme,
      Site_Name = "Rocket Chat",
      Site_Url,
      Assets_favicon_512,
      server,
      showLoginButton,
    } = this.props;
    return (
      <FormContainer theme={theme} testID="workspace-view">
        <FormContainerInner>
          <View style={styles.alignItemsCenter}>
            {server ? (
              <React.Fragment>
                <ServerAvatar
                  theme={theme}
                  url={server}
                  image={
                    Assets_favicon_512?.url ?? Assets_favicon_512?.defaultUrl
                  }
                />
                <Text
                  style={[
                    styles.serverName,
                    { color: themes[theme].titleText },
                  ]}
                >
                  {Site_Name}
                </Text>
                <Text
                  style={[
                    styles.serverUrl,
                    { color: themes[theme].auxiliaryText },
                  ]}
                >
                  {Site_Url}
                </Text>
              </React.Fragment>
            ) : (
                <Progress.Pie
                  style={{ marginVertical: 80 }}
                  progress={0.2}
                  size={50}
                  indeterminate={true}
                />
              )}
          </View>

          <Button
            disabled={!server}
            title={I18n.t("Login")}
            type="primary"
            onPress={this.login}
            theme={theme}
            testID="workspace-view-login"
          />
          <Button
            title={I18n.t("Create_account")}
            type="secondary"
            backgroundColor={themes[theme].chatComponentBackground}
            onPress={this.register}
            theme={theme}
            testID="workspace-view-register"
          />
        </FormContainerInner>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  server: state.server.server,
  adding: state.server.adding,
  Site_Name: state.settings.Site_Name,
  Site_Url: state.settings.Site_Url,
  Assets_favicon_512: state.settings.Assets_favicon_512,
  registrationForm: state.settings.Accounts_RegistrationForm,
  registrationText:
    state.settings.Accounts_RegistrationForm_LinkReplacementText,
  Accounts_iframe_enabled: state.settings.Accounts_iframe_enabled,
  showLoginButton: getShowLoginButton(state),
  inviteLinkToken: state.inviteLinks.token,
});

const mapDispatchToProps = (dispatch) => ({
  connectServer: (server, certificate) =>
    dispatch(serverRequest(server, certificate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(WorkspaceView));
