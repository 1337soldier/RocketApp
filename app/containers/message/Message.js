import React, { useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import MessageContext from './Context';

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
import database from "../../lib/database"

const MessageContainer = (props) => {
	return (
		<View style={[styles.container, props.style, !props.isAuthor && { flexDirection: "row", alignItems: "center" }]}>
			{props.children}
		</View>
	)
}

const Avatar = (props) => {
	return (
		<React.Fragment>
			{!props.isAuthor &&
				(<View style={{ width: 36 }} >
					<MessageAvatar {...props} />
				</View>)}
		</React.Fragment>
	)
}

const ContentContainer = ({ children, ...props }) => {
	const flexRow = props.isAuthor ?
		{ alignSelf: "flex-end", marginLeft: 48 }
		: { alignSelf: "flex-start", marginRight: 48 }

	return <View style={[styles.flex, flexRow]}>{children}</View>

}


const MessageInnerContainer = (props) => {
	const authorStyle = props.isAuthor ? {
		backgroundColor: themes[props.theme].messageBg,
		borderWidth: 1,
		borderColor: "#ccc",
		paddingHorizontal: 10
	} : {
			marginTop: 8,
			marginLeft: 10
		}
	return (
		<View style={[styles.messageContent, authorStyle]}>
			{props.children}
		</View>

	)
}

const MessageStatus = (props) => {
	return (
		<View><Text>dcm</Text></View>
	)
}

const ReplyMessage = (props) => {
	const [repliedUser, setRepliedUser] = useState({})

	const getRepliedUser = async () => {
		const db = database.active;
		const msgCollection = db.collections.get('messages');
		const isAuthorMsg = !props.tmid || !props.isHeader
		let repliedUser = await msgCollection.find(isAuthorMsg ? props.id : props.tmid)
		setRepliedUser(repliedUser.u)
	}

	useEffect(() => {
		getRepliedUser()
	}, [])

	const thread = <RepliedThread  {...props} />;

	return useMemo(() =>
		(<View style={[styles.repliedUserThread, { borderColor: themes[props.theme].tintColor }]}>
			<Text style={[props.isAuthor && { fontWeight: "500", fontSize: 16 }]}>
				{repliedUser.username}
			</Text>
			{thread}
		</View>
		), [repliedUser])
}

const MessageInner = React.memo((props) => {

	if (props.type === 'discussion-created') {
		return <Discussion {...props} />
	}

	if (props.type === 'jitsi_call_started') {
		return (
			<React.Fragment>
				<Content {...props} isInfo />
				<CallButton {...props} />
			</React.Fragment>
		);
	}

	if (props.blocks && props.blocks.length) {
		return (
			<React.Fragment>
				<Blocks {...props} />
				<Thread {...props} />
				<Reactions {...props} />
			</React.Fragment>
		);
	}


	return (
		<React.Fragment>
			<Content {...props} />
			<Attachments {...props} />
			<Urls {...props} />
			<Thread {...props} />
			<Reactions {...props} />
			<Broadcast {...props} />
		</React.Fragment>
	);
});
MessageInner.displayName = 'MessageInner';


const Container = ({ children, restProps }) => {
	return (
		<MessageContainer {...restProps}>
			<Avatar {...restProps} />
			<ContentContainer {...restProps}>
				<MessageInnerContainer {...restProps}>
					{children}
				</MessageInnerContainer>
				<ReadReceipt {...restProps} />
			</ContentContainer>
		</MessageContainer >

	)
}

const Message = React.memo((props) => {
	let isAuthor = props.user.id === props.author._id && !props.isInfo;
	const restProps = { isAuthor, ...props }

	if (props.isInfo) {
		return (
			<View style={[styles.container, props.style, styles.center, { flexDirection: "row" }]}>
				<MessageAvatar small {...props} />
				<View style={[styles.messageContent, styles.messageContentWithHeader]}>
					<Content {...props} />
				</View>
			</View>
		)
	}

	if (props.isThreadReply || props.isThreadSequential) {

		return (
			<Container restProps={restProps}>
				<Content {...props} />
			</Container>

		);
	}

	return (
		<Container restProps={restProps}>
			<MessageInner {...restProps} />
		</Container>

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
			<Message {...props} />
		</Touchable>

	);
});
MessageTouchable.displayName = 'MessageTouchable';

MessageTouchable.propTypes = {
	hasError: PropTypes.bool,
	isInfo: PropTypes.bool,
	isTemp: PropTypes.bool,
	archived: PropTypes.bool,
};

Message.propTypes = {
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
