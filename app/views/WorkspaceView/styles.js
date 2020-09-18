import { StyleSheet } from 'react-native';

import sharedStyles from '../Styles';

export default StyleSheet.create({
	serverName: {
		...sharedStyles.textSemibold,
		fontSize: 16,
		marginBottom: 4,
		alignSelf: "center"
	},
	serverUrl: {
		...sharedStyles.textRegular,
		fontSize: 14,
		marginBottom: 24,
		alignSelf: "center"
	},
	registrationText: {
		fontSize: 14,
		...sharedStyles.textAlignCenter,
		...sharedStyles.textRegular
	},
	alignItemsCenter: {
		justifyContent: "center",
		marginLeft: 30,
		marginRight: 30
	}
});
