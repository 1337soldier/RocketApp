import React from 'react';
import { Text } from 'react-native';
import removeMarkdown from 'remove-markdown';
import PropTypes from 'prop-types';

import shortnameToUnicode from '../../utils/shortnameToUnicode';
import styles from './styles';

const RepliedThread = React.memo((props) => {
	const {
		tmid, tmsg, isHeader, fetchThreadName, id, theme
	} = props
	// if (!tmid || !isHeader) {
	// 	return null;
	// }

	if (!tmsg) {
		fetchThreadName(tmid, id);
		return null;
	}

	let msg = shortnameToUnicode(tmsg);
	msg = removeMarkdown(msg);


	return (
		// <View style={styles.repliedThread} testID={`message-thread-replied-on-${msg}`}>
		<Text style={[styles.repliedThreadName]} numberOfLines={1}>{msg}</Text>
		// </View>
	);
}, (prevProps, nextProps) => {
	if (prevProps.tmid !== nextProps.tmid) {
		return false;
	}
	if (prevProps.tmsg !== nextProps.tmsg) {
		return false;
	}
	if (prevProps.isHeader !== nextProps.isHeader) {
		return false;
	}
	if (prevProps.theme !== nextProps.theme) {
		return false;
	}
	return true;
});

RepliedThread.propTypes = {
	tmid: PropTypes.string,
	tmsg: PropTypes.string,
	id: PropTypes.string,
	isHeader: PropTypes.bool,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	fetchThreadName: PropTypes.func
};
RepliedThread.displayName = 'MessageRepliedThread';

export default RepliedThread;
