import { StyleSheet } from "react-native";

import sharedStyles from "../../views/Styles";
import { isTablet } from "../../utils/deviceInfo";

export default StyleSheet.create({
	root: {
		flexDirection: "row",
	},
	container: {
		paddingVertical: 4,
		width: "100%",
		paddingHorizontal: 14,
		flexDirection: "column",
	},
	messageContent: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10,
	},
	backgroundBlue: {
		backgroundColor: "#73C2FB",
	},
	messageContentWithHeader: {
		marginLeft: 10,
	},
	messageContentWithError: {
		marginLeft: 0,
	},
	center: {
		alignItems: "center",
	},
	flex: {
		flexDirection: "row",
	},
	flexEnd: {
		justifyContent: "flex-end"
	},
	temp: { opacity: 0.3 },
	marginTop: {
		marginTop: 6,
	},
	reactionsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 6,
	},
	reactionButton: {
		marginRight: 3,
		marginBottom: 6,
		borderRadius: 2,
	},
	reactionContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 2,
		borderWidth: 1,
		height: 28,
		minWidth: 46.3,
	},
	reactionCount: {
		fontSize: 14,
		marginLeft: 3,
		marginRight: 8.5,
		...sharedStyles.textSemibold,
	},
	reactionEmoji: {
		fontSize: 13,
		marginLeft: 7,
		color: "#ffffff",
	},
	reactionCustomEmoji: {
		width: 19,
		height: 19,
		marginLeft: 7,
	},
	avatar: {
		marginTop: 4,
	},
	avatarSmall: {
		marginLeft: 16,
	},
	errorButton: {
		paddingLeft: 10,
		paddingVertical: 5,
	},
	buttonContainer: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		paddingHorizontal: 15,
		height: 44,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 2,
	},
	smallButton: {
		height: 30,
	},
	buttonIcon: {
		marginRight: 6,
	},
	buttonText: {
		fontSize: 14,
		...sharedStyles.textMedium,
	},
	imageContainer: {
		// flex: 1,
		flexDirection: "column",
		borderRadius: 4
	},
	image: {
		width: "100%",
		// maxWidth: 400,
		minHeight: isTablet ? 300 : 200,
		borderRadius: 4,
		borderWidth: 1,
		overflow: "hidden",
	},
	imagePressed: {
		opacity: 0.5,
	},
	inlineImage: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	text: {
		fontSize: 16,
		...sharedStyles.textRegular
	},
	textInfo: {
		fontStyle: "italic",
		fontSize: 16,
		...sharedStyles.textRegular
	},
	startedDiscussion: {
		fontStyle: "italic",
		fontSize: 16,
		marginBottom: 6,
		...sharedStyles.textRegular
	},
	time: {
		fontSize: 12,
		paddingLeft: 10,
		lineHeight: 22,
		...sharedStyles.textRegular,
		fontWeight: "300"
	},
	repliedContainer: {
		borderRadius: 6,
		marginVertical: 4,
		width: "40%"
	},
	repliedThread: {
		flexDirection: "row",
		alignItems: "center"
	},
	repliedUserThread: {
		borderLeftWidth: 4,
		paddingLeft: 10,
		marginVertical: 10,
		justifyContent: "center",
	},
	repliedThreadIcon: {
		marginRight: 10,
		marginLeft: 16
	},
	repliedThreadName: {
		fontSize: 14,
		flex: 1,
		color: "gray",
		...sharedStyles.textRegular
	},
	readReceipt: {
		lineHeight: 20
	},
});
