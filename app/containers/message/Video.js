import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import isEqual from 'deep-equal';

import Touchable from './Touchable';
import Markdown from '../markdown';
import openLink from '../../utils/openLink';
import { isIOS } from '../../utils/deviceInfo';
import { CustomIcon } from '../../lib/Icons';
import { formatAttachmentUrl } from '../../lib/utils';
import { themes } from '../../constants/colors';
import MessageContext from './Context';
import VideoPlayer from 'react-native-video'
const { width, height } = Dimensions.get('window')


const SUPPORTED_TYPES = ['video/quicktime', 'video/mp4', ...(isIOS ? [] : ['video/3gp', 'video/mkv'])];
const isTypeSupported = type => SUPPORTED_TYPES.indexOf(type) !== -1;

const styles = StyleSheet.create({
	video: {
		width: width / 1.6,
		height: width / 1.6,
		borderRadius: 10,

	}
});

const Video = React.memo(({
	file, showAttachment, getCustomEmoji, theme, onLongPress
}) => {
	const [url, setUrl] = useState(false)

	const { baseUrl, user } = useContext(MessageContext);
	if (!baseUrl) {
		return null;
	}

	const onPress = () => {
		console.info(file)
		if (isTypeSupported(file.video_type)) {
			return showAttachment(file);
		}
		const uri = formatAttachmentUrl(file.video_url, user.id, user.token, baseUrl);
		openLink(uri, theme);
	};

	async function getUrl() {
		try {
			const result = await formatAttachmentUrl(file.video_url, user.id, user.token, baseUrl);
			if (result) {
				setUrl(result)
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		getUrl()
	}, [])

	return (
		<TouchableOpacity onPress={onPress} onLongPress={onLongPress} >
			<VideoPlayer
				ref={(ref) => { this.player = ref }}
				resizeMode="cover"
				minLoadRetryCount={5}
				repeat={true}
				poster="https://static.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
				style={styles.video}
				source={{ uri: url }}
				onError={e => console.info(e)}
			/>
			<Markdown msg={file.description} baseUrl={baseUrl} username={user.username} getCustomEmoji={getCustomEmoji} theme={theme} />
		</TouchableOpacity>
	);
}, (prevProps, nextProps) => isEqual(prevProps.file, nextProps.file) && prevProps.theme === nextProps.theme);

Video.propTypes = {
	file: PropTypes.object,
	showAttachment: PropTypes.func,
	getCustomEmoji: PropTypes.func,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

};

export default Video;
