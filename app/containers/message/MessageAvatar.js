import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import styles from './styles';
import MessageContext from './Context';

const MessageAvatar = React.memo(({
	isHeader, avatar, author, small, navToRoomInfo, emoji, getCustomEmoji, theme
}) => {
	const { baseUrl, user } = useContext(MessageContext);
	if (isHeader && author) {
		const navParam = {
			t: 'd',
			rid: author._id
		};
		return (
			<Avatar
				style={small ? styles.avatarSmall : styles.avatar}
				text={avatar ? '' : author.username}
				size={small ? 20 : 36}
				borderRadius={small ? 10 : 18}
				onPress={author._id === user.id ? undefined : () => navToRoomInfo(navParam)}
				getCustomEmoji={getCustomEmoji}
				avatar={avatar}
				emoji={emoji}
				baseUrl={baseUrl}
				userId={user.id}
				token={user.token}
				theme={theme}
			/>
		);
	}
	return null;
});

MessageAvatar.propTypes = {
	isHeader: PropTypes.bool,
	avatar: PropTypes.string,
	emoji: PropTypes.string,
	author: PropTypes.object,
	small: PropTypes.bool,
	navToRoomInfo: PropTypes.func,
	getCustomEmoji: PropTypes.func,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

};
MessageAvatar.displayName = 'MessageAvatar';

export default MessageAvatar;
