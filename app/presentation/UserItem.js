import React from 'react';
import {
	Text, View, StyleSheet, Pressable
} from 'react-native';
import PropTypes from 'prop-types';

import Avatar from '../containers/Avatar';
import { CustomIcon } from '../lib/Icons';
import sharedStyles from '../views/Styles';
import { themes } from '../constants/colors';
import { isIOS } from '../utils/deviceInfo';

const styles = StyleSheet.create({
	button: {
		height: 54
	},
	container: {
		flexDirection: 'row'
	},
	avatar: {
		marginHorizontal: 15,
		marginVertical: 12
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		marginRight: 15
	},
	name: {
		fontSize: 17,
		...sharedStyles.textMedium
	},
	username: {
		fontSize: 14,
		...sharedStyles.textRegular
	},
	icon: {
		marginHorizontal: 15,
		alignSelf: 'center'
	}
});

const UserItem = ({
	name, username, onPress, testID, onLongPress, style, icon, baseUrl, user, theme
}) => (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			testID={testID}
			android_ripple={{
				color: themes[theme].bannerBackground
			}}
			style={({ pressed }) => ({
				backgroundColor: isIOS && pressed
					? themes[theme].bannerBackground
					: 'transparent'
			})}
		>
			<View style={[styles.container, styles.button, style]}>
				<Avatar text={username} size={30} type='d' style={styles.avatar} baseUrl={baseUrl} userId={user.id} token={user.token} />
				<View style={styles.textContainer}>
					<Text style={[styles.name, { color: themes[theme].titleText }]} numberOfLines={1}>{name}</Text>
					<Text style={[styles.username, { color: themes[theme].auxiliaryText }]} numberOfLines={1}>@{username}</Text>
				</View>
				{icon ? <CustomIcon name={icon} size={22} style={[styles.icon, { color: themes[theme].actionTintColor }]} /> : null}
			</View>
		</Pressable>
	);

UserItem.propTypes = {
	name: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string,
		token: PropTypes.string
	}),
	baseUrl: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired,
	onLongPress: PropTypes.func,
	style: PropTypes.any,
	icon: PropTypes.string,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

};

export default UserItem;
