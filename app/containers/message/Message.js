import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import MessageContext from './Context';

import User from './User';
import styles from './styles';
import RepliedThread from './RepliedThread';
import MessageAvatar from './MessageAvatar';
import Attachments from './Attachments';
import Urls from './Urls';
import Thread from './Thread';
import Blocks from './Blocks';
import Reactions from './Reactions';
import Broadcast from './Broadcast';
import Discussion from './Discussion';
import Content from './Content';
import ReadReceipt from './ReadReceipt';
import CallButton from './CallButton';
import { themes } from '../../constants/colors'
import message from '.';


const MessageInner = React.memo((props) => {

	if (props.type === 'discussion-created') {
		return (
			<>
				{/* <User {...props} /> */}
				<Discussion {...props} />
			</>
		);
	}
	if (props.type === 'jitsi_call_started') {
		return (
			<>
				{/* <User {...props} /> */}
				<Content {...props} isInfo />
				<CallButton {...props} />
			</>
		);
	}
	if (props.blocks && props.blocks.length) {
		return (
			<>
				{/* <User {...props} /> */}
				<Blocks {...props} />
				<Thread {...props} />
				<Reactions {...props} />
			</>
		);
	}


	return (
		<>
			{/* <User {...props} /> */}
			<Content {...props} />
			<Attachments {...props} />
			<Urls {...props} />
			<Thread {...props} />
			<Reactions {...props} />
			<Broadcast {...props} />
		</>
	);
});
MessageInner.displayName = 'MessageInner';

const Message = React.memo((props) => {
	let isMainUser = props.user.id === props.author._id && !props.isInfo;
	let isReplied = props.isThreadReply || props.isThreadSequential;

	const mainUserBg = isMainUser ? {
		backgroundColor: themes[props.theme].messageBg,
		borderWidth: 1,
		borderColor: "#ccc",
		marginLeft: isReplied ? 0 : 124
	} : {
			marginRight: isReplied ? 0 : 124
		}

	if (props.isInfo) {
		return (
			<View style={[styles.container, props.style, styles.center, { flexDirection: "row" }]}>
				<MessageAvatar small {...props} />
				<View
					style={[
						styles.messageContent,
						styles.messageContentWithHeader
					]}
				>
					<Content {...props} isMainUser={isMainUser} />
				</View>
			</View>

		)
	}

	if (props.isThreadReply || props.isThreadSequential) {
		const thread = props.isThreadReply ? <RepliedThread  {...props} /> : null;
		return (
			<View style={[styles.container, props.style]}>
				<View style={[styles.flex, isMainUser && styles.flexEnd]}>
					{!isMainUser && <MessageAvatar {...props} />}
					<View style={[styles.messageContent, mainUserBg, { marginLeft: 10 }]}>
						<View style={[styles.repliedUserThread, {
							borderColor: themes[props.theme].tintColor,
						}]}>
							<Text>
							</Text>
							{/* {<User {...props} />} */}
							{thread}
						</View>
						<Content {...props} isMainUser={isMainUser} />
					</View>
					<ReadReceipt
						isReadReceiptEnabled={props.isReadReceiptEnabled}
						unread={props.unread}
						theme={props.theme}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={[styles.container, props.style]}>
			<View style={[styles.flex, isMainUser && styles.flexEnd]}>
				{!isMainUser && <MessageAvatar {...props} />}
				<View
					style={[
						styles.messageContent,
						mainUserBg,
						props.isHeader && styles.messageContentWithHeader
					]}
				>
					{<MessageInner {...props} isMainUser={isMainUser} />}
				</View>
				<ReadReceipt
					isReadReceiptEnabled={props.isReadReceiptEnabled}
					unread={props.unread}
					theme={props.theme}
				/>
			</View>
		</View>
	);
});

Message.displayName = 'Message';

const MessageTouchable = React.memo((props) => {
	if (props.hasError) {
		return (
			<View>
				<Message {...props} />
			</View>
		);
	}
	const { onLongPress } = useContext(MessageContext);
	return (
		<Touchable
			onLongPress={onLongPress}
			disabled={props.isInfo || props.archived || props.isTemp}
		>
			<View>
				<Message {...props} />
			</View>
		</Touchable>
	);
});
MessageTouchable.displayName = 'MessageTouchable';

MessageTouchable.propTypes = {
	author: PropTypes.object,
	hasError: PropTypes.bool,
	isInfo: PropTypes.bool,
	isTemp: PropTypes.bool,
	archived: PropTypes.bool,
};

Message.propTypes = {
	author: PropTypes.object,
	isThreadReply: PropTypes.bool,
	isThreadSequential: PropTypes.bool,
	isInfo: PropTypes.bool,
	isTemp: PropTypes.bool,
	isHeader: PropTypes.bool,
	hasError: PropTypes.bool,
	style: PropTypes.any,
	onLongPress: PropTypes.func,
	isReadReceiptEnabled: PropTypes.bool,
	unread: PropTypes.bool,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

};

MessageInner.propTypes = {
	type: PropTypes.string,
	blocks: PropTypes.array
};

export default MessageTouchable;
